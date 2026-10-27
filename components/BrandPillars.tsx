import React from "react";

export default function BrandPillars() {
  return (
    <section className="border-y border-white/10 bg-obsidian-900/60 py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          {/* Pillar 1: Wood-fired Crust */}
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-ember-500/10 border border-ember-500/25 flex items-center justify-center text-ember-400 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 012.344 5.657c0 2.12-.838 4.161-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Artisanal Crust</h3>
              <p className="text-xs text-stone-400 mt-0.5">Slow-fermented dough &amp; extra virgin olive oil</p>
            </div>
          </div>

          {/* Pillar 2: Authentic Flavors */}
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Galle Flavours</h3>
              <p className="text-xs text-stone-400 mt-0.5">Devilled glaze, Nai Miris &amp; coastal seafood</p>
            </div>
          </div>

          {/* Pillar 3: Garden Seating */}
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Garden Atmosphere</h3>
              <p className="text-xs text-stone-400 mt-0.5">Starlit patio &amp; private dining lounge</p>
            </div>
          </div>

          {/* Pillar 4: Delivery */}
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Fast Galle Delivery</h3>
              <p className="text-xs text-stone-400 mt-0.5">Direct WhatsApp, Uber Eats &amp; PickMe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
