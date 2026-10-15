import * as Hi2 from "react-icons/hi2";

// Resolves an icon by its react-icons/hi2 export name (as stored in data/services.js
// and, later, the Service collection) so content stays serializable.
// variant="outline" swaps to the thin-line version (HiCloud → HiOutlineCloud), which matches
// the line icons of the public site.
export default function Icon({ name, className, size, variant = "solid" }) {
  const outlineName = name?.startsWith("Hi") ? `HiOutline${name.slice(2)}` : name;
  const Component = (variant === "outline" && Hi2[outlineName]) || Hi2[name];
  if (!Component) return null;
  return <Component className={className} size={size} aria-hidden="true" />;
}
