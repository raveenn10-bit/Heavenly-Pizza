"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";

export default function SignatureShowcase() {
  const { addToCart } = useCart();

  const cardRef1 = use3DTilt<HTMLDivElement>();
  const cardRef2 = use3DTilt<HTMLDivElement>();
  const cardRef3 = use3DTilt<HTMLDivElement>();
  const cardRef4 = use3DTilt<HTMLDivElement>();

  return (
    <section
      id="signatureShowcaseSection"
      className="py-20 sm:py-28 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-ember-400 block mb-2">
              Handcrafted in Galle • Signature Favorites
            </span>
            <h2 className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              CRAFTED FOR <span className="italic font-normal text-[#f04e23]">CRAVINGS.</span>
            </h2>
            <p className="gsap-fade-up text-stone-300 text-sm sm:text-base max-w-xl mt-3">
              From wood-fired coastal seafood pizzas and fiery Southern Nai Miris specials to bubbling oven-baked chicken lasagna.
            </p>
          </div>
          <a
            href="#menuSection"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-amber-300 hover:text-white transition"
          >
            <span>View Full 27-Item Menu</span>
            <span>→</span>
          </a>
        </div>

        {/* 3D Depth Multi-Plane Cards Grid */}
        <div id="depthCardsStage" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-stage">
          {/* 3D Depth Card 1: Heavenly Mix Supreme */}
          <div
            ref={cardRef1}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 cursor-pointer"
            data-depth-speed="-1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            {/* Z-Layer -25px: Ambient Glow Halo */}
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-ember-500/20 via-transparent to-amber-500/15 rounded-3xl blur-xl pointer-events-none" />

            {/* Z-Layer 38px: Floating Top Badges */}
            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-4">
              <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 border border-ember-500/50 text-amber-300 text-xs font-bold shadow-lg">
                👑 #1 Crown Jewel Bestseller
              </span>
              <span className="px-3 py-1 rounded-full bg-ember-500 text-white text-xs font-extrabold shadow-lg">
                LKR 2,100
              </span>
            </div>

            {/* Z-Layer 0px: Main High-Contrast Dish Image */}
            <div className="depth-layer-img relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 mb-5">
              <img
                src="/assets/heavenly-mix-pizza.jpg"
                alt="Heavenly Mix 3D Pizza"
                className="gsap-parallax-img w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            {/* Z-Layer 38px: Floating Ingredient Pills */}
            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-amber-200">
                🦐 Ocean Prawns &amp; Cuttlefish
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-emerald-300">
                🧀 100% Molten Mozzarella
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-ember-400">
                🍗 Spicy Roast Chicken
              </span>
            </div>

            {/* Z-Layer 72px: Foreground Typography & Action */}
            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Heavenly Mix Supreme</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  Seven coastal &amp; wood-fired toppings layered over hand-tossed olive oil crust.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="heavenly-mix"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("heavenly-mix", "Heavenly Mix Pizza", 2100);
                }}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition"
              >
                + Order Slice
              </button>
            </div>
          </div>

          {/* 3D Depth Card 2: Devilled & Nai Miris Supreme */}
          <div
            ref={cardRef2}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 cursor-pointer"
            data-depth-speed="1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-amber-500/20 via-transparent to-ember-500/20 rounded-3xl blur-xl pointer-events-none" />

            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-4">
              <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 border border-amber-500/50 text-ember-400 text-xs font-bold shadow-lg">
                🌶️ Southern Sri Lankan Fire
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-obsidian-950 text-xs font-extrabold shadow-lg">
                LKR 1,750
              </span>
            </div>

            <div className="depth-layer-img relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 mb-5">
              <img
                src="/assets/devilled-pizza.jpg"
                alt="Devilled Chicken & Nai Miris Pizza"
                className="gsap-parallax-img w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-ember-400">
                🔥 Authentic Nai Miris
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-amber-200">
                🍗 Sweet-Chili Devilled Glaze
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-stone-200">
                🧅 Crisp Capsicum &amp; Onion
              </span>
            </div>

            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Devilled &amp; Nai Miris Supreme</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  Galle's signature sweet-heat devilled chicken fused with aromatic scotch bonnet chilli.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="devilled-supreme"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("devilled-supreme", "Devilled Chicken Supreme Pizza", 1750);
                }}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition"
              >
                + Order Slice
              </button>
            </div>
          </div>

          {/* 3D Depth Card 3: Oven-Baked Lasagna & Carbonara */}
          <div
            ref={cardRef3}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 cursor-pointer"
            data-depth-speed="-1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-gold-500/15 via-transparent to-ember-500/15 rounded-3xl blur-xl pointer-events-none" />

            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-4">
              <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 border border-gold-400/50 text-gold-300 text-xs font-bold shadow-lg">
                🧀 "Every Layer Tells a Story"
              </span>
              <span className="px-3 py-1 rounded-full bg-ember-500 text-white text-xs font-extrabold shadow-lg">
                LKR 1,450
              </span>
            </div>

            <div className="depth-layer-img relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 mb-5">
              <img
                src="/assets/baked-lasagna.jpg"
                alt="Heavenly Baked Chicken Lasagna"
                className="gsap-parallax-img w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-amber-200">
                🍝 Rich Chicken Ragù
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-gold-300">
                🥛 Velvety Béchamel
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-emerald-300">
                🌿 Fresh Italian Herbs
              </span>
            </div>

            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Baked Chicken Lasagna</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  Golden bubbling mozzarella crust over velvety béchamel and spiced chicken ragù.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="heavenly-lasagna"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("heavenly-lasagna", "Heavenly Baked Chicken Lasagna", 1450);
                }}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition"
              >
                + Order Dish
              </button>
            </div>
          </div>

          {/* 3D Depth Card 4: Crispy Chicken Burgers & Brown Sugar Boba */}
          <div
            ref={cardRef4}
            className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 cursor-pointer"
            data-depth-speed="1"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-bg absolute -inset-2 bg-gradient-to-br from-emerald-500/15 via-transparent to-amber-500/20 rounded-3xl blur-xl pointer-events-none" />

            <div className="depth-layer-mid relative z-20 flex items-center justify-between mb-4">
              <span className="px-3.5 py-1.5 rounded-full bg-obsidian-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-bold shadow-lg">
                🍔 Crunchy &amp; Refreshing Pair
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-obsidian-950 text-xs font-extrabold shadow-lg">
                LKR 680 – 750
              </span>
            </div>

            <div className="depth-layer-img relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 mb-5">
              <img
                src="/assets/crispy-chicken-burger.jpg"
                alt="Golden Crispy Chicken Burger and Fries"
                className="gsap-parallax-img w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            <div className="depth-layer-mid relative z-20 flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-amber-200">
                🍔 Crispy Chicken Fillet
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-purple-300">
                🧋 Brown Sugar Boba Tea
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-950/90 border border-white/15 text-[11px] text-emerald-300">
                🍟 Seasoned Peri-Peri Fries
              </span>
            </div>

            <div className="depth-layer-front relative z-20 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Crispy Burgers &amp; Boba</h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  Ultra-crunchy golden chicken burgers paired with chilled brown sugar pearl milk tea.
                </p>
              </div>
              <button
                type="button"
                data-depth-add="crispy-chicken-burger"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart("crispy-chicken-burger", "Golden Crispy Chicken Burger", 680);
                }}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition"
              >
                + Order Burger
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
