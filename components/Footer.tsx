"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { showToast } = useCart();
  const footerRef = useRef<HTMLElement>(null);
  const [vipInput, setVipInput] = useState("");

  const handleVipSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (vipInput.trim()) {
      showToast("Welcome to the Heavenly Pizza Galle VIP Club! 🍕✨");
      setVipInput("");
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth marquee loop
      gsap.to("#footerMarqueeTrack", {
        xPercent: -35,
        duration: 24,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle ambient glowing orbs
      gsap.to(".footer-glow-orb", {
        x: 30,
        y: -20,
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.5,
      });

      // Footer elements entrance
      const revealElements = footerRef.current?.querySelectorAll(".gsap-footer-reveal");
      if (revealElements && revealElements.length > 0) {
        revealElements.forEach((el, idx) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: idx * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#siteFooter",
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="siteFooter"
      ref={footerRef}
      className="relative bg-[#050404] border-t border-white/10 pt-10 pb-8 overflow-hidden text-stone-400"
    >
      {/* Ambient Ember Glow Orbs & Top Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ember-500 to-transparent opacity-80 pointer-events-none"></div>
      <div className="footer-glow-orb absolute -top-32 -left-24 w-96 h-96 rounded-full bg-ember-500/10 blur-3xl pointer-events-none"></div>
      <div className="footer-glow-orb absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* Scrolling Marquee Ticker Ribbon */}
      <div className="border-b border-white/10 pb-5 mb-8 overflow-hidden select-none">
        <div
          id="footerMarqueeTrack"
          className="flex items-center gap-10 whitespace-nowrap text-xs sm:text-sm font-serif italic tracking-[0.2em] uppercase text-stone-400/80"
        >
          <span>🍕 A LITTLE SLICE OF HEAVEN IN GALLE</span>
          <span className="text-ember-500">✦</span>
          <span>🔥 HAND-TOSSED WOOD-FIRED FLAVOURS</span>
          <span className="text-ember-500">✦</span>
          <span>🌿 PEACEFUL STARLIT GARDEN DINING</span>
          <span className="text-ember-500">✦</span>
          <span>🛵 DIRECT WHATSAPP, UBER EATS &amp; PICKME DELIVERY</span>
          <span className="text-ember-500">✦</span>
          <span>🍕 A LITTLE SLICE OF HEAVEN IN GALLE</span>
          <span className="text-ember-500">✦</span>
          <span>🔥 HAND-TOSSED WOOD-FIRED FLAVOURS</span>
          <span className="text-ember-500">✦</span>
          <span>🌿 PEACEFUL STARLIT GARDEN DINING</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top CTA Banner */}
        <div className="gsap-footer-reveal card-cinematic rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-10 border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ember-400">
              <span className="w-2 h-2 rounded-full bg-ember-500 animate-ping"></span>
              <span>Craving Something Heavenly Tonight?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Fresh out of our Galle oven —{" "}
              <em className="italic font-normal text-[#f04e23]">
                straight to your table.
              </em>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <a
              href="#menuSection"
              className="px-6 py-3 rounded-xl bg-[#e84a27] hover:bg-[#d43815] text-white font-bold text-xs tracking-[0.14em] uppercase shadow-lg ember-glow transition flex items-center gap-2"
            >
              <span>Order Online Now</span>
              <span>↗</span>
            </a>
            <a
              href="https://wa.me/94711118989"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-bold text-xs tracking-[0.14em] uppercase transition flex items-center gap-2"
            >
              <span>💬 WhatsApp 071 111 8989</span>
            </a>
          </div>
        </div>

        {/* 4-Column Professional Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* Col 1: Brand Story & Emblem (4 cols) */}
          <div className="lg:col-span-4 space-y-4 gsap-footer-reveal">
            <a href="#heroSection" className="inline-flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ember-500 shadow-lg ember-glow group-hover:scale-105 transition">
                <img
                  src="/assets/heavenly-logo.jpg"
                  alt="Heavenly Pizza Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block font-serif font-extrabold text-xl tracking-wider text-white">
                  HEAVENLY
                </span>
                <span className="block text-xs text-stone-400 font-serif italic">
                  pizza · galle, sri lanka
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed pr-2">
              Crafting Galle&apos;s favourite artisanal wood-fired style pizzas,
              bubbling baked lasagna, crispy golden chicken burgers, and chilled
              boba drinks in a cozy starlit garden setting.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-ember-500/20 border border-white/10 hover:border-ember-500/50 text-xs text-stone-200 font-medium transition"
              >
                📍 Google Maps (4.4★)
              </a>
              <a
                href="https://www.ubereats.com/lk/store/heavenly-pizza-galle/SV1DJ9IwXcyz1lMebHDKxA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-ember-500/20 border border-white/10 hover:border-ember-500/50 text-xs text-stone-200 font-medium transition"
              >
                🛵 Uber Eats
              </a>
              <a
                href="https://wa.me/94711118989"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 text-xs text-stone-200 font-medium transition"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3 gsap-footer-reveal">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#heroSection"
                  className="hover:text-ember-400 transition flex items-center gap-1.5"
                >
                  <span className="text-ember-500">→</span>
                  <span>Home Cinema</span>
                </a>
              </li>
              <li>
                <a
                  href="#signatureShowcaseSection"
                  className="hover:text-ember-400 transition flex items-center gap-1.5"
                >
                  <span className="text-ember-500">→</span>
                  <span>Chef&apos;s Spotlight</span>
                </a>
              </li>
              <li>
                <a
                  href="#menuSection"
                  className="hover:text-ember-400 transition flex items-center gap-1.5"
                >
                  <span className="text-ember-500">→</span>
                  <span>Full Menu (27)</span>
                </a>
              </li>
              <li>
                <a
                  href="#customizerSection"
                  className="hover:text-ember-400 transition flex items-center gap-1.5"
                >
                  <span className="text-ember-500">→</span>
                  <span>Slice Studio</span>
                </a>
              </li>
              <li>
                <a
                  href="#ambienceSection"
                  className="hover:text-ember-400 transition flex items-center gap-1.5"
                >
                  <span className="text-ember-500">→</span>
                  <span>Garden Vibe</span>
                </a>
              </li>
              <li>
                <a
                  href="#reservationSection"
                  className="hover:text-ember-400 transition flex items-center gap-1.5"
                >
                  <span className="text-ember-500">→</span>
                  <span>Book a Table</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Cravings (3 cols) */}
          <div className="lg:col-span-3 space-y-3 gsap-footer-reveal">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              Galle Signatures
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-stone-200">👑 Heavenly Mix</span>
                <span className="text-gold-400 font-semibold">LKR 2,100</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-stone-200">🦐 Seafood Supreme</span>
                <span className="text-gold-400 font-semibold">LKR 1,900</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-stone-200">🌶️ Devilled &amp; Nai Miris</span>
                <span className="text-gold-400 font-semibold">LKR 1,750</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-stone-200">🧀 Baked Lasagna</span>
                <span className="text-gold-400 font-semibold">LKR 1,450</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-stone-200">🍔 Crispy Chicken Burger</span>
                <span className="text-gold-400 font-semibold">LKR 680</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit & Hours + VIP Club (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5 gsap-footer-reveal">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              Visit Flagship
            </h4>
            <div className="space-y-1.5 text-xs leading-relaxed">
              <p className="text-stone-300 font-medium">
                Baddegama Road, Kahaduwawattha (Kithulampitiya Rd), Galle 80000
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open Daily: 1:00 PM – 9:30 PM</span>
              </div>
              <p className="text-stone-300">
                📞 Hotline:{" "}
                <a
                  href="tel:+94711118989"
                  className="text-amber-300 hover:underline font-semibold"
                >
                  071 111 8989
                </a>
              </p>
              <p className="text-stone-400">
                ✉️{" "}
                <a
                  href="mailto:info@heavenlypizza.lk"
                  className="hover:text-white transition"
                >
                  info@heavenlypizza.lk
                </a>
              </p>
            </div>

            {/* Interactive VIP Slice Club Mini Form */}
            <form id="footerVipForm" onSubmit={handleVipSubmit} className="pt-1 space-y-1.5">
              <label
                htmlFor="footerVipInput"
                className="block text-[11px] uppercase tracking-wider text-amber-300 font-semibold"
              >
                🎁 Join Galle Slice VIP Deals
              </label>
              <div className="flex gap-1.5">
                <input
                  id="footerVipInput"
                  type="text"
                  required
                  value={vipInput}
                  onChange={(e) => setVipInput(e.target.value)}
                  placeholder="WhatsApp # or Email"
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-ember-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-ember-500 hover:bg-ember-600 text-white font-bold text-xs transition shrink-0"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Elegant Balanced Cinematic Wordmark */}
        <div className="pt-6 pb-2 text-center select-none pointer-events-none overflow-hidden">
          <div
            id="footerBigWordmark"
            className="font-serif font-black text-[9vw] sm:text-[6.5vw] lg:text-[5.5vw] tracking-[0.12em] uppercase leading-none bg-gradient-to-b from-white/[0.18] via-white/[0.06] to-transparent bg-clip-text text-transparent"
          >
            HEAVENLY PIZZA
          </div>
        </div>

        {/* Bottom Copyright & Fast Links Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5 text-xs text-stone-500">
          <p>
            © 2026 Heavenly Pizza Galle. All rights reserved. Crafted with passion in Galle, Sri Lanka.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              Directions
            </a>
            <a href="#menuSection" className="hover:text-stone-300 transition">
              Privacy &amp; Terms
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-ember-500 text-stone-200 hover:text-white font-semibold transition flex items-center gap-1"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
