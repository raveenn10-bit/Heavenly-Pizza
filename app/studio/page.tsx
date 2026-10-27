"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";

// --- Types & Option Contracts ---

export interface SizeOption {
  id: string;
  name: string;
  diameter: string;
  price: number;
  slices: string;
  serves: string;
  recommended?: boolean;
}

export interface CrustOption {
  id: string;
  name: string;
  price: number;
  description: string;
  badge: string;
  isIncluded?: boolean;
}

export interface SpiceOption {
  id: string;
  name: string;
  level: number;
  subtitle: string;
  badge: string;
  badgeColor: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  category: "meat-seafood" | "cheese-veggies";
  isFree?: boolean;
}

// --- Data Constants ---

const SIZES: SizeOption[] = [
  {
    id: "size-regular",
    name: 'Regular 8"',
    diameter: '8"',
    price: 990,
    slices: "4 Slices",
    serves: "Individual Atelier Portion",
  },
  {
    id: "size-medium",
    name: 'Medium 10"',
    diameter: '10"',
    price: 1350,
    slices: "6 Slices",
    serves: "Perfect for 2 Sharing",
  },
  {
    id: "size-large",
    name: 'Large 12"',
    diameter: '12"',
    price: 1650,
    slices: "8 Slices",
    serves: "Family Feast · Recommended",
    recommended: true,
  },
];

const CRUSTS: CrustOption[] = [
  {
    id: "crust-hand-tossed",
    name: "Hand-Tossed Olive Oil",
    price: 0,
    description: "48-hour slow fermented dough brushed with Sicilian cold-pressed virgin olive oil.",
    badge: "Included",
    isIncluded: true,
  },
  {
    id: "crust-garlic-herb",
    name: "Crispy Garlic Herb",
    price: 100,
    description: "Thin golden blistered crust infused with roasted garlic butter and fresh oregano.",
    badge: "+LKR 100",
  },
  {
    id: "crust-cheese-burst",
    name: "Molten Cheese Burst",
    price: 350,
    description: "Decadent rim stuffed with molten mozzarella, cream cheese, and smoked gouda.",
    badge: "+LKR 350",
  },
];

const SPICES: SpiceOption[] = [
  {
    id: "spice-mild",
    name: "Mild Italian",
    level: 1,
    subtitle: "Sweet San Marzano tomatoes, crushed garlic & sweet basil.",
    badge: "Mild",
    badgeColor: "text-stone-300 bg-white/5 border-white/10",
  },
  {
    id: "spice-devilled",
    name: "Galle Devilled Sweet-Heat",
    level: 2,
    subtitle: "Southern caramelized shallots, chili paste & tangy tamarind glaze.",
    badge: "Chef's Signature",
    badgeColor: "text-amber-300 bg-amber-500/15 border-amber-500/30",
  },
  {
    id: "spice-naimiris",
    name: "Fiery Nai Miris",
    level: 3,
    subtitle: "Authentic Galle scotch bonnet kick with roasted black pepper crush.",
    badge: "Extra Hot",
    badgeColor: "text-ember-400 bg-ember-500/15 border-ember-500/30",
  },
];

const TOPPINGS: ToppingOption[] = [
  {
    id: "top-devilled-chicken",
    name: "Devilled Chicken",
    price: 200,
    category: "meat-seafood",
  },
  {
    id: "top-tandoori-chicken",
    name: "Tandoori Chicken",
    price: 200,
    category: "meat-seafood",
  },
  {
    id: "top-ocean-prawns",
    name: "Ocean Prawns & Cuttlefish",
    price: 320,
    category: "meat-seafood",
  },
  {
    id: "top-salami-sausage",
    name: "Salami & Sausage",
    price: 180,
    category: "meat-seafood",
  },
  {
    id: "top-extra-mozzarella",
    name: "Extra Mozzarella",
    price: 250,
    category: "cheese-veggies",
  },
  {
    id: "top-olives-mushroom",
    name: "Olives & Mushroom",
    price: 150,
    category: "cheese-veggies",
  },
  {
    id: "top-pineapple",
    name: "Pineapple",
    price: 120,
    category: "cheese-veggies",
  },
  {
    id: "top-fresh-naimiris",
    name: "Fresh Nai Miris",
    price: 100,
    category: "cheese-veggies",
  },
  {
    id: "top-onion-bellpepper",
    name: "Onion & Bell Pepper",
    price: 0,
    category: "cheese-veggies",
    isFree: true,
  },
];

function formatLKR(amount: number): string {
  return "LKR " + Number(amount).toLocaleString("en-LK");
}

