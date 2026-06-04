"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Animates the first number found inside a string (e.g. "120+", "99,98 %",
 * "−40 %", "3×", "< 8 sem.") from 0 to its value when scrolled into view,
 * preserving the surrounding prefix/suffix and decimal separator.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const match = value.match(/([\d]+(?:[.,]\d+)?)/);

  useEffect(() => {
    if (!match || reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const raw = match[1];
    const usesComma = raw.includes(",");
    const decimals = raw.includes(".") || raw.includes(",")
      ? raw.split(/[.,]/)[1].length
      : 0;
    const target = parseFloat(raw.replace(",", "."));

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        let num = latest.toFixed(decimals);
        if (usesComma) num = num.replace(".", ",");
        setDisplay(value.replace(raw, num));
      },
    });
    return () => controls.stop();
  }, [inView, match, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
