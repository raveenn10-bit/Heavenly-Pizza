"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";

export interface ReviewItem {
  id: string;
  source: string;
  quote: string;
  author: string;
  verifiedLabel: string;
}

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: "review-1",
    source: "Google Review • June 2026",
    quote:
      "Visited Heavenly Pizza and honestly loved every bite. The pizza was fresh, cheesy, and packed with authentic flavor.",
    author: "Dine-In Guest",
    verifiedLabel: "Verified Visit",
  },
  {
    id: "review-2",
    source: "Google Review • May 2026",
    quote:
      "I ordered from Heavenly Pizza Galle through PickMe, and it was amazing! The crust tasted exquisite and the drinks were perfect.",
    author: "Galle Delivery Customer",
    verifiedLabel: "Verified Order",
  },
  {
    id: "review-3",
    source: "Google Review • April 2026",
    quote:
      "Delicious pizza, good service, and nice atmosphere. Perfect spot in Kahaduwawattha for family dinner and crispy chicken.",
    author: "Local Guide • Galle",
    verifiedLabel: "Verified Visit",
  },
  {
    id: "review-4",
    source: "Google Review • July 2026",
    quote:
      "The Devilled & Nai Miris pizza is next level! Real southern heat paired with generous mozzarella. The garden seating at night is magical.",
    author: "Colombo Weekend Traveler",
    verifiedLabel: "Verified Visit",
  },
  {
    id: "review-5",
    source: "Facebook Recommendation • June 2026",
    quote:
      "Celebrated my sister's Bride-to-Be dinner here under the fairy lights. The staff prepared the table beautifully and the lasagna was bubbling perfection!",
    author: "Galle Event Host",
    verifiedLabel: "Verified Event",
  },
  {
    id: "review-6",
    source: "Google Review • May 2026",
    quote:
      "Best crispy chicken burgers and boba drinks in Galle! Super clean, fast direct WhatsApp delivery, and genuinely warm hospitality.",
    author: "Daily Foodie",
    verifiedLabel: "Verified Order",
  },
];

function ReviewCard({ source, quote, author, verifiedLabel }: ReviewItem) {
  const cardRef = use3DTilt<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="depth-card-3d card-cinematic rounded-3xl p-6 flex flex-col justify-between w-[290px] sm:w-[350px] shrink-0 border border-white/10 hover:border-gold-400/40 transition-all select-none shadow-xl"
    >
      <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
      <div className="depth-layer-mid space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gold-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 fill-current text-gold-400"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-stone-400 px-2.5 py-0.5 rounded-full bg-white/5 font-medium border border-white/5">
            {source}
          </span>
        </div>
        <p className="text-stone-200 text-sm italic leading-relaxed">
          &quot;{quote}&quot;
        </p>
      </div>
      <div className="depth-layer-front mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <span className="font-semibold text-white">{author}</span>
        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px]">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {verifiedLabel}
        </span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector(".gsap-reviews-heading");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="reviewsSection"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-obsidian-950 border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="text-center sm:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
              10,000+ Followers • 4.4★ Verified Rating
            </span>
            <h2 className="gsap-reviews-heading font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              VOICES OF{" "}
              <span className="italic font-normal text-[#f04e23]">GALLE LOVERS.</span>
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Genuine testimonials from dine-in guests, party hosts, and doorstep delivery patrons across Galle.
            </p>
          </div>

          {/* Interactive Manual Scroll Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll reviews left"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 hover:border-gold-400/40 transition active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll reviews right"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 hover:border-gold-400/40 transition active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Auto-Scroll Ribbon Track with Edge Fades */}
      <div className="relative group/reviews pause-on-hover overflow-hidden w-full">
        {/* Left Gradient Edge Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-obsidian-950 to-transparent z-10" />

        {/* Right Gradient Edge Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-obsidian-950 to-transparent z-10" />

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar scroll-smooth w-full"
        >
          <div className="horizontal-auto-scroll-l2r flex gap-6 py-4 px-4 sm:px-6 pr-6">
            {[...REVIEWS_LIST, ...REVIEWS_LIST].map((review, idx) => (
              <ReviewCard key={`${review.id}-${idx}`} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
