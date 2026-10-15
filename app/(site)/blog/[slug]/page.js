import { notFound } from "next/navigation";

import { blogPosts } from "@/data/blogPosts";
import { formatDate } from "@/lib/formatDate";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import TextReveal from "@/components/animations/TextReveal";
import ParallaxImage from "@/components/animations/ParallaxImage";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        meta={`${post.author} · ${formatDate(post.date)}`}
      />

      <Section className="pt-0">
        <ParallaxImage src={post.coverImage} alt="" priority />
      </Section>

      <Section className="pt-0">
        <article className="mx-auto w-[55%] max-[1025px]:w-[80%] max-md:w-full">
          {post.content.split("\n\n").map((paragraph, index) => (
            <TextReveal key={index} splitBy="lines">
              <p className="mb-[1.8vw] text-[1.35vw] leading-[1.7] text-white/85 max-[1025px]:mb-[4vw] max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                {paragraph}
              </p>
            </TextReveal>
          ))}
        </article>
      </Section>
    </>
  );
}
