"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";

export default function Ambience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = use3DTilt<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax scrub on ambience image
      if (imgRef.current && imgRef.current.parentElement) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -10, scale: 1.14 },
          {
            yPercent: 10,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: imgRef.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Scroll depth animations for cards in this section
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
      id="ambienceSection"
      ref={sectionRef}
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage"
    >
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Story & Amenities */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block">
            Kahaduwawattha • Baddegama Road • Galle
          </span>
          <h2 className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            PEACEFUL GARDEN &amp;{" "}
            <span className="italic font-normal text-[#f04e23]">COZY VIBE.</span>
          </h2>
          <p className="gsap-fade-up text-stone-300 text-sm sm:text-base leading-relaxed">
            At Heavenly Pizza, we believe a great meal is about more than what&apos;s on
            your plate. It&apos;s about relaxing with your family under warm garden
            string lights, meeting friends over bubbling cheesy lasagna, and
            celebrating life&apos;s special milestones — from birthday dinners to
            intimate <em>Bride-to-Be</em> gatherings.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="gsap-scroll-depth card-cinematic rounded-2xl p-4">
              <div className="text-base font-bold text-amber-300 mb-1 tracking-wide">
                Starlit Garden Patio
              </div>
              <p className="text-xs text-stone-400">
                Lush tropical greenery, evening breeze, and ambient lighting ideal for
                groups and couples.
              </p>
            </div>
            <div className="gsap-scroll-depth card-cinematic rounded-2xl p-4">
              <div className="text-base font-bold text-ember-400 mb-1 tracking-wide">
                Celebration Packages
              </div>
              <p className="text-xs text-stone-400">
                Custom table setups for Bridal Showers (&quot;Bride to Be&quot;), birthdays,
                and family reunions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-stone-300">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Free Parking Lot &amp; Street Parking</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Credit, Debit &amp; NFC Mobile Payments</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Table Service &amp; Kid-Friendly</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Image Card with Direction Link */}
        <div className="lg:col-span-6">
          <div
            ref={cardRef}
            className="depth-card-3d gsap-scroll-depth relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group p-3 card-cinematic"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none"></div>
            <div className="depth-layer-img relative rounded-2xl overflow-hidden h-80 sm:h-96">
              <img
                ref={imgRef}
                src="/assets/garden-ambience.jpg"
                alt="Heavenly Pizza Garden and Indoor Dining Ambience"
                className="gsap-parallax-img w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <div className="depth-layer-front absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 z-20">
              <div className="bg-obsidian-950/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 max-w-md shadow-2xl">
                <span className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold block">
                  Featured Community Moment
                </span>
                <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                  &quot;Story of a happy customer — Bride to Be Celebration with Stories
                  with Dandelions&quot;
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 text-white text-xs font-semibold shadow-lg transition"
              >
                📍 Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
