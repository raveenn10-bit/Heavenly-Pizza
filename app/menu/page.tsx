"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { MENU_ITEMS, formatLKR } from "@/data/menuData";
import { MenuItem, MenuCategory } from "@/types/menu";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";

type DietaryFilterOption = "all" | "popular" | "spicy" | "seafood" | "under-1250";

interface CategoryTab {
  key: MenuCategory;
  label: string;
}

const CATEGORIES: CategoryTab[] = [
  { key: "all", label: "All" },
  { key: "premium-supreme", label: "Premium Supreme" },
  { key: "deluxe-classic", label: "Deluxe Classics" },
  { key: "pasta-lasagna", label: "Pasta & Lasagna" },
  { key: "burgers-chicken", label: "Burgers & Chicken" },
  { key: "fried-rice", label: "Fried Rice" },
  { key: "bites-drinks", label: "Bites & Boba Drinks" },
];

const DIETARY_OPTIONS: { value: DietaryFilterOption; label: string }[] = [
  { value: "all", label: "All Specialties" },
  { value: "popular", label: "Customer Favorites" },
  { value: "spicy", label: "Spicy / Nai Miris" },
  { value: "seafood", label: "Coastal Seafood" },
  { value: "under-1250", label: "Under LKR 1,250" },
];

/**
 * Helper to compute visual dietary tags for each card
 */
function getCardDietaryBadges(item: MenuItem) {
  const badges: { label: string; icon: string; className: string }[] = [];

  const isSpicy =
    item.tags.includes("spicy") ||
    item.name.toLowerCase().includes("spicy") ||
    item.name.toLowerCase().includes("nai miris") ||
    item.desc.toLowerCase().includes("nai miris") ||
    item.badge.toLowerCase().includes("heat");

  const isSeafood =
    item.tags.includes("seafood") ||
    item.desc.toLowerCase().includes("prawns") ||
    item.desc.toLowerCase().includes("cuttlefish") ||
    item.desc.toLowerCase().includes("tuna");

  const isVegetarian =
    item.name.toLowerCase().includes("veg") ||
    item.desc.toLowerCase().includes("vegetarian") ||
    item.badge.toLowerCase().includes("vegetarian");

  const isUnder1250 = item.price <= 1250;

  if (isSpicy) {
    badges.push({
      label: "Spicy / Nai Miris",
      icon: "🌶️",
      className: "text-amber-300 bg-amber-500/10 border-amber-500/25",
    });
  }
  if (isSeafood) {
    badges.push({
      label: "Coastal Seafood",
      icon: "🦐",
      className: "text-cyan-300 bg-cyan-500/10 border-cyan-500/25",
    });
  }
  if (isVegetarian) {
    badges.push({
      label: "Vegetarian",
      icon: "🌱",
      className: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    });
  }
  if (isUnder1250) {
    badges.push({
      label: "< LKR 1,250",
      icon: "🏷️",
      className: "text-stone-300 bg-white/5 border-white/10",
    });
  }

  return badges;
}

/**
 * Individual 3D Interactive Menu Card
 */
