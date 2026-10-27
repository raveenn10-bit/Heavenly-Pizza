import React from "react";

export default function BrandPillars() {
  return (
    <section className="border-y border-white/10 bg-obsidian-900/70 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-ember-500/15 border border-ember-500/30 flex items-center justify-center text-xl shrink-0">
              🔥
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Handcrafted Crust</h3>
              <p className="text-xs text-stone-400">Fresh dough &amp; olive oil baked golden</p>
            </div>
          </div>
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
              🌶️
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Authentic Galle Flavours</h3>
              <p className="text-xs text-stone-400">Devilled chicken, Nai Miris &amp; seafood</p>
            </div>
          </div>
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xl shrink-0">
              🌿
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Peaceful Garden Seating</h3>
              <p className="text-xs text-stone-400">Cozy indoor &amp; outdoor family vibe</p>
            </div>
          </div>
          <div className="gsap-fade-up flex flex-col sm:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl shrink-0">
              🛵
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Fast Galle Delivery</h3>
              <p className="text-xs text-stone-400">Direct WhatsApp, Uber Eats &amp; PickMe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