export default function SliceStudioPage() {
  const { addToCart, showToast } = useCart();
  const previewCardRef = use3DTilt<HTMLDivElement>();

  // State Management
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[2]); // Default Large 12"
  const [selectedCrust, setSelectedCrust] = useState<CrustOption>(CRUSTS[0]);
  const [selectedSpice, setSelectedSpice] = useState<SpiceOption>(SPICES[1]);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([
    TOPPINGS[0], // Devilled Chicken
    TOPPINGS[8], // Onion & Bell Pepper
  ]);

  // Pricing calculations
  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const total = selectedSize.price + selectedCrust.price + toppingsTotal;

  // Toggle Topping selection
  const toggleTopping = (topping: ToppingOption) => {
    const isSelected = selectedToppings.some((t) => t.id === topping.id);
    if (isSelected) {
      setSelectedToppings((prev) => prev.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings((prev) => [...prev, topping]);
    }
  };

  // Recipe display string
  const customPizzaName = `Custom ${selectedSize.name} Pizza (${selectedCrust.name}, ${selectedSpice.name}${
    selectedToppings.length > 0 ? `, ${selectedToppings.map((t) => t.name).join(" + ")}` : ""
  })`;

  // Add Custom Pizza to Cart Tray
  const handleAddToCart = () => {
    const customId = "custom-" + Date.now();
    addToCart(customId, customPizzaName, total);
  };

  // WhatsApp Pre-filled Message Generator
  const waMessage = encodeURIComponent(
    `*HEAVENLY PIZZA · BESPOKE STUDIO ORDER*\n` +
      `----------------------------------------\n` +
      `*Item:* ${customPizzaName}\n` +
      `*Size:* ${selectedSize.name} (${formatLKR(selectedSize.price)})\n` +
      `*Crust:* ${selectedCrust.name} (${selectedCrust.price === 0 ? "Included" : `+${formatLKR(selectedCrust.price)}`})\n` +
      `*Heat Profile:* ${selectedSpice.name}\n` +
      `*Toppings:* ${selectedToppings.length > 0 ? selectedToppings.map((t) => t.name).join(", ") : "Classic Mozzarella Base"}\n` +
      `----------------------------------------\n` +
      `*Total Price:* ${formatLKR(total)}\n` +
      `*Location:* Galle Flagship Atelier\n\n` +
      `Please confirm estimated baking time!`
  );

  return (
    <div className="min-h-screen bg-[#070606] text-[#f5f2eb] animate-page-enter pt-6 pb-24 selection:bg-ember-500 selection:text-white">
      {/* Background Ambience Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-ember-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-2/3 -right-48 w-96 h-96 bg-gold-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-stone-400">
          <Link href="/" className="hover:text-amber-300 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/menu" className="hover:text-amber-300 transition">
            Menu
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-medium">Slice Studio</span>
        </nav>

        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="eyebrow-luxury">BESPOKE CULINARY ATELIER · GALLE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
            CRAFT YOUR{" "}
            <span className="font-serif italic font-normal text-gradient-gold">
              HEAVENLY SLICE
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
            Select your artisanal dough, oven heat profile, signature Sri Lankan spices, and
            premium toppings. Built fresh to order in our Galle oven.
          </p>
        </header>

        {/* Interactive Pizza Studio Workspace (Two-column layout on desktop) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start perspective-stage">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Sticky Preview & Recipe Card                     */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              ref={previewCardRef}
              className="depth-card-3d card-cinematic rounded-3xl p-6 sm:p-7 relative border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Dynamic Specular Glare Overlay */}
              <div className="depth-glare absolute inset-0 rounded-3xl z-20 pointer-events-none" />

              {/* Pizza Visual Preview with Dynamic Layer Badges */}
              <div className="depth-layer-img relative rounded-2xl overflow-hidden h-64 sm:h-72 mb-6 border border-white/10 group">
                <img
                  src="/assets/heavenly-mix-pizza.jpg"
                  alt="Custom Pizza Atelier Preview"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-black/20" />

                {/* Active Layer Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap gap-2 items-center justify-between pointer-events-none">
                  <div className="flex flex-wrap gap-1.5">
                    {/* Size Badge */}
                    <span className="px-3 py-1 rounded-full bg-obsidian-950/90 border border-amber-500/40 text-[11px] font-bold text-amber-300 backdrop-blur-md shadow-sm">
                      {selectedSize.name}
                    </span>
                    {/* Spice Profile Badge */}
                    <span
                      className={`px-3 py-1 rounded-full border text-[11px] font-bold backdrop-blur-md shadow-sm ${selectedSpice.badgeColor}`}
                    >
                      {selectedSpice.name}
                    </span>
                  </div>

                  {/* Crust Type Badge */}
                  <span className="px-3 py-1 rounded-full bg-obsidian-900/90 border border-white/15 text-[11px] font-semibold text-stone-200 backdrop-blur-md">
                    {selectedCrust.name}
                  </span>
                </div>

                {/* Overlay Footer on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-0.5">
                      Live Atelier Preview
                    </span>
                    <h2 className="text-base sm:text-lg font-serif font-bold text-white drop-shadow-md">
                      Chef&apos;s Bespoke Pizza
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                      Total LKR
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-gold-400 transition-all duration-300">
                      {formatLKR(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recipe Specifications Breakdown */}
              <div className="depth-layer-mid space-y-3 bg-obsidian-950/80 p-4 sm:p-5 rounded-2xl border border-white/5 mb-6 text-xs text-stone-300">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                  <span className="text-stone-400">Selected Dough &amp; Size</span>
                  <span className="font-semibold text-white text-right">
                    {selectedSize.name} &bull; {selectedCrust.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                  <span className="text-stone-400">Heat Profile</span>
                  <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <span>{selectedSpice.name}</span>
                    <span className="text-[10px] text-stone-400">({selectedSpice.badge})</span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-stone-400">Selected Toppings</span>
                    <span className="text-stone-400 text-[11px]">
                      {selectedToppings.length} {selectedToppings.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {selectedToppings.length === 0 ? (
                    <span className="text-stone-400 italic block py-1">
                      No additional toppings selected (Classic Mozzarella base only).
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedToppings.map((top) => (
                        <span
                          key={top.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-200 text-[11px]"
                        >
                          <span>{top.name}</span>
                          <span
                            className={
                              top.isFree ? "text-emerald-400 font-semibold" : "text-amber-300/80 font-mono"
                            }
                          >
                            {top.isFree ? "Free" : `+${top.price}`}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Primary Action Button: Add to Cart */}
              <div className="depth-layer-front space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ember-500 via-ember-600 to-amber-600 hover:from-ember-600 hover:to-amber-500 text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:shadow-ember-500/25 transition-all duration-300 btn-magnetic flex items-center justify-center gap-2.5 group"
                >
                  <svg
                    className="w-4 h-4 text-amber-200 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add Custom Pizza to Order Tray</span>
                  <span className="text-amber-200 font-mono font-semibold ml-1">
                    ({formatLKR(total)})
                  </span>
                </button>

                {/* Direct WhatsApp Order Shortcut */}
                <a
                  href={`https://wa.me/94711118989?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#4ADE80] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 hover:border-[#25D366]/70"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.981-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Interactive Step-by-Step Customizer Controls   */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* ------------------------------------------------------------ */}
            {/* Step 1: Select Pizza Size                                    */}
            {/* ------------------------------------------------------------ */}
            <section className="card-cinematic rounded-3xl p-6 sm:p-7 border border-white/10 relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/40 text-ember-400 font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      Select Pizza Size
                    </h2>
                    <p className="text-xs text-stone-400">Choose diameter and serving portion</p>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Base Price
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {SIZES.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`relative p-4 sm:p-5 rounded-2xl text-left figma-interactive-card transition-all duration-300 ${
                        isSelected
                          ? "border-2 border-ember-500 bg-ember-500/15 shadow-lg shadow-ember-500/10 ring-1 ring-ember-500/50"
                          : "border border-white/10 bg-obsidian-900/80 hover:border-white/20 hover:bg-obsidian-800/60"
                      }`}
                    >
                      {size.recommended && (
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-obsidian-950 text-[10px] font-extrabold uppercase tracking-wider">
                          Popular
                        </span>
                      )}

                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-white text-base">{size.name}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-ember-500 bg-ember-500"
                              : "border-stone-500 bg-transparent"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="text-xs font-medium text-stone-300 mb-1">{size.slices}</div>
                      <div className="text-[11px] text-stone-400 mb-3">{size.serves}</div>

                      <div className="text-gold-400 font-bold text-sm sm:text-base">
                        {formatLKR(size.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Step 2: Artisanal Crust Selection                            */}
            {/* ------------------------------------------------------------ */}
            <section className="card-cinematic rounded-3xl p-6 sm:p-7 border border-white/10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/40 text-ember-400 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      Artisanal Crust Selection
                    </h2>
                    <p className="text-xs text-stone-400">Slow-fermented dough handcrafted daily</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {CRUSTS.map((crust) => {
                  const isSelected = selectedCrust.id === crust.id;
                  return (
                    <button
                      key={crust.id}
                      type="button"
                      onClick={() => setSelectedCrust(crust)}
                      className={`w-full p-4 rounded-2xl flex items-start justify-between gap-4 text-left figma-interactive-card transition-all duration-300 ${
                        isSelected
                          ? "border-2 border-ember-500 bg-ember-500/15 shadow-md shadow-ember-500/10 ring-1 ring-ember-500/40"
                          : "border border-white/10 bg-obsidian-900/80 hover:border-white/20 hover:bg-obsidian-800/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "border-ember-500 bg-ember-500"
                              : "border-stone-500 bg-transparent"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">{crust.name}</div>
                          <div className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                            {crust.description}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                          crust.isIncluded
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-gold-500/15 text-gold-400 border border-gold-500/30"
                        }`}
                      >
                        {crust.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Step 3: Heat & Spice Profile                                 */}
            {/* ------------------------------------------------------------ */}
            <section className="card-cinematic rounded-3xl p-6 sm:p-7 border border-white/10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/40 text-ember-400 font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      Heat &amp; Spice Profile
                    </h2>
                    <p className="text-xs text-stone-400">Custom chili calibration for the wood-fire</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {SPICES.map((spice) => {
                  const isSelected = selectedSpice.id === spice.id;
                  return (
                    <button
                      key={spice.id}
                      type="button"
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-4 sm:p-5 rounded-2xl text-left figma-interactive-card transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "border-2 border-ember-500 bg-ember-500/15 shadow-md shadow-ember-500/10 ring-1 ring-ember-500/40"
                          : "border border-white/10 bg-obsidian-900/80 hover:border-white/20 hover:bg-obsidian-800/60"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${spice.badgeColor}`}>
                            {spice.badge}
                          </span>
                          <div className="flex items-center gap-0.5" title={`Heat level: ${spice.level}/3`}>
                            {Array.from({ length: 3 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < spice.level ? "text-ember-500" : "text-stone-700"
                                }`}
                              >
                                &#128293;
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="font-bold text-white text-sm mb-1.5">{spice.name}</div>
                        <div className="text-xs text-stone-400 leading-relaxed">
                          {spice.subtitle}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-300">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-ember-500 bg-ember-500"
                              : "border-stone-500 bg-transparent"
                          }`}
                        >
                          {isSelected && <div className="w-1 rounded-full bg-white" />}
                        </div>
                        <span>{isSelected ? "Active Profile" : "Select"}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Step 4: Premium Toppings                                     */}
            {/* ------------------------------------------------------------ */}
            <section className="card-cinematic rounded-3xl p-6 sm:p-7 border border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-ember-500/20 border border-ember-500/40 text-ember-400 font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      Premium Toppings
                    </h2>
                    <p className="text-xs text-stone-400">
                      Tap any ingredient to add or remove ({selectedToppings.length} selected)
                    </p>
                  </div>
                </div>

                {selectedToppings.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedToppings([])}
                    className="text-xs text-stone-400 hover:text-ember-400 transition underline underline-offset-4"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Toppings Grid with spring transitions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping)}
                      className={`p-3.5 rounded-2xl text-left figma-interactive-card transition-all duration-300 flex items-center justify-between gap-3 ${
                        isSelected
                          ? "border-2 border-ember-500 bg-ember-500/15 shadow-md shadow-ember-500/10 ring-1 ring-ember-500/30"
                          : "border border-white/10 bg-obsidian-900/80 hover:border-white/20 hover:bg-obsidian-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Custom Checkbox indicator */}
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "border-ember-500 bg-ember-500 text-white"
                              : "border-stone-600 bg-white/5"
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-white truncate">
                          {topping.name}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold shrink-0 font-mono ${
                          topping.isFree ? "text-emerald-300" : "text-gold-400"
                        }`}
                      >
                        {topping.isFree ? "Free" : `+${formatLKR(topping.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ------------------------------------------------------------ */}
            {/* Bottom Chef Tip Box                                          */}
            {/* ------------------------------------------------------------ */}
            <div className="card-cinematic rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-amber-500/30 bg-gradient-to-r from-obsidian-900 via-amber-950/20 to-obsidian-900 flex items-start gap-4 shadow-lg gold-glow">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-300 text-lg">
                &#10024;
              </div>
              <div className="space-y-1">
                <span className="eyebrow-luxury text-amber-400 block">Chef&apos;s Secret</span>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif italic">
                  &ldquo;Pair your custom crust with our signature Galle Devilled Sweet-Heat spice profile for an authentic southern kick.&rdquo;
                </p>
                <span className="text-[11px] text-stone-400 block pt-1">
                  — Head Pizzaiolo &middot; Heavenly Pizza Galle
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
