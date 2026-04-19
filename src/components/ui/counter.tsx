"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type Props = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function Counter({ from = 0, to, duration = 2, suffix = "", prefix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setValue(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
