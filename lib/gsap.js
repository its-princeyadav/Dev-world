"use client";

// Registers GSAP plugins once for the whole app.
// Always import GSAP from here (not from "gsap" directly) so the plugins are guaranteed to be registered.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
