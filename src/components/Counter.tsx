import React, { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const Counter: React.FC<CounterProps> = ({ 
  value, 
  direction = "up", 
  suffix = "", 
  prefix = "",
  decimals = 0 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + latest.toFixed(decimals) + suffix;
      }
    });
  }, [springValue, prefix, suffix, decimals]);

  return <span ref={ref} />;
};
