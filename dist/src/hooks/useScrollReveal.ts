import { useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal(options?: { once?: boolean; margin?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? "0px 0px -140px 0px",
    amount: options?.amount ?? 0.15,
  });

  return { ref, isInView };
}
