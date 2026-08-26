import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const BeamCircle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
>(({ className, style, children }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "z-10 flex size-12 md:size-14 items-center justify-center rounded-full border-2 bg-card shadow-[0_0_0_4px_rgba(0,0,0,0.02)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

BeamCircle.displayName = "BeamCircle";
