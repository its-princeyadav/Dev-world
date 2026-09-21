import * as Hi2 from "react-icons/hi2";

// Resolves an icon by its react-icons/hi2 export name (as stored in data/services.js
// and, later, the Service collection) so content stays serializable.
export default function Icon({ name, className, size }) {
  const Component = Hi2[name];
  if (!Component) return null;
  return <Component className={className} size={size} aria-hidden="true" />;
}
