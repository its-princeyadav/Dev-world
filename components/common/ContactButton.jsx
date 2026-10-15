"use client";

import RollButton from "@/components/common/RollButton";
import { useContactModal } from "@/context/ContactModalContext";

/** White pill button that opens the "Get in Touch" popup. Usable from Server Components. */
export default function ContactButton({ children = "Get in Touch", className }) {
  const { openModal } = useContactModal();

  return (
    <RollButton
      onClick={openModal}
      className={className}
      textClassName="font-normal text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]"
      bgColor="#ffffff"
      dotColor="#070707"
      hoverTextColor="#ffffff"
      textColor="#111111"
    >
      {children}
    </RollButton>
  );
}
