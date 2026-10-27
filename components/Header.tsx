"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "The Menu", href: "/menu" },
    { label: "Slice Studio", href: "/studio" },
    { label: "Our Vibe", href: "/ambience" },
    { label: "Reservations", href: "/reservations" },
  ];

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

      {/* Sticky Dark Header with Figma Blur & Precision */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Editorial Title */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink min-w-0">
            <div className="relative w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-ember-500/60 shadow-md group-hover:scale-105 transition duration-300 shrink-0 bg-[#e03e1a]">
              <img
                src="/assets/heavenly-logo.jpg"
                alt="Heavenly Pizza Official Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight shrink min-w-0 pr-1">
              <span className="block font-serif font-extrabold text-sm sm:text-lg md:text-xl tracking-normal sm:tracking-wider text-white whitespace-nowrap">
                HEAVENLY
              </span>
              <p id="brandSubTagline" className="text-[10px] sm:text-xs text-stone-300 font-serif italic mt-0.5 whitespace-nowrap">
                pizza · galle
              </p>
            </div>
          </Link>

          {/* Desktop Navigation with Figma Active Pill States */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "nav-pill-active"
                      : "text-stone-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Cart + Order CTA + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="openCartBtn"
              type="button"
              onClick={openCart}
              aria-label="View Order Tray"
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-semibold btn-magnetic"
            >
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline text-stone-200">Order Tray</span>
              <span
                id="cartCountBadge"
                className="px-1.5 sm:px-2 py-0.5 rounded-full bg-ember-500 text-white text-[11px] sm:text-xs font-bold min-w-5 text-center"
              >
                {cartCount}
              </span>
            </button>

            <Link
              href="/menu"
              id="headerLetsEatBtn"
              className="hidden md:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#e84a27] hover:bg-[#d43815] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md btn-magnetic"
            >
              <span>Explore Menu</span>
              <span>↗</span>
            </Link>

            <button
              id="mobileMenuBtn"
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white"
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
            mobileMenuOpen ? "block animate-page-enter" : "hidden"
          } lg:hidden bg-obsidian-900/98 border-b border-white/10 px-5 pt-4 pb-6 space-y-2 text-sm`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link block py-2.5 px-3.5 rounded-xl font-medium transition ${
                  isActive
                    ? "bg-ember-500/20 text-white border border-ember-500/40"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
