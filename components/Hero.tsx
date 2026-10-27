"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import EmberCanvas from "@/components/EmberCanvas";

export default function Hero() {
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Auto-play video smoothly
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    const ctx = gsap.context(() => {
      // Hero Entrance Staggered Typography
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          "#heroBadgeText",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          ["#heroTitleLine1", "#heroTitleLine2"],
          { opacity: 0, y: 45, rotateX: -45, transformOrigin: "50% 100%" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.16,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
        .fromTo(
          "#heroSubtitle",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          "#heroCtaRow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          "#heroMagicCallout",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          "#heroCircleBadge",
          { opacity: 0, scale: 0.8, rotate: -20 },
          {
            opacity: 1,
            scale: 1,
            rotate: -6,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // Hero Background Video Parallax on Scroll
      gsap.to("#heroBgVideo", {
        yPercent: 16,
        scale: 1.12,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: "#heroSection",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToSignature = () => {
    const target = document.getElementById("signatureShowcaseSection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="heroSection"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden"
    >
      {/* Full-Bleed Background Video */}
      <div id="heroVideoWrapper" className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          id="heroBgVideo"
          src="/assets/hero-video.mp4"
          poster="/assets/heavenly-mix-pizza.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 will-change-transform"
        />
        <div className="absolute inset-0 hero-cinematic-vignette" />
      </div>

      {/* Subtle Floating Oven Embers Canvas */}
      <EmberCanvas />

      {/* Main Hero Editorial Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* Left Editorial Column */}
          <div className="lg:col-span-8 space-y-6" id="heroEditorialCol">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.26em] uppercase text-stone-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#e84a27] shadow-[0_0_10px_#e84a27]" />
              <span id="heroBadgeText">HEAVENLY PIZZA &middot; GALLE, SRI LANKA</span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.02] perspective-stage">
              <span id="heroTitleLine1" className="block text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                A little slice
              </span>
              <span id="heroTitleLine2" className="block mt-1 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                <span className="text-white">of </span>
                <em className="italic font-serif font-normal text-[#f04e23]">heaven.</em>
              </span>
            </h1>

            {/* Subtitle */}
            <p id="heroSubtitle" className="text-stone-200/95 text-base sm:text-xl max-w-xl leading-relaxed font-normal pt-1">
              Big cravings. Beautiful moments.
              <br />
              Your next favourite bite is right here in Galle.
            </p>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2" id="heroCtaRow">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-xl bg-[#e84a27] hover:bg-[#d43815] text-white font-bold text-xs sm:text-sm tracking-[0.16em] uppercase shadow-lg ember-glow transition transform hover:-translate-y-0.5 flex items-center gap-3 btn-magnetic"
              >
                <span>EXPLORE THE MENU</span>
                <span className="text-base leading-none">↗</span>
              </Link>
              <Link
                href="/studio"
                className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white font-bold text-xs sm:text-sm tracking-[0.16em] uppercase transition transform hover:-translate-y-0.5 flex items-center gap-2 btn-magnetic"
              >
                <span>SLICE STUDIO</span>
                <span className="text-base leading-none">✦</span>
              </Link>
            </div>

            {/* Hallmark Callout */}
            <div className="pt-4 max-w-md border-t border-white/10" id="heroMagicCallout">
              <div className="flex items-start gap-3.5 pt-3">
                <div className="w-6 h-6 rounded-full border border-ember-500/50 flex items-center justify-center text-ember-400 font-serif text-xs font-bold shrink-0 mt-0.5">
                  ✦
                </div>
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                    PIZZA &middot; PEOPLE &middot; ARTISANAL CRAFT
                  </div>
                  <p className="font-serif italic text-stone-300 text-sm sm:text-base mt-0.5">
                    Bring your appetite. We&apos;ll take it from here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Circular Gastronomy Seal + Chef's Recommendation Capsule */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-5">
            {/* Gastronomy Crest Seal */}
            <div
              id="heroCircleBadge"
              onClick={handleScrollToSignature}
              className="hero-circle-badge w-44 h-44 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center text-center p-5 cursor-pointer select-none border border-ember-500/40"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-ember-500/60 mb-2 shadow-sm">
                <img
                  src="/assets/heavenly-logo.jpg"
                  alt="Heavenly Pizza Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif italic font-bold text-white text-sm sm:text-base leading-tight tracking-wide">
                MORE THAN
              </span>
              <span className="font-serif italic font-bold text-white text-sm sm:text-base leading-tight tracking-wide">
                A SLICE.
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-amber-300/80 font-medium mt-1.5">
                HEAVENLY PIZZA · GALLE
              </span>
            </div>

            {/* Chef's Instant Recommendation Capsule */}
            <div className="card-cinematic rounded-2xl p-4 w-full max-w-sm backdrop-blur-md border border-white/10">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="text-amber-300/95 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Chef&apos;s Express Selection
                </span>
                <span className="text-stone-400 text-[11px]">4.4★ (95+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-quick-add="heavenly-mix"
                  onClick={() => addToCart("heavenly-mix", "Heavenly Mix Pizza", 2100)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-ember-500 hover:bg-ember-600 text-white font-semibold text-xs transition shadow-sm"
                >
                  + Add Mix (LKR 2,100)
                </button>
                <button
                  type="button"
                  data-quick-add="devilled-supreme"
                  onClick={() => addToCart("devilled-supreme", "Devilled Chicken Supreme Pizza", 1750)}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-amber-200 font-medium text-xs transition border border-white/10"
                >
                  + Devilled (1,750)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-stone-400 font-medium">
        <a
          href="#signatureShowcaseSection"
          className="hover:text-white transition flex items-center gap-2 group"
        >
          <span>SCROLL TO EXPLORE DISHES</span>
          <span className="inline-block group-hover:translate-y-1 transition-transform text-ember-400">↓</span>
        </a>
        <span className="hidden sm:inline text-stone-400/80">
          10,000+ COMMUNITY &middot; KAHADUWAWATTHA, GALLE
        </span>
      </div>
    </section>
  );
}
