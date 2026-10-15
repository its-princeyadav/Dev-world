import Image from "next/image";
import Link from "next/link";

import { SOCIAL_LINKS } from "@/constants/site";

// Round social icons in the footer. On hover a white disc scales in and the icon inverts.
export default function SocialLinks() {
  return (
    <ul className="flex gap-4">
      {SOCIAL_LINKS.map((social) => (
        <li key={social.label} className="group">
          <Link
            href={social.href}
            aria-label={social.label}
            className="rounded-full relative block p-2.5 border overflow-hidden bg-white/5 transition-all duration-300 ease-in-out group-hover:scale-[0.95]"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src={social.icon}
                alt=""
                width={social.width}
                height={social.height}
                className="w-full h-full object-contain group-hover:invert transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="w-full h-full absolute inset-0 origin-center scale-0 group-hover:scale-100 bg-white rounded-full duration-300 ease-in-out z-[-1]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
