"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";

export interface Use3DTiltOptions {
  /** Maximum tilt angle in degrees. Defaults to 9. */
  maxTilt?: number;
  /** Hover scale factor. Defaults to 1.02. */
  scale?: number;
  /** Whether the tilt effect is currently disabled. Defaults to false. */
  disabled?: boolean;
}

/**
 * Standalone utility to bind 3D interactive perspective tilt to an HTMLElement.
 * Computes rotateX/rotateY based on cursor position relative to element center,
 * updates CSS custom properties `--glare-x` and `--glare-y` for specular highlight,
 * and resets smoothly using GSAP elastic spring on mouse leave.
 */
export function bind3DTilt(
  card: HTMLElement,
  options: Use3DTiltOptions = {}
): () => void {
  const { maxTilt = 9, scale = 1.02, disabled = false } = options;
  if (disabled) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);

    if (typeof window !== "undefined" && gsap) {
      gsap.to(card, {
        rotateX,
        rotateY,
        scale,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    } else {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && gsap) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.65,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto"
      });
    } else {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    card.removeEventListener("mousemove", handleMouseMove);
    card.removeEventListener("mouseleave", handleMouseLeave);
    if (typeof window !== "undefined" && gsap) {
      gsap.killTweensOf(card);
    }
  };
}

/**
 * Custom React hook for attaching 3D perspective mouse tilt to cards.
 * Can be called with no arguments (returns a new ref), with options,
 * or with an existing RefObject.
 *
 * Example:
 * const cardRef = use3DTilt<HTMLDivElement>();
 * return <div ref={cardRef} className="depth-card-3d">...</div>;
 */
export function use3DTilt<T extends HTMLElement = HTMLElement>(
  targetRefOrOptions?: RefObject<T | null> | Use3DTiltOptions,
  maybeOptions?: Use3DTiltOptions
): RefObject<T | null> {
  const internalRef = useRef<T>(null);

  const isRef =
    targetRefOrOptions &&
    typeof targetRefOrOptions === "object" &&
    "current" in targetRefOrOptions;

  const ref = (isRef ? targetRefOrOptions : internalRef) as RefObject<T | null>;
  const options = (isRef ? maybeOptions : (targetRefOrOptions as Use3DTiltOptions)) || {};

  const { maxTilt = 9, scale = 1.02, disabled = false } = options;

  useEffect(() => {
    const card = ref.current;
    if (!card || disabled) return;

    return bind3DTilt(card, { maxTilt, scale, disabled });
  }, [ref, maxTilt, scale, disabled]);

  return ref;
}

export default use3DTilt;
