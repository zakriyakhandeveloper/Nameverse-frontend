"use client";

/**
 * Consistent homepage section shell: full width, unified max-width, vertical rhythm.
 */
export default function HomePageSection({
  id,
  "aria-labelledby": ariaLabelledBy,
  as: Component = "div",
  variant = "default",
  children,
  className = "",
}) {
  const variants = {
    default: "bg-white border-b border-gray-100",
    muted: "bg-slate-50/90 border-b border-gray-100",
    subtle: "bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-gray-100",
    brand: "bg-gradient-to-br from-slate-50 via-white to-indigo-50/25 border-b border-gray-100",
  };

  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`w-full scroll-mt-20 ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </Component>
  );
}
