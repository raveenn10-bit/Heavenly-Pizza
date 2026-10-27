"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import EmberCanvas from "@/components/EmberCanvas";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Attempt autoPlay if needed
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Entrance Staggered Typography & Elements
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo("#heroBadgeText", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          ["#heroTitleLine1", "#heroTitleLine2"],
          { opacity: 0, y: 55, rotateX: -65, transformOrigin: "50% 100%" },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.0, stagger: 0.18, ease: "back.out(1.5)" },
          "-=0.4"
        )
        .fromTo("#heroSubtitle", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .fromTo("#heroCtaRow", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo("#heroMagicCallout", { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.45")
        .fromTo(
          "#heroCircleBadge",
          { opacity: 0, scale: 0.65, rotate: -28 },
          { opacity: 1, scale: 1, rotate: -8, duration: 1.0, ease: "elastic.out(1, 0.65)" },
          "-=0.7"
        );

      // Hero Background Video Parallax & Fade on Scroll Down / Up
      gsap.to("#heroBgVideo", {
        yPercent: 18,
        scale: 1.16,
        opacity: 0.35,
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
      className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden"
    >
      {/* Full-Bleed Uploaded Video Background */}
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

      {/* Subtle Floating Oven Embers Canvas Overlay */}
      <EmberCanvas />

      {/* Main Hero Editorial Content (Matching Screenshot 599 Layout & Typography) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* Left Editorial Column */}
          <div className="lg:col-span-8 space-y-6" id="heroEditorialCol">
            {/* Kicker with orange dot */}
            <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.25em] uppercase text-stone-300 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e84a27] shadow-[0_0_12px_#e84a27]" />
              <span id="heroBadgeText">HEAVENLY PIZZA &nbsp;&nbsp; GALLE, SRI LANKA</span>
            </div>

            {/* Editorial Serif Headline: "A little slice / of heaven." */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.4rem] font-bold tracking-tight leading-[1.03] perspective-stage">
              <span id="heroTitleLine1" className="block text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                A little slice
              </span>
              <span id="heroTitleLine2" className="block mt-1 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                <span className="text-white">of </span>
                <em className="italic font-serif font-normal text-[#f04e23]">heaven.</em>
              </span>
            </h1>

            {/* Two-line Subtitle from Screenshot 599 */}
            <p id="heroSubtitle" className="text-stone-200/95 text-base sm:text-xl max-w-xl leading-relaxed font-normal pt-1">
              Big cravings. Beautiful moments.
              <br />
              Your next favourite bite is right here in Galle.
            </p>

            {/* Primary CTA Button Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2" id="heroCtaRow">
              <a
                href="#menuSection"
                className="px-7 py-4 rounded-xl bg-[#e84a27] hover:bg-[#d43815] text-white font-bold text-xs sm:text-sm tracking-[0.14em] uppercase shadow-xl ember-glow transition transform hover:-translate-y-0.5 flex items-center gap-3"
              >
                <span>EXPLORE THE MENU</span>
                <span className="text-base leading-none">↗</span>
              </a>
            </div>

            {/* Subtle Horizontal Rule + Asterisk Callout from Screenshot 599 */}
            <div className="pt-4 max-w-md border-t border-white/15" id="heroMagicCallout">
              <div className="flex items-start gap-3 pt-4">
                <span className="text-[#e84a27] font-serif text-3xl leading-none font-bold select-none">*</span>
                <div>
                  <div className="text-xs font-extrabold tracking-[0.2em] uppercase text-white">
                    PIZZA. PEOPLE. A LITTLE MAGIC.
                  </div>
                  <p className="font-serif italic text-stone-300 text-sm sm:text-base mt-0.5">
                    Bring your appetite. We'll take it from here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Circular "MORE THAN A SLICE." Badge + Quick-Order Spotlight */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-5">
            {/* Floating Tilted Circular Badge from Screenshot 599 */}
            <div
              id="heroCircleBadge"
              onClick={handleScrollToSignature}
              className="hero-circle-badge w-44 h-44 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center text-center p-5 cursor-pointer select-none"
            >
              <img
                src="/assets/heavenly-logo.jpg"
                alt="Heavenly Pizza Emblem"
                className="w-10 h-10 rounded-full object-cover border border-ember-500 mb-2 shadow-md"
              />
              <span className="font-serif italic font-bold text-white text-sm sm:text-base leading-tight tracking-wide">
                MORE THAN
              </span>
              <span className="font-serif italic font-bold text-white text-sm sm:text-base leading-tight tracking-wide">
                A SLICE.
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-amber-300/90 font-semibold mt-2">
                HEAVENLY PIZZA · GALLE
              </span>
            </div>

            {/* Compact Quick-Order Crown Jewel Card (Preserves Quick-Add Buttons) */}
            <div className="card-cinematic rounded-2xl p-4 w-full max-w-sm backdrop-blur-md border border-white/15">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-amber-300 font-semibold">👑 Instant Oven Quick-Add</span>
                <span className="text-stone-400">4.4★ (95+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-quick-add="heavenly-mix"
                  onClick={() => addToCart("heavenly-mix", "Heavenly Mix Pizza", 2100)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-ember-500 hover:bg-ember-600 text-white font-semibold text-xs transition shadow-md"
                >
                  + Add Heavenly Mix (LKR 2,100)
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

      {/* Bottom Hero Bar: SCROLL TO GET HUNGRY ↓ */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-stone-400 font-semibold">
        <a
          href="#signatureShowcaseSection"
          className="hover:text-white transition flex items-center gap-2 group"
        >
          <span>SCROLL TO GET HUNGRY</span>
          <span className="inline-block group-hover:translate-y-1 transition-transform text-ember-400">↓</span>
        </a>
        <span className="hidden sm:inline text-stone-400/80">
          10K+ FACEBOOK COMMUNITY · KAHADUWAWATTHA, GALLE
        </span>
      </div>
    </section>
  );
}
