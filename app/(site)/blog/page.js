import Image from "next/image";
import Link from "next/link";

import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import FadeUp from "@/components/animations/FadeUp";
import { blogPosts } from "@/data/blogPosts";
import { formatDate } from "@/lib/formatDate";

export const metadata = {
  title: "Blog",
  description: "Engineering, design, and product strategy insights from the Dev World team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on Building Great Software"
        description="Engineering deep-dives, design thinking, and product strategy from our team."
      />

      <Section className="pt-[3vw]">
        <FadeUp className="grid grid-cols-3 gap-x-[2vw] gap-y-[4vw] max-[1025px]:grid-cols-2 max-[1025px]:gap-x-[3vw] max-[1025px]:gap-y-[8vw] max-md:grid-cols-1 max-md:gap-y-[12vw]">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#161616] max-[1025px]:rounded-lg">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 90vw, (max-width: 1025px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <p className="mt-[1.4vw] text-[0.95vw] uppercase tracking-[0.12em] text-[#F16B0D] max-[1025px]:mt-[3vw] max-[1025px]:text-[2vw] max-md:text-[3.4vw]">
                {post.category}
              </p>
              <h2 className="mt-[0.5vw] text-[1.6vw] leading-[1.25] max-[1025px]:mt-[1.5vw] max-[1025px]:text-[3.4vw] max-md:text-[5.5vw]">
                <span className="under-multi-parent">
                  <span className="under-multi">{post.title}</span>
                </span>
              </h2>
              <p className="mt-[0.7vw] text-[1.05vw] leading-[1.5] text-white/65 max-[1025px]:mt-[2vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                {post.excerpt}
              </p>
              <p className="mt-[1vw] text-[0.95vw] text-white/45 max-[1025px]:mt-[2.5vw] max-[1025px]:text-[2vw] max-md:text-[3.4vw]">
                {post.author} · {formatDate(post.date, "short")}
              </p>
            </Link>
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
