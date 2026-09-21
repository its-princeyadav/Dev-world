import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-ink pb-16 pt-32 lg:pb-20 lg:pt-40">
        <Container width="text" className="text-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              {post.category}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-balance mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-sm text-mist-400">
              {post.author} ·{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </Reveal>
        </Container>
      </section>

      <div
        className={`aspect-[21/9] bg-gradient-to-br ${post.gradient}`}
        aria-hidden="true"
      />

      <section className="bg-paper py-16 lg:py-20">
        <Container width="text">
          <Reveal>
            <div className="prose-content mx-auto max-w-[65ch] text-base leading-relaxed text-ink-700">
              {post.content.split("\n\n").map((para, i) => (
                <p key={i} className="mb-5">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
