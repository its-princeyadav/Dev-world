import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { blogPosts } from "@/data/blogPosts";

export const metadata = {
  title: "Blog",
  description:
    "Engineering, design, and product strategy insights from the Dev World team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on building great software"
        description="Engineering deep-dives, design thinking, and product strategy from our team."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={0.05 * i}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-[20px] border border-paper-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${post.gradient} transition-transform duration-400 group-hover:scale-105`}
                  />
                  <div className="bg-paper-soft p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                      {post.category}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-ink-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-ink-500">
                      {post.author} ·{" "}
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
