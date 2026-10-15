import Image from "next/image";
import Link from "next/link";

import RollButton from "@/components/common/RollButton";
import TextReveal from "@/components/animations/TextReveal";
import Eyebrow from "@/components/common/Eyebrow";
import { HERO_BACKGROUND } from "@/constants/theme";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main
      className="site-body relative flex min-h-screen flex-col justify-between overflow-hidden px-[4vw] py-[2vw] max-[1025px]:px-[5vw] max-[1025px]:py-[5vw]"
      style={HERO_BACKGROUND}
    >
      <Link href="/" aria-label="Dev World — home">
        <Image src="/images/logo.svg" width={442} height={77} alt="Dev World" className="w-[12vw] max-[1025px]:w-[25vw] max-md:w-[34vw]" />
      </Link>

      <div className="relative z-2">
        <Eyebrow className="mb-[1.5vw] text-white max-[1025px]:mb-[4vw]">Error 404</Eyebrow>
        <TextReveal stagger={0.015} animateOnScroll={false}>
          <h1 className="text-[7.5vw] leading-[1.05]! max-[1025px]:text-[12vw] max-md:text-[14vw]">This Page Doesn&apos;t Exist</h1>
        </TextReveal>
        <p className="mt-[1.5vw] w-[40%] text-[1.25vw] max-[1025px]:mt-[4vw] max-[1025px]:w-[75%] max-[1025px]:text-[2.6vw] max-md:w-full max-md:text-[4.3vw]">
          The page you&apos;re looking for may have been moved or removed.
        </p>
        <RollButton
          href="/"
          className="mt-[2.5vw] max-[1025px]:mt-[6vw]"
          textClassName="font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]"
          bgColor="#ffffff"
          dotColor="#070707"
          hoverTextColor="#ffffff"
          textColor="#111111"
        >
          Back to Home
        </RollButton>
      </div>

      <span aria-hidden="true" />
    </main>
  );
}
