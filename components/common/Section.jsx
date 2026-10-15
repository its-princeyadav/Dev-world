import { cn } from "@/lib/utils";

/** Dark page section with the site's standard side padding and vertical rhythm. */
export default function Section({ id, className, children, ...rest }) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-screen bg-[#070707] text-white px-[4vw] py-[7vw] max-[1025px]:px-[5vw] max-[1025px]:py-[12vw]",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
