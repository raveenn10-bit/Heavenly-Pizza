"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { MENU_ITEMS } from "@/data/menuData";
import { MenuItem, MenuCategory, DietaryTag } from "@/types/menu";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";

function formatLKR(num: number): string {
  return "LKR " + Number(num).toLocaleString("en-LK");
}

function MenuCard({
  item,
  onAddToCart,
}: {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}) {
  const cardRef = use3DTilt<HTMLElement>();

  return (
    <article
      ref={cardRef}
      className="depth-card-3d menu-card-anim card-cinematic rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group"
    >
      <div className="depth-glare absolute inset-0 rounded-2xl sm:rounded-3xl z-30 pointer-events-none" />
      <div>
        <div className="depth-layer-img relative h-52 overflow-hidden border-b border-white/10">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
          <span className="depth-layer-mid absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-white/10 text-[11px] font-medium text-amber-300">
            {item.badge}
          </span>
          <span className="depth-layer-mid absolute bottom-3 right-3 px-2.5 sm:px-3 py-1 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-gold-500/30 text-gold-400 font-bold text-xs sm:text-sm shrink-0 whitespace-nowrap">
            {formatLKR(item.price)}
          </span>
        </div>
        <div className="depth-layer-mid p-4 sm:p-5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-ember-400 font-semibold mb-1">
            {item.tier}
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold-300 transition break-words">
            {item.name}
          </h3>
          <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">{item.desc}</p>
        </div>
      </div>
      <div className="depth-layer-front px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between gap-3 relative z-20">
        <button
          type="button"
          data-add-id={item.id}
          onClick={() => onAddToCart(item)}
          className="add-to-cart-btn w-full py-2.5 px-3 sm:px-4 rounded-xl bg-white/5 hover:bg-ember-500 text-stone-200 hover:text-white font-semibold text-xs transition flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 border border-white/10 hover:border-ember-500 shadow-sm"
        >
          <span>Add to Order</span>
          <span className="text-amber-300/90 group-hover:text-white font-bold whitespace-nowrap">
            &middot; {formatLKR(item.price)}
          </span>
        </button>
      </div>
    </article>
  );
}

export default function MenuExplorer() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [activeTagFilter, setActiveTagFilter] = useState<DietaryTag>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const matchesTag =
        activeTagFilter === "all" || item.tags.includes(activeTagFilter);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.tier.toLowerCase().includes(q);
      return matchesCat && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTagFilter, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveTagFilter("all");
    setSearchQuery("");
  };

  const categories: { key: MenuCategory; label: string }[] = [
    { key: "all", label: "All Items (27)" },
    { key: "premium-supreme", label: "Premium & Supreme Pizzas" },
    { key: "deluxe-classic", label: "Deluxe & Classic Pizzas" },
    { key: "pasta-lasagna", label: "Lasagna & Pastas" },
    { key: "burgers-chicken", label: "Burgers & Crispy Chicken" },
    { key: "fried-rice", label: "Basmati Wok Rice" },
    { key: "bites-drinks", label: "Boba & Sides" },
  ];

  return (
    <section id="menuSection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-400 block mb-2">
            Verified Galle Menu &middot; Artisanal Flavours
          </span>
          <h2 id="menuSectionTitle" className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white">
            THE HEAVENLY <span className="italic font-normal text-[#f04e23]">COLLECTION.</span>
          </h2>
        </div>

        {/* Search & Quick Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <input
              id="menuSearchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients, lasagna..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-obsidian-800 border border-white/10 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-ember-500/70"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3.5 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            id="dietaryFilterSelect"
            aria-label="Filter menu by tag"
            value={activeTagFilter}
            onChange={(e) => setActiveTagFilter(e.target.value as DietaryTag)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-obsidian-800 border border-white/10 text-sm text-amber-200 focus:outline-none focus:border-ember-500/70 cursor-pointer"
          >
            <option value="all">All Specialties</option>
            <option value="popular">Customer Favorites</option>
            <option value="spicy">Spicy &middot; Nai Miris</option>
            <option value="seafood">Coastal Seafood</option>
            <option value="budget">Value &middot; Under LKR 1,250</option>
          </select>
        </div>
      </div>

      {/* Category Tabs Container with Scroll Cues */}
      <div className="relative mb-8">
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
          className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 scroll-smooth"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                data-category={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`menu-cat-btn shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition ${
                  isActive
                    ? "bg-ember-500 text-white shadow-md font-semibold"
                    : "bg-obsidian-800/90 hover:bg-obsidian-700 text-stone-300 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Menu Grid */}
      <div id="menuGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 perspective-stage">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={(it) => addToCart(it.id, it.name, it.price)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div id="menuEmptyState" className="text-center py-14 card-cinematic rounded-3xl p-8">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No matching dishes found</h3>
          <p className="text-xs text-stone-400 mb-4">
            Try clearing your search query or switching to another category.
          </p>
          <button
            id="resetMenuFiltersBtn"
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full bg-ember-500 hover:bg-ember-600 text-white text-xs font-semibold shadow-sm transition"
          >
            Show All Menu Items
          </button>
        </div>
      )}
    </section>
  );
}
