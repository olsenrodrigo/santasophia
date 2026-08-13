import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends PropsWithChildren {
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8%" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        shouldAnimate && "motion-safe:animate-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500",
        className,
      )}
    >
      {children}
    </div>
  );
}
