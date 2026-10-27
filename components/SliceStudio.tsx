"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";
import { CustomTopping } from "@/types/menu";

function formatLKR(num: number): string {
  return "LKR " + Number(num).toLocaleString("en-LK");
}

interface SizeOption {
  name: string;
  price: number;
  label: string;
  slices: string;
}

interface CrustOption {
  name: string;
  price: number;
  label: string;
  badge: string;
  isIncluded?: boolean;
}

interface SpiceOption {
  name: string;
  label: string;
  badge: string;
  badgeColorClass: string;
}

interface ToppingOption {
  name: string;
  price: number;
  label: string;
  isFree?: boolean;
}

const SIZES: SizeOption[] = [
  {
    name: 'Regular 8"',
    price: 990,
    label: 'Regular (8")',
    slices: "4 Slices • Solo Treat",
  },
  {
    name: 'Medium 10"',
    price: 1350,
    label: 'Medium (10")',
    slices: "6 Slices • Duo Share",
  },
  {
    name: 'Large 12"',
    price: 1650,
    label: 'Large (12") ⭐',
    slices: "8 Slices • Family Feast",
  },
];

const CRUSTS: CrustOption[] = [
  {
    name: "Hand-Tossed Olive Oil Crust",
    price: 0,
    label: "Hand-Tossed Olive Oil",
    badge: "Included",
    isIncluded: true,
  },
  {
    name: "Crispy Thin Herb Crust",
    price: 100,
    label: "Crispy Garlic Herb Thin",
    badge: "+LKR 100",
  },
  {
    name: "Molten Double Cheese Burst",
    price: 350,
    label: "🧀 Molten Cheese Burst",
    badge: "+LKR 350",
  },
];

const SPICES: SpiceOption[] = [
  {
    name: "Mild Italian Herb",
    label: "🌿 Mild Italian Herb & Garlic",
    badge: "Kid Friendly",
    badgeColorClass: "text-stone-400",
  },
  {
    name: "🌶️ Galle Devilled Kick",
    label: "🌶️ Galle Devilled Sweet-Heat",
    badge: "Signature",
    badgeColorClass: "text-amber-300 font-semibold",
  },
  {
    name: "🔥 Fiery Nai Miris Overload",
    label: "🔥 Fiery Nai Miris & Green Chilli",
    badge: "Extra Hot",
    badgeColorClass: "text-ember-400 font-semibold",
  },
];

const TOPPINGS: ToppingOption[] = [
  {
    name: "Devilled Chicken",
    price: 200,
    label: "🍗 Devilled Chicken",
  },
  {
    name: "Tandoori Chicken",
    price: 200,
    label: "🔥 Tandoori Chicken",
  },
  {
    name: "Ocean Prawns & Cuttlefish",
    price: 320,
    label: "🦐 Prawns & Cuttlefish",
  },
  {
    name: "Chicken Salami & Sausage",
    price: 180,
    label: "🍕 Salami & Sausage",
  },
  {
    name: "Extra Mozzarella Cheese",
    price: 250,
    label: "🧀 Extra Mozzarella",
  },
  {
    name: "Black Olives & Mushroom",
    price: 150,
    label: "🫒 Olives & Mushroom",
  },
  {
    name: "Sweet Pineapple",
    price: 120,
    label: "🍍 Hawaiian Pineapple",
  },
  {
    name: "Fiery Nai Miris & Capsicum",
    price: 100,
    label: "🌶️ Fresh Nai Miris",
  },
  {
    name: "Caramelized Onion & Corn",
    price: 0,
    label: "🧅 Onion & Bell Pepper",
    isFree: true,
  },
];

