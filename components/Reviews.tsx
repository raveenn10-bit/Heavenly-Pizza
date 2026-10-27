"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";

interface ReviewItemProps {
  source: string;
  quote: string;
  author: string;
  verifiedLabel: string;
}

function ReviewCard({ source, quote, author, verifiedLabel }: ReviewItemProps) {
  const cardRef = use3DTilt<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-6 flex flex-col justify-between"
    >
      <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none"></div>
      <div className="depth-layer-mid">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-gold-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 fill-current text-gold-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-stone-400 px-2.5 py-0.5 rounded-full bg-white/5 font-medium">
            {source}
          </span>
        </div>
        <p className="text-stone-200 text-sm italic leading-relaxed">
          &quot;{quote}&quot;
        </p>
      </div>
      <div className="depth-layer-front mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <span className="font-semibold text-white">{author}</span>
        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {verifiedLabel}
        </span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const depthCards = sectionRef.current?.querySelectorAll(".gsap-scroll-depth");
      if (depthCards && depthCards.length > 0) {
        depthCards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 70,
              rotateX: 16,
              scale: 0.92,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "bottom 12%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviewsSection"
      ref={sectionRef}
      className="py-16 bg-obsidian-900/60 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
            10,000+ Followers • 4.4★ Verified Rating
          </span>
          <h2 className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white">
            VOICES OF{" "}
            <span className="italic font-normal text-[#f04e23]">GALLE LOVERS.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 perspective-stage">
          <ReviewCard
            source="Google Review • June 2026"
            quote="Visited Heavenly Pizza and honestly loved every bite. The pizza was fresh, cheesy, and packed with authentic flavor."
            author="Dine-In Guest"
            verifiedLabel="Verified Visit"
          />

          <ReviewCard
            source="Google Review • May 2026"
            quote="I ordered from Heavenly Pizza Galle through PickMe, and it was amazing! The crust tasted exquisite and the drinks were perfect."
            author="Galle Delivery Customer"
            verifiedLabel="Verified Order"
          />

          <ReviewCard
            source="Google Review • April 2026"
            quote="Delicious pizza, good service, and nice atmosphere. Perfect spot in Kahaduwawattha for family dinner and crispy chicken."
            author="Local Guide • Galle"
            verifiedLabel="Verified Visit"
          />
        </div>
      </div>
    </section>
  );
}
