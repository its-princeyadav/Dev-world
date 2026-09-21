import { cn } from "@/lib/utils";

const widths = {
  default: "max-w-7xl",
  text: "max-w-6xl",
  wide: "max-w-screen-2xl",
};

export default function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        widths[width],
        className
      )}
    >
      {children}
    </Tag>
  );
}
