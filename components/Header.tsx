"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  return (
    <>
      {/* Top Refined Announcement Ribbon */}
      <div className="bg-[#d93815] text-white text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase py-2 px-4 sm:px-8 border-b border-white/10 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold tracking-[0.22em] text-white/95">
            Artisanal Wood-Fired · Galle, Sri Lanka
          </span>
          <a
            href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-200/90 hover:text-white transition flex items-center gap-1.5 font-semibold tracking-[0.16em]"
          >
            <span>Visit Flagship Location</span>
            <span className="text-sm leading-none">↗</span>
          </a>
        </div>
      </div>

      {/* Sticky Dark Header */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Editorial Title */}
          <a href="#heroSection" className="flex items-center gap-3.5 group focus:outline-none">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-ember-500/60 shadow-md group-hover:scale-105 transition duration-300 shrink-0 bg-[#e03e1a]">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#menuSection" className="hover:text-white transition tracking-wide">
              The Menu
            </a>
            <a href="#customizerSection" className="hover:text-white transition tracking-wide">
              Slice Studio
            </a>
            <a href="#ambienceSection" className="hover:text-white transition tracking-wide">
              Our Vibe
            </a>
            <a href="#reviewsSection" className="hover:text-white transition tracking-wide">
              Stories
            </a>
            <a href="#reservationSection" className="hover:text-white transition tracking-wide">
              Find Us
            </a>
          </nav>

          {/* Action Buttons: Cart + Order CTA + Mobile Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              id="openCartBtn"
              type="button"
              onClick={openCart}
              aria-label="View Order Tray"
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-semibold transition"
            >
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="sr-only sm:not-sr-only sm:inline text-stone-200">Order Tray</span>
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
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e84a27] hover:bg-[#d43815] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md transition"
            >
              <span>Explore Menu</span>
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

        {/* Mobile Navigation Drawer */}
        <div
          id="mobileNavDrawer"
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:hidden bg-obsidian-900/98 border-b border-white/10 px-5 pt-4 pb-6 space-y-3 text-sm`}
        >
          <a
            href="#heroSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200 font-medium"
          >
            Home Cinema Experience
          </a>
          <a
            href="#menuSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200 font-medium"
          >
            The Menu (27 Verified Items)
          </a>
          <a
            href="#customizerSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200 font-medium"
          >
            Bespoke Slice Studio Atelier
          </a>
          <a
            href="#ambienceSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200 font-medium"
          >
            Garden Dining &amp; Ambience
          </a>
          <a
            href="#reviewsSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200 font-medium"
          >
            Guest Stories (10,000+ Community)
          </a>
          <a
            href="#reservationSection"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200 font-medium"
          >
            Location &amp; Table Concierge
          </a>
          <div className="pt-3 flex gap-2.5">
            <a
              href="tel:+94711118989"
              className="flex-1 text-center py-2.5 rounded-lg bg-white/10 text-amber-200 font-medium text-xs border border-white/10"
            >
              Call 071 111 8989
            </a>
            <a
              href="https://wa.me/94711118989"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg bg-emerald-600/90 text-white font-medium text-xs"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
