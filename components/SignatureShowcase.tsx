"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";

export default function SignatureShowcase() {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cardRef1 = use3DTilt<HTMLDivElement>();
  const cardRef2 = use3DTilt<HTMLDivElement>();
  const cardRef3 = use3DTilt<HTMLDivElement>();
  const cardRef4 = use3DTilt<HTMLDivElement>();

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4];

  // Pause auto-glide when interacting and resume after 5s of inactivity
  const handleUserInteraction = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Scroll desktop carousel to a specific page (0: cards 1 & 2, 1: cards 3 & 4)
  const scrollToDesktopPage = (pageIndex: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const targetCardIndex = pageIndex === 0 ? 0 : 2;
    const targetCard = cardRefs[targetCardIndex]?.current;
    if (targetCard) {
      const targetLeft = targetCard.offsetLeft - el.offsetLeft;
      el.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    } else {
      el.scrollTo({
        left: pageIndex === 0 ? 0 : el.scrollWidth / 2,
        behavior: "smooth",
      });
    }
    setDesktopPage(pageIndex);
    setActiveIndex(pageIndex === 0 ? 0 : 2);
  };

  // Scroll mobile snap track to a specific card index (0 - 3)
  const scrollToMobileIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".mobile-snap-item");
    if (items[index]) {
      const left = items[index].offsetLeft - el.offsetLeft;
      el.scrollTo({
        left: Math.max(0, left),
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
    setDesktopPage(index < 2 ? 0 : 1);
  };

  // Navigation handlers for < and > arrow controls
  const handlePrev = () => {
    handleUserInteraction();
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      const nextPage = desktopPage === 0 ? 1 : 0;
      scrollToDesktopPage(nextPage);
    } else {
      const nextIdx = activeIndex > 0 ? activeIndex - 1 : 3;
      scrollToMobileIndex(nextIdx);
    }
  };

  const handleNext = () => {
    handleUserInteraction();
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      const nextPage = desktopPage === 0 ? 1 : 0;
      scrollToDesktopPage(nextPage);
    } else {
      const nextIdx = activeIndex < 3 ? activeIndex + 1 : 0;
      scrollToMobileIndex(nextIdx);
    }
  };

  // Synchronize indicators with manual touch swipe or trackpad scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      const scrollLeft = el.scrollLeft;
      const targetCard = cardRefs[2]?.current;
      const halfWay = targetCard ? (targetCard.offsetLeft - el.offsetLeft) / 2 : el.clientWidth / 2;
      const page = scrollLeft >= halfWay ? 1 : 0;
      setDesktopPage(page);
      setActiveIndex(page === 0 ? 0 : 2);
    } else {
      const scrollLeft = el.scrollLeft;
      const item = el.querySelector<HTMLElement>(".mobile-snap-item");
      if (item) {
        const itemWidth = item.offsetWidth + 16;
        const idx = Math.round(scrollLeft / itemWidth);
        const bounded = Math.min(Math.max(0, idx), 3);
        setActiveIndex(bounded);
        setDesktopPage(bounded < 2 ? 0 : 1);
      }
    }
  };

  // Auto-glide timer: smoothly transitions every 5 seconds when idle
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return;

      const el = scrollRef.current;
      if (!el) return;

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
      if (isDesktop) {
        setDesktopPage((prevPage) => {
          const nextPage = prevPage === 0 ? 1 : 0;
          const targetCardIndex = nextPage === 0 ? 0 : 2;
          const targetCard = cardRefs[targetCardIndex]?.current;
          if (targetCard) {
            const targetLeft = targetCard.offsetLeft - el.offsetLeft;
            el.scrollTo({
              left: Math.max(0, targetLeft),
              behavior: "smooth",
            });
          }
          setActiveIndex(nextPage === 0 ? 0 : 2);
          return nextPage;
        });
      } else {
        setActiveIndex((prevIdx) => {
          const nextIdx = (prevIdx + 1) % 4;
          const items = el.querySelectorAll<HTMLElement>(".mobile-snap-item");
          if (items[nextIdx]) {
            const left = items[nextIdx].offsetLeft - el.offsetLeft;
            el.scrollTo({
              left: Math.max(0, left),
              behavior: "smooth",
            });
          }
          setDesktopPage(nextIdx < 2 ? 0 : 1);
          return nextIdx;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="signatureShowcaseSection"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-8 lg:mb-10 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ember-400 block mb-2">
              Handcrafted in Galle &middot; Culinary Signatures
            </span>
            <h2 className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              CRAFTED FOR <span className="italic font-normal text-[#f04e23]">CRAVINGS.</span>
            </h2>
            <p className="gsap-fade-up text-stone-300 text-sm sm:text-base max-w-xl mt-3">
              From wood-fired coastal seafood pizzas and fiery Southern Nai Miris specials to bubbling oven-baked chicken lasagna.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation Arrows & Active Page Indicator */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="hidden md:flex items-center gap-3 bg-obsidian-900/90 px-3 py-1.5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md"
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous signature dishes"
                className="w-9 h-9 rounded-xl bg-obsidian-950/80 hover:bg-ember-500 hover:text-white text-stone-300 flex items-center justify-center transition border border-white/5 active:scale-95 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Active Pagination Indicator (Page 1 / 2) & Interactive Dots */}
              <div className="flex items-center gap-2 px-1 text-xs text-stone-300 select-none">
                <span className="text-stone-400 font-medium">Page</span>
                <span className="font-bold text-amber-400">{desktopPage + 1}</span>
                <span className="text-stone-600">/</span>
                <span className="text-stone-400 font-medium">2</span>
                <div className="flex items-center gap-1.5 ml-2" role="tablist" aria-label="Signature slide pages">
                  <button
                    type="button"
                    onClick={() => {
                      handleUserInteraction();
                      scrollToDesktopPage(0);
                    }}
                    aria-label="View Page 1: Signature Pizzas"
                    aria-selected={desktopPage === 0}
                    role="tab"
                    className={`h-2 rounded-full transition-all duration-300 ${
                      desktopPage === 0
                        ? "w-6 bg-gradient-to-r from-ember-500 to-amber-500 shadow-sm shadow-ember-500/50"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleUserInteraction();
                      scrollToDesktopPage(1);
                    }}
                    aria-label="View Page 2: Lasagna and Burgers"
                    aria-selected={desktopPage === 1}
                    role="tab"
                    className={`h-2 rounded-full transition-all duration-300 ${
                      desktopPage === 1
                        ? "w-6 bg-gradient-to-r from-ember-500 to-amber-500 shadow-sm shadow-ember-500/50"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next signature dishes"
                className="w-9 h-9 rounded-xl bg-obsidian-950/80 hover:bg-ember-500 hover:text-white text-stone-300 flex items-center justify-center transition border border-white/5 active:scale-95 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-amber-300 hover:text-white transition btn-magnetic"
            >
              <span>View Full 27-Item Menu</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 3D Depth Multi-Plane Cards Container (Mobile Horizontal Snap Track / Desktop Smooth Horizontal Slider) */}
        <div
          id="depthCardsStage"
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={handleUserInteraction}
          onTouchEnd={() => {
            if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
            pauseTimerRef.current = setTimeout(() => setIsPaused(false), 5000);
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mobile-snap-track flex gap-4 md:gap-6 overflow-x-auto md:overflow-x-hidden no-scrollbar scroll-smooth relative perspective-stage -mx-4 px-4 md:mx-0 md:px-0 py-3 md:py-4"
        >
          {/* 3D Depth Card 1: Heavenly Mix Supreme */}
          <div
            ref={cardRef1}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-5 sm:p-6 lg:p-6 cursor-pointer mobile-snap-item w-[85vw] max-w-[340px] shrink-0 md:w-[calc(50%-12px)] md:shrink-0 flex flex-col justify-between"
            data-depth-speed="-1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-ember-500/15 via-transparent to-amber-500/10 rounded-3xl blur-xl pointer-events-none" />

            {/* Badges */}
            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-3 sm:mb-3.5">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-obsidian-950/90 border border-ember-500/40 text-amber-300 text-[11px] sm:text-xs font-semibold shadow-md">
                Chef&apos;s Signature Bestseller
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-ember-500 text-white text-[11px] sm:text-xs font-bold shadow-md">
                LKR 2,100
              </span>
            </div>

            {/* Dish Image */}
            <div className="depth-layer-img relative h-44 sm:h-52 md:h-56 lg:h-60 rounded-2xl overflow-hidden border border-white/10 mb-3.5 sm:mb-4">
              <img
                src="/assets/heavenly-mix-pizza.jpg"
                alt="Heavenly Mix Supreme Pizza"
                className="gsap-parallax-img w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            {/* Ingredient Pills */}
            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-amber-200">
                Ocean Prawns &amp; Calamari
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-emerald-300">
                Molten Mozzarella
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-ember-400">
                Spiced Roast Chicken
              </span>
            </div>

            {/* Typography & Order CTA */}
            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-3 sm:gap-4 mt-auto">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">Heavenly Mix Supreme</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 line-clamp-2">
                  Seven coastal &amp; wood-fired toppings layered over hand-tossed olive oil crust.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="heavenly-mix"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("heavenly-mix", "Heavenly Mix Pizza", 2100);
                }}
                className="shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 active:scale-95 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md transition"
              >
                + Order Slice
              </button>
            </div>
          </div>

          {/* 3D Depth Card 2: Devilled & Nai Miris Supreme */}
          <div
            ref={cardRef2}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-5 sm:p-6 lg:p-6 cursor-pointer mobile-snap-item w-[85vw] max-w-[340px] shrink-0 md:w-[calc(50%-12px)] md:shrink-0 flex flex-col justify-between"
            data-depth-speed="1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-amber-500/15 via-transparent to-ember-500/15 rounded-3xl blur-xl pointer-events-none" />

            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-3 sm:mb-3.5">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-obsidian-950/90 border border-amber-500/40 text-ember-400 text-[11px] sm:text-xs font-semibold shadow-md">
                Southern Island Fire
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-amber-500 text-obsidian-950 text-[11px] sm:text-xs font-bold shadow-md">
                LKR 1,750
              </span>
            </div>

            <div className="depth-layer-img relative h-44 sm:h-52 md:h-56 lg:h-60 rounded-2xl overflow-hidden border border-white/10 mb-3.5 sm:mb-4">
              <img
                src="/assets/devilled-pizza.jpg"
                alt="Devilled Chicken & Nai Miris Pizza"
                className="gsap-parallax-img w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-ember-400">
                Fresh Southern Nai Miris
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-amber-200">
                Sweet-Chili Devilled Glaze
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-stone-200">
                Crisp Capsicum &amp; Shallots
              </span>
            </div>

            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-3 sm:gap-4 mt-auto">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">Devilled &amp; Nai Miris Supreme</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 line-clamp-2">
                  Galle&apos;s signature sweet-heat devilled chicken fused with aromatic scotch bonnet chilli.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="devilled-supreme"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("devilled-supreme", "Devilled Chicken Supreme Pizza", 1750);
                }}
                className="shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 active:scale-95 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md transition"
              >
                + Order Slice
              </button>
            </div>
          </div>

          {/* 3D Depth Card 3: Oven-Baked Lasagna */}
          <div
            ref={cardRef3}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-5 sm:p-6 lg:p-6 cursor-pointer mobile-snap-item w-[85vw] max-w-[340px] shrink-0 md:w-[calc(50%-12px)] md:shrink-0 flex flex-col justify-between"
            data-depth-speed="-1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-gold-500/10 via-transparent to-ember-500/10 rounded-3xl blur-xl pointer-events-none" />

            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-3 sm:mb-3.5">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-obsidian-950/90 border border-gold-400/40 text-gold-300 text-[11px] sm:text-xs font-semibold shadow-md">
                Oven-Baked Heritage
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-ember-500 text-white text-[11px] sm:text-xs font-bold shadow-md">
                LKR 1,450
              </span>
            </div>

            <div className="depth-layer-img relative h-44 sm:h-52 md:h-56 lg:h-60 rounded-2xl overflow-hidden border border-white/10 mb-3.5 sm:mb-4">
              <img
                src="/assets/baked-lasagna.jpg"
                alt="Heavenly Baked Chicken Lasagna"
                className="gsap-parallax-img w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-amber-200">
                Slow-Braised Chicken Ragù
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-gold-300">
                Velvety French Béchamel
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-emerald-300">
                Garden Herbs &amp; Parmesan
              </span>
            </div>

            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-3 sm:gap-4 mt-auto">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">Baked Chicken Lasagna</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 line-clamp-2">
                  Golden bubbling mozzarella crust over velvety béchamel and spiced chicken ragù.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="heavenly-lasagna"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("heavenly-lasagna", "Heavenly Baked Chicken Lasagna", 1450);
                }}
                className="shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 active:scale-95 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md transition"
              >
                + Order Dish
              </button>
            </div>
          </div>

          {/* 3D Depth Card 4: Crispy Chicken Burgers & Boba */}
          <div
            ref={cardRef4}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-5 sm:p-6 lg:p-6 cursor-pointer mobile-snap-item w-[85vw] max-w-[340px] shrink-0 md:w-[calc(50%-12px)] md:shrink-0 flex flex-col justify-between"
            data-depth-speed="1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/15 rounded-3xl blur-xl pointer-events-none" />

            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-3 sm:mb-3.5">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-obsidian-950/90 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs font-semibold shadow-md">
                Galle Crispy Duo
              </span>
              <span className="px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-amber-500 text-obsidian-950 text-[11px] sm:text-xs font-bold shadow-md">
                LKR 680 – 750
              </span>
            </div>

            <div className="depth-layer-img relative h-44 sm:h-52 md:h-56 lg:h-60 rounded-2xl overflow-hidden border border-white/10 mb-3.5 sm:mb-4">
              <img
                src="/assets/crispy-chicken-burger.jpg"
                alt="Golden Crispy Chicken Burger and Fries"
                className="gsap-parallax-img w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-amber-200">
                Hand-Breaded Crispy Fillet
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-purple-300">
                Brown Sugar Pearl Milk Tea
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-[10px] sm:text-[11px] text-emerald-300">
                Peri-Peri Seasoned Fries
              </span>
            </div>

            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-3 sm:gap-4 mt-auto">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">Crispy Burgers &amp; Boba</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 line-clamp-2">
                  Ultra-crunchy golden chicken burgers paired with chilled brown sugar pearl milk tea.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="crispy-chicken-burger"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("crispy-chicken-burger", "Golden Crispy Chicken Burger", 680);
                }}
                className="shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 active:scale-95 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md transition"
              >
                + Order Burger
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Carousel Sub-Navigation & Page Feedback */}
        <div className="hidden md:flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs text-stone-400">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ember-500"></span>
            </span>
            <span className="text-stone-300">
              {desktopPage === 0
                ? "Dishes 1 & 2 of 4 \u00B7 Wood-Fired Coastal & Fiery Sri Lankan Specials"
                : "Dishes 3 & 4 of 4 \u00B7 Heritage Baked Lasagna & Crispy Gourmet Burgers"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                handleUserInteraction();
                scrollToDesktopPage(0);
              }}
              className={`transition font-medium pb-0.5 border-b-2 ${
                desktopPage === 0
                  ? "border-ember-500 text-white font-semibold"
                  : "border-transparent text-stone-400 hover:text-stone-200"
              }`}
            >
              1. Signature Pizzas
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              type="button"
              onClick={() => {
                handleUserInteraction();
                scrollToDesktopPage(1);
              }}
              className={`transition font-medium pb-0.5 border-b-2 ${
                desktopPage === 1
                  ? "border-ember-500 text-white font-semibold"
                  : "border-transparent text-stone-400 hover:text-stone-200"
              }`}
            >
              2. Lasagna &amp; Burgers
            </button>
          </div>
        </div>

        {/* Mobile Indicator Bar with Swipe Hint, Dots & Prev/Next */}
        <div className="md:hidden mt-4 sm:mt-6 flex flex-col gap-3 px-1">
          <div className="flex items-center justify-between">
            {/* Swipe hint */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember-500"></span>
              </span>
              <span className="text-xs font-medium tracking-wide uppercase text-stone-300">
                &larr; Swipe signatures or tap to order &rarr;
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Signature items navigation">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handleUserInteraction();
                    scrollToMobileIndex(idx);
                  }}
                  aria-label={`Go to signature item ${idx + 1}`}
                  aria-selected={activeIndex === idx}
                  role="tab"
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? "w-6 bg-gradient-to-r from-ember-500 to-amber-500 shadow-sm shadow-ember-500/50"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick navigation arrows & slide counter */}
          <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/10">
            <span>
              Signature <strong className="text-white">{activeIndex + 1}</strong> of <strong className="text-white">4</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous signature card"
                className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-white/10 text-stone-300 hover:text-white hover:border-ember-500/50 active:scale-95 transition flex items-center gap-1 text-xs"
              >
                <span>&larr;</span> Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next signature card"
                className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-white/10 text-stone-300 hover:text-white hover:border-ember-500/50 active:scale-95 transition flex items-center gap-1 text-xs"
              >
                Next <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
