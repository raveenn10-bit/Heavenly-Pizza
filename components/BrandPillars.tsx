import React from "react";
import Link from "next/link";

export default function BrandPillars() {
  return (
    <section className="border-y border-white/10 bg-obsidian-900/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
          {/* Pillar 1: Wood-fired Crust */}
          <Link
            href="/studio"
            className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-ember-500/30 figma-interactive-card flex flex-col sm:flex-row items-center sm:items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-ember-500/10 border border-ember-500/25 flex items-center justify-center text-ember-400 shrink-0 group-hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 012.344 5.657c0 2.12-.838 4.161-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <h3 className="text-sm font-semibold text-white group-hover:text-ember-400 transition">Artisanal Crust</h3>
                <span className="text-xs text-stone-500 group-hover:text-ember-400 transition">↗</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Slow-fermented dough &amp; extra virgin olive oil</p>
            </div>
          </Link>

          {/* Pillar 2: Authentic Flavors */}
          <Link
            href="/menu"
            className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-amber-500/30 figma-interactive-card flex flex-col sm:flex-row items-center sm:items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">Galle Flavours</h3>
                <span className="text-xs text-stone-500 group-hover:text-amber-300 transition">↗</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Devilled glaze, Nai Miris &amp; coastal seafood</p>
            </div>
          </Link>

          {/* Pillar 3: Garden Seating */}
          <Link
            href="/ambience"
            className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-emerald-500/30 figma-interactive-card flex flex-col sm:flex-row items-center sm:items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition">Garden Atmosphere</h3>
                <span className="text-xs text-stone-500 group-hover:text-emerald-400 transition">↗</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Starlit patio &amp; private dining lounge</p>
            </div>
          </Link>

          {/* Pillar 4: Delivery */}
          <Link
            href="/reservations"
            className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-sky-500/30 figma-interactive-card flex flex-col sm:flex-row items-center sm:items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <h3 className="text-sm font-semibold text-white group-hover:text-sky-300 transition">Fast Galle Delivery</h3>
                <span className="text-xs text-stone-500 group-hover:text-sky-300 transition">↗</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Direct WhatsApp, Uber Eats &amp; PickMe</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
