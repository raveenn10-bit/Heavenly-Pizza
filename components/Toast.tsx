"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toastMessage } = useCart();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastMessage && toastRef.current) {
      if (typeof window !== "undefined" && gsap) {
        gsap.fromTo(
          toastRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  return (
    <div
      id="toastBanner"
      ref={toastRef}
      className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl bg-obsidian-900 border border-ember-500 text-white text-xs font-semibold shadow-2xl ember-glow"
    >
      {toastMessage}
    </div>
  );
}
