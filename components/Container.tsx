import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // Desktop gutters scale with the window instead of a fixed max-w-6xl
  // column, which left ~400px of dead space per side on a 1920px screen. From
  // ~1320px they are 8vw a side. Below that they ramp
  // continuously from the old 32px at 1024px (25vw - 224px), because 8vw
  // there narrowed the homepage hero enough to push it past one screen at
  // 1024x768, and a stepped breakpoint would visibly jump on resize. Past
  // 1920px the column stops growing and the gutter holds at 154px (8% of
  // 1920) so it isn't added on top of the cap. Mobile/tablet are unchanged.
  return (
    <div
      className={`mx-auto w-full max-w-[1920px] px-6 sm:px-8 lg:px-[max(2rem,min(8vw,154px,calc(25vw-224px)))] ${className}`}
    >
      {children}
    </div>
  );
}
