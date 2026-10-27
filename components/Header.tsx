"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  return (
    <>
      {/* TOP ORANGE-RED ANNOUNCEMENT BAR (Matching Screenshot 599) */}
      <div className="bg-[#e03e1a] text-white text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase py-2.5 px-4 sm:px-8 border-b border-white/15 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold tracking-[0.18em]">GOOD FOOD. GOOD COMPANY. GALLE.</span>
          <a
            href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition flex items-center gap-1.5 font-bold tracking-[0.15em]"
          >
            <span>FIND YOUR LITTLE SLICE OF HEAVEN</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* STICKY DARK HEADER WITH OFFICIAL UPLOADED LOGO (Matching Screenshot 599) */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo using User's Uploaded Official Logo */}
          <a href="#heroSection" className="flex items-center gap-3.5 group focus:outline-none">
            <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-ember-500/80 shadow-lg ember-glow group-hover:scale-105 transition duration-300 shrink-0 bg-[#e03e1a]">
              <img
                src="/assets/heavenly-logo.jpg"
                alt="Heavenly Pizza Official Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-none">
              <span className="block font-serif font-extrabold text-lg sm:text-xl tracking-wider text-white">
                HEAVENLY
              </span>
              <p id="brandSubTagline" className="text-xs text-stone-300 font-serif italic mt-0.5">
                pizza · galle
              </p>
            </div>
          </a>

          {/* Center Desktop Navigation Links (Matching Screenshot 599) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#menuSection" className="hover:text-white transition">
              The menu
            </a>
            <a href="#customizerSection" className="hover:text-white transition">
              Slice Studio
            </a>
            <a href="#ambienceSection" className="hover:text-white transition">
              Our vibe
            </a>
            <a href="#reviewsSection" className="hover:text-white transition">
              Stories
            </a>
            <a href="#reservationSection" className="hover:text-white transition">
              Find us
            </a>
          </nav>

          {/* Right Action Buttons: Cart Bag + LET'S EAT CTA + Mobile Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              id="openCartBtn"
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-semibold transition"
            >
              <span>🍕</span>
              <span className="sr-only sm:not-sr-only sm:inline text-stone-200">Your Order</span>
              <span
                id="cartCountBadge"
                className="px-2 py-0.5 rounded-full bg-ember-500 text-white text-xs font-bold"
              >
                {cartCount}
              </span>
            </button>

            <a
              href="#menuSection"
              id="headerLetsEatBtn"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e84a27] hover:bg-[#d43815] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg ember-glow transition"
            >
              <span>LET'S EAT</span>
              <span>↗</span>
            </a>

            <button
              id="mobileMenuBtn"
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Menu */}
        <div
          id="mobileNavDrawer"
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:hidden bg-obsidian-900/98 border-b border-white/10 px-4 pt-3 pb-5 space-y-2.5 text-sm`}
        >
          <a
            href="#heroSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
          >
            ✨ Hero Video Experience
          </a>
          <a
            href="#menuSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
          >
            🍕 The Menu (27 Items)
          </a>
          <a
            href="#customizerSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
          >
            🔥 Interactive Slice Studio
          </a>
          <a
            href="#ambienceSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
          >
            🌿 Our Vibe (Garden &amp; Indoor)
          </a>
          <a
            href="#reviewsSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
          >
            ⭐ Customer Stories (10K+)
          </a>
          <a
            href="#reservationSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
          >
            📍 Find Us &amp; Book a Table
          </a>
          <div className="pt-2 flex gap-2">
            <a
              href="tel:+94711118989"
              className="flex-1 text-center py-2.5 rounded-lg bg-white/10 text-amber-200 font-medium text-xs"
            >
              📞 Call 071 111 8989
            </a>
            <a
              href="https://wa.me/94711118989"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg bg-emerald-600/80 text-white font-medium text-xs"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
