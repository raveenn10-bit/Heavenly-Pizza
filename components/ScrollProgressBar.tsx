"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === document.body) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={barRef}
      id="scrollProgressBar"
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-ember-500 via-gold-400 to-ember-500 z-50 pointer-events-none"
      style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
    />
  );
}