function MenuCardItem({
  item,
  onAddToCart,
}: {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}) {
  const cardRef = use3DTilt<HTMLElement>({ maxTilt: 7, scale: 1.02 });
  const dietaryBadges = getCardDietaryBadges(item);

  return (
    <article
      ref={cardRef}
      className="depth-card-3d card-cinematic rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-ember-500/40 transition-colors duration-300"
    >
      <div className="depth-glare absolute inset-0 rounded-2xl sm:rounded-3xl z-30 pointer-events-none" />

      <div>
        {/* Card Image Container with Hover Zoom & Floating Badges */}
        <div className="depth-layer-img relative h-56 sm:h-64 overflow-hidden border-b border-white/10 bg-obsidian-900">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent opacity-90" />

          {/* Top-Left Category/Specialty Badge */}
          <span className="depth-layer-mid absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-obsidian-950/90 backdrop-blur-md border border-ember-500/40 text-[11px] font-semibold text-amber-300 shadow-md">
            {item.badge}
          </span>

          {/* Bottom-Right Price Badge */}
          <span className="depth-layer-mid absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-gold-500/40 text-gold-400 font-bold text-xs sm:text-sm tracking-wide shadow-md">
            {formatLKR(item.price)}
          </span>
        </div>

        {/* Card Content */}
        <div className="depth-layer-mid p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ember-400 font-bold">
              {item.tier}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300 leading-snug">
            {item.name}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300/85 mt-2.5 leading-relaxed font-sans">
            {item.desc}
          </p>

          {/* Dietary Tags */}
          {dietaryBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
              {dietaryBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-[11px] font-medium ${badge.className}`}
                >
                  <span className="text-xs">{badge.icon}</span>
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer with Add to Order Tray Button */}
      <div className="depth-layer-front px-5 sm:px-6 pb-5 sm:pb-6 pt-2 relative z-20">
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          className="w-full py-3 px-3 sm:px-4 rounded-xl bg-white/5 hover:bg-ember-500 text-stone-200 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 border border-white/10 hover:border-ember-500 shadow-sm active:scale-95 group/btn"
        >
          <span className="text-base font-bold leading-none text-ember-400 group-hover/btn:text-white transition-transform group-hover/btn:scale-125 duration-300">
            +
          </span>
          <span className="whitespace-nowrap">Add to Order Tray</span>
          <span className="text-stone-400 group-hover/btn:text-white/80 font-normal whitespace-nowrap">
            &middot; {formatLKR(item.price)}
          </span>
        </button>
      </div>
    </article>
  );
}

/**
 * Dedicated The Menu Page
 */
export default function MenuPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [activeDietary, setActiveDietary] = useState<DietaryFilterOption>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Keyboard shortcut: Press '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      // Dietary filter
      let matchesDietary = true;
      if (activeDietary === "popular") {
        matchesDietary =
          item.tags.includes("popular") || item.badge.toLowerCase().includes("bestseller");
      } else if (activeDietary === "spicy") {
        matchesDietary =
          item.tags.includes("spicy") ||
          item.name.toLowerCase().includes("spicy") ||
          item.name.toLowerCase().includes("nai miris") ||
          item.desc.toLowerCase().includes("nai miris") ||
          item.badge.toLowerCase().includes("heat");
      } else if (activeDietary === "seafood") {
        matchesDietary =
          item.tags.includes("seafood") ||
          item.desc.toLowerCase().includes("prawns") ||
          item.desc.toLowerCase().includes("cuttlefish") ||
          item.desc.toLowerCase().includes("tuna");
      } else if (activeDietary === "under-1250") {
        matchesDietary = item.price <= 1250;
      }

      // Live search filter
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.tier.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, activeDietary, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveDietary("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#070606] text-[#f5f2eb] animate-page-enter overflow-x-hidden">
      {/* Background ambient radial glow accents */}
      <div
        className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-ember-600/[0.05] rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-24">
        {/* Page Header */}
        <header className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="eyebrow-luxury block mb-3">
            ARTISANAL WOOD-FIRED COLLECTION &middot; GALLE
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
            THE HEAVENLY{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-gold-400 to-amber-200">
              MENU
            </span>
          </h1>
          <p className="text-sm sm:text-base text-stone-300/90 leading-relaxed font-sans max-w-2xl mx-auto">
            Explore our full 27-item culinary collection crafted with genuine Sri Lankan spices, artisanal crusts, and imported Italian mozzarella in Kahaduwawattha, Galle.
          </p>
        </header>

        {/* Controls Bar: Search & Dietary Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-8">
          {/* Live Search Bar with Keyboard Shortcut & Clear Button */}
          <div className="relative flex-1 w-full max-w-xl">
            <label htmlFor="menuSearchInput" className="sr-only">
              Search the menu
            </label>
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                id="menuSearchInput"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients, lasagna, boba..."
                className="w-full pl-11 pr-20 py-3 rounded-2xl bg-obsidian-900/90 border border-white/10 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-ember-500/70 focus:ring-1 focus:ring-ember-500/50 shadow-inner transition-all duration-200"
              />
              <svg
                className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Right side controls: Clear button or Keyboard Shortcut badge */}
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-stone-400 bg-obsidian-800 border border-white/10 rounded">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Dietary Filter Select Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <label htmlFor="dietaryFilterSelect" className="text-xs text-stone-400 font-medium whitespace-nowrap hidden sm:inline">
              Filter:
            </label>
            <div className="relative w-full sm:w-auto">
              <select
                id="dietaryFilterSelect"
                aria-label="Filter menu by dietary criteria"
                value={activeDietary}
                onChange={(e) => setActiveDietary(e.target.value as DietaryFilterOption)}
                className="w-full sm:w-auto px-4 py-3 pr-10 rounded-2xl bg-obsidian-900/90 border border-white/10 text-xs sm:text-sm text-amber-200 font-medium focus:outline-none focus:border-ember-500/70 focus:ring-1 focus:ring-ember-500/50 cursor-pointer appearance-none transition-all duration-200"
              >
                {DIETARY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-obsidian-900 text-stone-200">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs with Full-Bleed Scroll and Cue Gradients */}
        <div className="relative mb-6">
          {/* Subtle Left Scroll Cue Gradient */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -left-4 sm:left-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-r from-[#070606] to-transparent z-10 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Subtle Right Scroll Cue Gradient */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-4 sm:right-0 top-0 bottom-0 w-10 sm:w-14 bg-gradient-to-l from-[#070606] to-transparent z-10 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            id="categoryTabsContainer"
            ref={tabsRef}
            onScroll={checkScroll}
            role="tablist"
            aria-label="Menu category selector"
            className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 scroll-smooth"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-category={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 border ${
                    isActive
                      ? "bg-ember-500 text-white font-semibold shadow-lg shadow-ember-500/25 border-ember-500 scale-[1.02]"
                      : "bg-obsidian-900/80 hover:bg-obsidian-850 text-stone-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count Indicator Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/5 mb-8">
          <p className="text-xs sm:text-sm text-stone-400 font-medium tracking-wide">
            Showing <span className="text-ember-400 font-bold">{filteredItems.length}</span> artisanal {filteredItems.length === 1 ? "creation" : "creations"}
            {activeCategory !== "all" && (
              <span className="text-stone-500">
                {" "}in <span className="text-stone-300">{CATEGORIES.find((c) => c.key === activeCategory)?.label}</span>
              </span>
            )}
          </p>
          {(activeCategory !== "all" || activeDietary !== "all" || searchQuery.trim() !== "") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-ember-400 hover:text-ember-300 underline underline-offset-4 transition"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Dynamic Menu Grid */}
        <div
          id="menuGrid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 perspective-stage"
        >
          {filteredItems.map((item) => (
            <MenuCardItem
              key={item.id}
              item={item}
              onAddToCart={(it) => addToCart(it.id, it.name, it.price)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div
            id="menuEmptyState"
            className="text-center py-20 px-6 card-cinematic rounded-3xl border border-white/10 max-w-xl mx-auto my-12"
          >
            <div className="w-16 h-16 rounded-full bg-ember-500/10 border border-ember-500/20 flex items-center justify-center mx-auto mb-4 text-ember-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              No matching creations found
            </h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mb-6 leading-relaxed">
              {searchQuery
                ? `We couldn't find any dishes matching "${searchQuery}". Try modifying your search keywords or clearing active filters.`
                : "No dishes match your selected category or dietary filter combination."}
            </p>
            <button
              id="resetMenuFiltersBtn"
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ember-500 hover:bg-ember-600 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-ember-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Reset All Filters</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <section className="mt-20 relative rounded-3xl overflow-hidden card-cinematic border border-ember-500/30 p-6 sm:p-12 lg:p-16 text-center">
          {/* Ambient ember glow behind banner */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-ember-500/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="eyebrow-luxury mb-3 block">
              BESPOKE WOOD-FIRED ATELIER
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Want to craft your own custom recipe?
            </h3>
            <p className="text-sm sm:text-base text-stone-300/90 leading-relaxed mb-8 max-w-xl font-sans">
              Step into our interactive Slice Studio. Select your wood-fired crust profile, authentic Southern Sri Lankan chili kick, velvety sauces, and gourmet toppings tailored to your exact taste.
            </p>
            <Link
              href="/studio"
              className="btn-magnetic inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-ember-500 to-amber-500 hover:from-ember-600 hover:to-amber-600 text-white font-serif font-bold text-xs sm:text-base tracking-wide shadow-xl shadow-ember-500/25 hover:shadow-ember-500/40 transition-all duration-300 hover:scale-105 active:scale-95 max-w-full text-center"
            >
              <span>Open Slice Studio Atelier &rarr;</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