export default function SliceStudio() {
  const { addToCart } = useCart();
  const previewCardRef = use3DTilt<HTMLDivElement>();

  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[2]); // Large 12"
  const [selectedCrust, setSelectedCrust] = useState<CrustOption>(CRUSTS[0]); // Hand-Tossed
  const [selectedSpice, setSelectedSpice] = useState<SpiceOption>(SPICES[1]); // Galle Devilled Kick
  const [selectedToppings, setSelectedToppings] = useState<CustomTopping[]>([
    { name: "Devilled Chicken", price: 200 },
    { name: "Caramelized Onion & Corn", price: 0 },
  ]);

  const toggleTopping = (topping: ToppingOption) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.name === topping.name);
      if (exists) {
        return prev.filter((t) => t.name !== topping.name);
      } else {
        return [...prev, { name: topping.name, price: topping.price }];
      }
    });
  };

  const isToppingSelected = (toppingName: string) => {
    return selectedToppings.some((t) => t.name === toppingName);
  };

  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const total = selectedSize.price + selectedCrust.price + toppingsTotal;

  const topNames =
    selectedToppings.length > 0
      ? selectedToppings.map((t) => t.name).join(", ")
      : "Classic Cheese Base";

  const handleAddCustomPizza = () => {
    const topList = selectedToppings.map((t) => t.name).join(" + ") || "Cheese";
    const customName = `Custom ${selectedSize.name} Pizza (${selectedCrust.name}, ${topList})`;
    const customId = "custom-" + Date.now();
    addToCart(customId, customName, total);
  };

  return (
    <section
      id="customizerSection"
      className="py-16 sm:py-24 bg-gradient-to-b from-obsidian-900 via-obsidian-800/80 to-obsidian-950 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
            Interactive 3D Slice Studio
          </span>
          <h2 className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white">
            CRAFT YOUR OWN <span className="italic font-normal text-[#f04e23]">HEAVENLY SLICE.</span>
          </h2>
          <p className="gsap-fade-up text-sm text-stone-300 mt-2">
            Choose your artisan crust, Sri Lankan spice intensity, and signature toppings with real-time pricing before sending your custom creation straight to our oven.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start perspective-stage">
          {/* Left: Live Visual 3D Pizza Preview Card */}
          <div
            ref={previewCardRef}
            className="lg:col-span-5 depth-card-3d card-cinematic rounded-3xl p-6 sticky top-24"
          >
            <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
            <div className="depth-layer-img relative rounded-2xl overflow-hidden h-64 mb-5 border border-white/10">
              <img
                id="studioPreviewImg"
                src="/assets/heavenly-mix-pizza.jpg"
                alt="Custom Pizza Preview"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span
                  id="studioSizeBadge"
                  className="px-3 py-1 rounded-full bg-obsidian-950/90 border border-white/15 text-xs font-semibold text-amber-300"
                >
                  {selectedSize.name}
                </span>
                <span
                  id="studioSpiceBadge"
                  className="px-3 py-1 rounded-full bg-ember-500/90 text-xs font-semibold text-white"
                >
                  {selectedSpice.name}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="text-[11px] text-stone-300 block">Custom Oven Creation</span>
                  <h3 id="studioSummaryTitle" className="text-lg font-bold text-white">
                    Chef&apos;s Custom Heavenly Pizza
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">Total Price</span>
                  <span id="studioTotalPrice" className="text-2xl font-extrabold text-gold-400">
                    {formatLKR(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="depth-layer-mid space-y-3 text-xs text-stone-300 mb-6 bg-obsidian-950/60 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between">
                <span className="text-stone-400">Crust &amp; Size:</span>
                <span id="studioSummaryCrust" className="font-medium text-white">
                  {selectedSize.name} • {selectedCrust.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Base Sauce &amp; Spice:</span>
                <span id="studioSummarySauce" className="font-medium text-amber-200">
                  Rich Herb Marinara • {selectedSpice.name}
                </span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-stone-400 shrink-0">Selected Toppings:</span>
                <span id="studioSummaryToppings" className="font-medium text-right text-emerald-300">
                  {topNames}
                </span>
              </div>
            </div>

            <button
              id="addCustomPizzaBtn"
              type="button"
              onClick={handleAddCustomPizza}
              className="depth-layer-front w-full py-4 rounded-2xl bg-gradient-to-r from-ember-500 to-amber-600 hover:from-ember-600 hover:to-amber-500 text-white font-bold text-sm shadow-xl ember-glow transition flex items-center justify-center gap-2"
            >
              <span>🍕 Add Custom Pizza to Order</span>
            </button>
          </div>

          {/* Right: Step-by-Step Builder Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Size */}
            <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
                1. Select Pizza Size
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SIZES.map((size) => {
                  const isSelected = selectedSize.name === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      data-size={size.name}
                      data-size-price={size.price}
                      onClick={() => setSelectedSize(size)}
                      className={`studio-size-btn p-4 rounded-2xl text-left transition ${
                        isSelected
                          ? "border-2 border-ember-500 bg-ember-500/15"
                          : "border border-white/10 bg-obsidian-900/80 hover:border-ember-500"
                      }`}
                    >
                      <div className="font-bold text-white text-sm">{size.label}</div>
                      <div className={`text-xs mt-0.5 ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                        {size.slices}
                      </div>
                      <div className="text-gold-400 font-bold text-xs mt-2">
                        Base LKR {size.price.toLocaleString("en-LK")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Artisanal Crust & Spice Level */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
                  2. Artisanal Crust
                </h3>
                <div className="space-y-2.5">
                  {CRUSTS.map((crust) => {
                    const isSelected = selectedCrust.name === crust.name;
                    return (
                      <button
                        key={crust.name}
                        type="button"
                        data-crust={crust.name}
                        data-crust-price={crust.price}
                        onClick={() => setSelectedCrust(crust)}
                        className={`studio-crust-btn w-full p-3 rounded-xl flex justify-between items-center text-xs sm:text-sm transition ${
                          isSelected
                            ? "border-2 border-ember-500 bg-ember-500/15"
                            : "border border-white/10 bg-obsidian-900/80"
                        }`}
                      >
                        <span className={`font-medium ${isSelected ? "text-white" : "text-stone-200"}`}>
                          {crust.label}
                        </span>
                        <span
                          className={`font-semibold ${
                            crust.isIncluded ? "text-emerald-300" : "text-gold-400"
                          }`}
                        >
                          {crust.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
                  3. Sri Lankan Spice Profile
                </h3>
                <div className="space-y-2.5">
                  {SPICES.map((spice) => {
                    const isSelected = selectedSpice.name === spice.name;
                    return (
                      <button
                        key={spice.name}
                        type="button"
                        data-spice={spice.name}
                        onClick={() => setSelectedSpice(spice)}
                        className={`studio-spice-btn w-full p-3 rounded-xl flex justify-between items-center text-xs sm:text-sm transition ${
                          isSelected
                            ? "border-2 border-ember-500 bg-ember-500/15"
                            : "border border-white/10 bg-obsidian-900/80"
                        }`}
                      >
                        <span className={`font-medium ${isSelected ? "text-white" : "text-stone-200"}`}>
                          {spice.label}
                        </span>
                        <span className={spice.badgeColorClass}>{spice.badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Toppings Selection */}
            <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  4. Load Your Toppings
                </h3>
                <span className="text-xs text-stone-400">Click to toggle toppings</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TOPPINGS.map((topping) => {
                  const isSelected = isToppingSelected(topping.name);
                  return (
                    <button
                      key={topping.name}
                      type="button"
                      data-topping={topping.name}
                      data-top-price={topping.price}
                      onClick={() => toggleTopping(topping)}
                      className={`studio-top-btn p-3 rounded-xl text-left text-xs transition ${
                        isSelected
                          ? "active border-2 border-ember-500 bg-ember-500/15"
                          : "border border-white/10 bg-obsidian-900/80"
                      }`}
                    >
                      <div className={`font-semibold ${isSelected ? "text-white" : "text-stone-200"}`}>
                        {topping.label}
                      </div>
                      <div className={`mt-0.5 ${topping.isFree ? "text-emerald-300" : "text-gold-400"}`}>
                        {topping.isFree ? "Free Base" : `+LKR ${topping.price}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
