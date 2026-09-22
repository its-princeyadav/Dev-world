"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

// ─────────────────────────────────────────────────────────────
// Locked scroll-scrub video hero.
// The page cannot move while this is active — body is pinned
// with position:fixed (the same bulletproof technique modal
// libraries use; plain overflow:hidden alone isn't reliable
// across browsers). Wheel/touch input is captured and used
// purely to drive video.currentTime, forward and backward.
//
// The app also runs a global Lenis smooth-scroll instance
// (SmoothScrollProvider, mounted at the root layout) that
// intercepts wheel/touch itself to animate window.scrollTo in
// its own RAF loop. Left running, it fights this component for
// the same input and for scrollY — e.g. it can keep nudging the
// real scroll position on its own schedule while body is pinned,
// which surfaces as scrubbing/locking that seems to happen at
// the wrong scroll position. useLenis() below gives access to
// that shared instance so it can be told to stand down for
// exactly the span this component is in control.
// ─────────────────────────────────────────────────────────────

/**
 * @typedef {Object} MetroHeroProps
 * @property {string} [videoSrc]
 * @property {string} [title]
 * @property {string} [scrollHint]
 * @property {string} [tagline]
 * @property {{ name: string, url: string } | false} [signature]
 * @property {number} [scrubDistance] Total input distance (px) needed to scrub the full video. Tune to taste.
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

const DEFAULT_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const COL_BG = "#05070d";
const COL_TEXT = "#f2f4f8";

// Extra forward-scroll distance (px), once the video has fully scrubbed,
// required before the lock releases. Gives the final frame a deliberate
// beat to hold on screen instead of releasing the instant progress hits 1.
const RELEASE_HOLD_PX = 140;

// Time constant (ms) for the progress-follow damping. Frame-rate
// independent (derived from the rAF timestamp delta) so the motion reads
// identically on a 60Hz laptop and a 120Hz phone — a fixed per-frame lerp
// factor eases twice as fast on the latter. 84ms reproduces the same
// steady-state response the previous fixed 0.18-per-frame-at-60fps factor
// had, so the feel is unchanged at 60Hz — just consistent everywhere else.
const FOLLOW_TAU_MS = 84;

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function easeOutCubic(t) {
  const p = clamp(t, 0, 1);
  return 1 - Math.pow(1 - p, 3);
}

/** @param {MetroHeroProps} props */
export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline = "Every door in the city is already open.",
  signature = false,
  scrubDistance = 3200,
  className,
  style,
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const taglineRef = useRef(null);
  const progressBarRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Read via a ref inside the effect below (not the value directly) so
  // the effect doesn't need `lenis` in its dependency array — the
  // instance can still be settling in from SmoothScrollProvider's own
  // mount effect on the very first render, and refs always see whatever
  // is current at call time rather than whatever was current when the
  // effect closure was created.
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  // Mirrors the `locked` variable inside the main effect below, so this
  // separate effect can tell whether Lenis should be stopped right now.
  // Needed because of a real race: ReactLenis creates its Lenis instance
  // in its own effect, which on the very first mount hasn't necessarily
  // run yet when engageLock() below fires synchronously — so the very
  // first, most important stop() call can silently no-op on `undefined`.
  // This retroactively stops Lenis the moment it actually becomes
  // available if we were already meant to be locked when it showed up.
  const lockedForLenisRef = useRef(false);
  useEffect(() => {
    if (lenis && lockedForLenisRef.current) lenis.stop();
  }, [lenis]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let duration = 0;
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let hasStartedScrolling = false;
    let isSeeking = false;
    let pendingTime = null;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;
    let overshoot = 0;
    // Tracks the hero's own visibility, independent of scroll direction
    // or position math — see the IntersectionObserver below. Starts true
    // because the hero fills the viewport at mount.
    let wasIntersecting = true;

    const onLoadedData = () => {
      duration = video.duration || 0;
      setReady(true);
      if (reduceMotion) {
        video.currentTime = duration * 0.92;
      }
    };
    video.addEventListener("loadeddata", onLoadedData);

    // iOS Safari often won't buffer any video data — even with
    // preload="auto" — until playback actually starts, to save mobile
    // data. Since we only ever seek (never call play() elsewhere), the
    // video can stay permanently blank on iPhone. Force a silent
    // play-then-immediately-pause on mount to kick off real loading.
    const kickstartLoad = () => {
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      } else {
        video.pause();
      }
    };
    kickstartLoad();

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    function seekTo(t) {
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video.currentTime = t;
    }

    // Pins the page so scroll input only ever moves the video back and
    // forth instead of moving the page. Re-entrant: called on mount, and
    // again by reEngage() below whenever the user scrolls back up into
    // the hero after having left it.
    function engageLock() {
      if (locked || typeof document === "undefined") return;
      locked = true;
      lockedForLenisRef.current = true;
      // Must happen before reading window.scrollY below — Lenis smooths
      // scroll position toward a target over several frames, so without
      // stopping it first, scrollY can still be mid-animation here and
      // this captures a value Lenis is about to scroll past anyway. May
      // no-op if Lenis hasn't finished initializing yet (see the effect
      // above this one) — that effect catches it retroactively.
      lenisRef.current?.stop();
      lockedScrollY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedScrollY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
      b.height = "100%";
      b.overscrollBehavior = "none";
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return;
      locked = false;
      lockedForLenisRef.current = false;
      const y = lockedScrollY;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      b.height = "";
      b.overscrollBehavior = "";
      window.scrollTo(0, y);
      // Lenis measures the page's scrollable range once and only
      // recalculates on an actual window resize — it has no way to know
      // that body's own height (and therefore the real scroll range)
      // just changed from ~0 (body was position:fixed, out of flow)
      // back to the full page height, purely from a style mutation with
      // no resize event. Left unresized, Lenis keeps believing the
      // scroll limit is whatever it measured while locked and refuses
      // to scroll anywhere at all afterward.
      lenisRef.current?.resize();
      // Resume after resize/scrollTo, so Lenis's own scroll state
      // resyncs against the correct range instead of one computed while
      // still stopped.
      lenisRef.current?.start();
    }

    engageLock();

    function addDelta(deltaY) {
      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1);
      targetProgress = next;
      if (targetProgress > 0.001) hasStartedScrolling = true;
    }

    // Wheel deltaY isn't in consistent units across browsers/devices —
    // Chrome reports pixels (deltaMode 0), Firefox commonly reports lines
    // (deltaMode 1, ~3px worth of scroll each), and DOM_DELTA_PAGE (2) is
    // rarer still. Left unnormalized, the exact same physical scroll
    // gesture scrubs at a different speed per browser, and can feel
    // jerky/steppy where line-mode deltas arrive as small integers.
    function normalizeWheelDelta(e) {
      if (e.deltaMode === 1) return e.deltaY * 18;
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
      return e.deltaY;
    }

    // Snaps to the exact final frame and hands scrolling back to the
    // browser. The hero settles into normal in-flow content and the rest
    // of the page continues right underneath it, at the same scroll
    // position (no jump, no layout shift, since body is un-pinned back
    // to the exact pixel it was pinned at). Not permanent — the
    // IntersectionObserver below watches for the user scrolling back up
    // into the hero and re-locks, resuming from wherever progress was
    // left (1), so the whole cycle is reversible rather than a one-way
    // valve.
    function finishAndRelease() {
      if (!locked) return;
      targetProgress = 1;
      currentProgress = 1;
      if (duration > 0) seekTo(duration);
      renderVisuals(1);
      cancelAnimationFrame(rafId);
      releaseLock();
    }

    // Re-locks when the user scrolls back up into the hero from below.
    // Picks up exactly where progress was left (never reset), and pins
    // at whatever position the page happens to be at, so there's no
    // jump — same technique engageLock() always uses.
    function reEngage() {
      if (locked) return;
      engageLock();
      overshoot = 0;
      if (!reduceMotion) {
        lastTime = 0;
        rafId = requestAnimationFrame(frame);
      }
    }

    // Ties re-engagement to the hero's own on-screen presence — not to
    // window.scrollY math, which can't tell "the hero is genuinely back
    // in the viewport" from "the page's total height happens to put the
    // scroll position at some particular number." Only acts on the
    // rising edge (was fully off-screen, is now visible again): the hero
    // is still 100% visible for a moment right as finishAndRelease() un-
    // pins the body, and reacting to "is currently visible" rather than
    // "just became visible" would re-lock instantly, undoing the release
    // it was supposed to be a release from.
    //
    // threshold is deliberately near 1, not 0 — "intersecting" at
    // threshold:0 means as little as a single pixel of the hero's edge
    // is visible, which for a 100dvh section happens the instant the
    // user has scrolled back to (roughly) one full viewport above the
    // next section, with almost the entire viewport still showing that
    // next section. Locking there freezes the page mid-transition —
    // navbar plus a sliver of the hero plus most of the section below —
    // which reads as "stuck," not "returned to the hero." Requiring
    // near-total visibility means engagement only happens once the hero
    // genuinely fills the viewport again, i.e. the user has actually
    // scrolled all the way back to the top.
    const heroVisibility = new IntersectionObserver(
      ([entry]) => {
        if (!locked && entry.isIntersecting && !wasIntersecting) {
          reEngage();
        }
        wasIntersecting = entry.isIntersecting;
      },
      { threshold: 0.98 }
    );
    heroVisibility.observe(section);

    // Returns true while the event should still be captured to drive the
    // scrub (and therefore preventDefault'd); false once forward intent
    // has been sustained past the end of the video for RELEASE_HOLD_PX,
    // at which point the lock has just been released and this same
    // input event is left to fall through to native scrolling — so the
    // handoff has no missed frame.
    function handleForwardIntent(deltaY) {
      // >= 0, not > 0: touch deltas are raw integer clientY diffs, and
      // consecutive touchmove events routinely report the exact same
      // clientY (delta 0) while a finger is still genuinely swiping
      // forward, especially as the gesture decelerates near the end of
      // the video. Wheel deltaY is effectively never exactly 0, so this
      // only matters for touch — but treating a 0 tick as "reversed"
      // wiped the overshoot hold counter before it could ever reach
      // RELEASE_HOLD_PX, so the lock would never release on mobile.
      if (targetProgress >= 1 && deltaY >= 0) {
        overshoot += deltaY;
        if (overshoot >= RELEASE_HOLD_PX) {
          finishAndRelease();
          return false;
        }
        return true;
      }
      overshoot = 0;
      addDelta(deltaY);
      return true;
    }

    // Wheel/touch listeners stay attached for the component's whole
    // lifetime and simply no-op while unlocked, instead of being
    // detached on release and needing to be re-attached on reEngage —
    // one less thing to keep in sync between the two.
    const onWheel = (e) => {
      if (!locked) return;
      const capture = handleForwardIntent(normalizeWheelDelta(e));
      if (capture) e.preventDefault();
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      if (!locked) return;
      const y = e.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - y;
      touchStartY = y;
      const capture = handleForwardIntent(deltaY);
      if (capture) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    // Also bind directly on the element itself, with capture — on some
    // iOS versions a window-level listener alone can lose the race
    // against the browser's own native scroll handling.
    section.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    section.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });

    function renderVisuals(progress) {
      if (videoRef.current) {
        const scale = 1 + progress * 0.06;
        videoRef.current.style.transform = `scale(${scale})`;
      }
      if (titleRef.current) {
        // Same 0.35 boundary and same -24px/10px/0.04 magnitudes as
        // before — only the interpolation curve is eased now instead of
        // linear, for a softer, more premium settle instead of a ramp
        // that moves at a constant rate right up until it stops dead.
        const t = easeOutCubic(1 - clamp(progress / 0.35, 0, 1));
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1";
      }
      if (taglineRef.current) {
        // Mirrors the title's blur-focus treatment, timed as the payoff
        // once the reveal is nearly complete — not a background afterthought.
        // Same 0.82 boundary and same 20px/8px/0.03 magnitudes as before,
        // eased the same way as the title above.
        const t = easeOutCubic(clamp((progress - 0.82) / 0.18, 0, 1));
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    let lastTime = 0;
    function frame(now) {
      if (!lastTime) lastTime = now;
      // Capped: if a frame gets skipped — tab backgrounded and resumed,
      // a GC pause, a heavy moment elsewhere on the page — dt can spike
      // to hundreds of ms. Feeding that straight into the exponential
      // damping below would push k close to 1 and make currentProgress
      // snap almost instantly to targetProgress instead of catching up
      // smoothly — an intermittent jerk, exactly on the frames where
      // smoothness matters most. Clamping dt means a stall is bridged by
      // a couple of slightly-larger catch-up steps instead of one jump.
      const dt = Math.min(now - lastTime, 48);
      lastTime = now;
      // Exponential damping toward targetProgress, scaled by real elapsed
      // time rather than assuming a fixed frame interval — see
      // FOLLOW_TAU_MS above.
      const k = 1 - Math.exp(-dt / FOLLOW_TAU_MS);
      currentProgress += (targetProgress - currentProgress) * k;

      if (duration > 0) {
        seekTo(currentProgress * duration);
      }

      renderVisuals(currentProgress);

      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchstart", onTouchStart, true);
      section.removeEventListener("touchmove", onTouchMove, true);
      heroVisibility.disconnect();
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
          willChange: "transform, filter, opacity",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(30px, 7vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            display: "inline-block",
          }}
        >
          {title}
        </span>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, filter, opacity",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path
            d="M7 1 L7 17 M2 12 L7 17 L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Thin progress line — fills as the video advances. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = COL_TEXT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(220,224,232,0.6)";
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  );
}
