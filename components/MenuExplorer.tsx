"use client";

import React, { useState, useMemo } from "react";
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
      className="depth-card-3d menu-card-anim card-cinematic rounded-3xl overflow-hidden flex flex-col justify-between group"
    >
      <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
      <div>
        <div className="depth-layer-img relative h-48 overflow-hidden border-b border-white/10">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
          <span className="depth-layer-mid absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian-950/85 border border-white/15 text-[11px] font-semibold text-amber-300">
            {item.badge}
          </span>
          <span className="depth-layer-mid absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-obsidian-950/90 border border-gold-500/40 text-gold-400 font-extrabold text-sm">
            {formatLKR(item.price)}
          </span>
        </div>
        <div className="depth-layer-mid p-5">
          <div className="text-[11px] uppercase tracking-wider text-ember-400 font-semibold mb-1">
            {item.tier}
          </div>
          <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition">
            {item.name}
          </h3>
          <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">{item.desc}</p>
        </div>
      </div>
      <div className="depth-layer-front px-5 pb-5 pt-2 flex items-center justify-between gap-3 relative z-20">
        <button
          type="button"
          data-add-id={item.id}
          onClick={() => onAddToCart(item)}
          className="add-to-cart-btn flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-ember-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 border border-white/10 hover:border-ember-500"
        >
          <span>+ Add to Order</span>
          <span className="text-amber-300 font-bold">({formatLKR(item.price)})</span>
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
    { key: "all", label: "🍕 All Items (27)" },
    { key: "premium-supreme", label: "👑 Premium & Supreme Pizzas" },
    { key: "deluxe-classic", label: "🧀 Deluxe & Classic Pizzas" },
    { key: "pasta-lasagna", label: "🍝 Lasagna & Pastas" },
    { key: "burgers-chicken", label: "🍔 Burgers, Wraps & Crispy Chicken" },
    { key: "fried-rice", label: "🍚 Basmati Fried Rice" },
    { key: "bites-drinks", label: "🧋 Mocktails, Bubble Tea & Bites" },
  ];

  return (
    <section id="menuSection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block mb-2">
            Verified Galle Menu &amp; Prices
          </span>
          <h2 id="menuSectionTitle" className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white">
            THE HEAVENLY <span className="italic font-normal text-[#f04e23]">COLLECTION.</span>
          </h2>
        </div>
        {/* Search & Quick Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <input
              id="menuSearchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, nai miris, lasagna, rice..."
              className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-full bg-obsidian-800 border border-white/15 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-ember-500"
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
            className="px-4 py-2.5 rounded-full bg-obsidian-800 border border-white/15 text-sm text-amber-200 focus:outline-none focus:border-ember-500"
          >
            <option value="all">✨ All Specialties</option>
            <option value="popular">⭐ Customer Favorites</option>
            <option value="spicy">🌶️ Spicy / Nai Miris Kick</option>
            <option value="seafood">🦐 Coastal Seafood</option>
            <option value="budget">💰 Under LKR 1,250</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div id="categoryTabsContainer" className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              data-category={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`menu-cat-btn px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                isActive
                  ? "bg-ember-500 text-white shadow-lg"
                  : "bg-obsidian-800 hover:bg-obsidian-700 text-stone-300 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Menu Grid or Empty State */}
      {filteredItems.length > 0 ? (
        <div id="menuGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-stage">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={(itemToOrder) =>
                addToCart(itemToOrder.id, itemToOrder.name, itemToOrder.price)
              }
            />
          ))}
        </div>
      ) : (
        /* Empty State if Search has no matches */
        <div id="menuEmptyState" className="text-center py-14 card-cinematic rounded-3xl p-8">
          <div className="text-4xl mb-3">🍕</div>
          <h3 className="text-lg font-bold text-white mb-1">No matching dishes found</h3>
          <p className="text-xs text-stone-400 mb-4">Try clearing your search or switching category tabs.</p>
          <button
            id="resetMenuFiltersBtn"
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2 rounded-full bg-ember-500 text-white text-xs font-semibold"
          >
            Show All Menu Items
          </button>
        </div>
      )}
    </section>
  );
}
