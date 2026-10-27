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
  isCarousel = false,
}: {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isCarousel?: boolean;
}) {
  const cardRef = use3DTilt<HTMLElement>();

  return (
    <article
      ref={cardRef}
      className={`depth-card-3d menu-card-anim card-cinematic rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group snap-start ${
        isCarousel
          ? "w-[280px] sm:w-[320px] md:w-[350px] shrink-0"
          : "w-full"
      }`}
    >
      <div className="depth-glare absolute inset-0 rounded-2xl sm:rounded-3xl z-30 pointer-events-none" />
      <div>
        <div className="depth-layer-img relative h-48 sm:h-52 overflow-hidden border-b border-white/10">
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
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold-300 transition break-words line-clamp-1 sm:line-clamp-none">
            {item.name}
          </h3>
          <p className="text-xs text-stone-400 mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {item.desc}
          </p>
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
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  // Category Tabs scrolling state
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Menu Carousel Track state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollCarouselLeft, setCanScrollCarouselLeft] = useState(false);
  const [canScrollCarouselRight, setCanScrollCarouselRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkTabsScroll = () => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  const checkCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollCarouselLeft(el.scrollLeft > 10);
    setCanScrollCarouselRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkTabsScroll();
    window.addEventListener("resize", checkTabsScroll);
    return () => window.removeEventListener("resize", checkTabsScroll);
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

  // Reset scroll to beginning smoothly whenever filtering or search changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeCategory, activeTagFilter, searchQuery]);

  // Update carousel scroll cues when filtered items change
  useEffect(() => {
    checkCarouselScroll();
  }, [filteredItems, viewMode]);

  // User interaction pause handler (resumes after 5 seconds of idle)
  const handleUserInteraction = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Carousel smooth navigation
  const handleScrollPrev = () => {
    handleUserInteraction();
    const el = carouselRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const step = firstChild ? firstChild.offsetWidth + 16 : 300;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  const handleScrollNext = () => {
    handleUserInteraction();
    const el = carouselRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const step = firstChild ? firstChild.offsetWidth + 16 : 300;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  // Continuous gentle auto-scroll / auto-glide when idle in carousel mode
  useEffect(() => {
    if (viewMode !== "carousel") return;
    if (isPaused) return;
    if (filteredItems.length <= 1) return;

    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstChild = el.firstElementChild as HTMLElement | null;
        const step = firstChild ? firstChild.offsetWidth + 16 : 300;
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [viewMode, isPaused, filteredItems.length]);

  // Cleanup pause timer
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

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
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-400 block">
              Verified Galle Menu &middot; Artisanal Flavours
            </span>
            {viewMode === "carousel" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ember-500/10 border border-ember-500/30 text-[10px] font-medium text-amber-300">
                <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-stone-400" : "bg-emerald-400 animate-pulse"}`} />
                <span className="hidden xs:inline">{isPaused ? "Paused" : "Auto-glide"}</span>
              </span>
            )}
          </div>
          <h2 id="menuSectionTitle" className="gsap-split-heading font-serif text-3xl sm:text-5xl font-bold text-white">
            THE HEAVENLY <span className="italic font-normal text-[#f04e23]">COLLECTION.</span>
          </h2>
        </div>

        {/* Search, Filter, Mode Toggle & Carousel Arrow Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-60 md:w-64">
            <input
              id="menuSearchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-obsidian-800 border border-white/10 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-ember-500/70"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3 top-3"
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

          {/* Dietary Select */}
          <select
            id="dietaryFilterSelect"
            aria-label="Filter menu by tag"
            value={activeTagFilter}
            onChange={(e) => setActiveTagFilter(e.target.value as DietaryTag)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-obsidian-800 border border-white/10 text-xs sm:text-sm text-amber-200 focus:outline-none focus:border-ember-500/70 cursor-pointer"
          >
            <option value="all">All Specialties</option>
            <option value="popular">Customer Favorites</option>
            <option value="spicy">Spicy &middot; Nai Miris</option>
            <option value="seafood">Coastal Seafood</option>
            <option value="budget">Value &middot; Under LKR 1,250</option>
          </select>

          {/* View Mode & Nav Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-2 pt-1 sm:pt-0">
            {/* View Mode Toggle: Carousel vs Grid */}
            <div className="flex items-center p-1 rounded-full bg-obsidian-800 border border-white/10 shrink-0">
              <button
                type="button"
                id="menuViewCarouselBtn"
                onClick={() => setViewMode("carousel")}
                aria-label="Switch to horizontal carousel view"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  viewMode === "carousel"
                    ? "bg-ember-500 text-white shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>↔</span>
                <span>Carousel</span>
              </button>
              <button
                type="button"
                id="menuViewGridBtn"
                onClick={() => setViewMode("grid")}
                aria-label="Switch to full grid view"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  viewMode === "grid"
                    ? "bg-ember-500 text-white shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <span>☷</span>
                <span>Grid</span>
              </button>
            </div>

            {/* Left / Right Carousel Arrow Buttons */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  id="menuScrollPrevBtn"
                  onClick={handleScrollPrev}
                  aria-label="Previous menu items"
                  disabled={!canScrollCarouselLeft}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-obsidian-800 border border-white/10 flex items-center justify-center transition active:scale-95 shadow-sm ${
                    canScrollCarouselLeft
                      ? "hover:bg-ember-500 hover:text-white text-stone-200"
                      : "opacity-40 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  id="menuScrollNextBtn"
                  onClick={handleScrollNext}
                  aria-label="Next menu items"
                  disabled={!canScrollCarouselRight}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-obsidian-800 border border-white/10 flex items-center justify-center transition active:scale-95 shadow-sm ${
                    canScrollCarouselRight
                      ? "hover:bg-ember-500 hover:text-white text-stone-200"
                      : "opacity-40 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
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
          onScroll={checkTabsScroll}
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

      {/* Menu Cards Display Area */}
      {viewMode === "carousel" ? (
        /* Horizontal Auto-Scroll Track for Menu Cards */
        <div className="relative">
          {/* Subtle Left Scroll Cue Gradient */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -left-4 sm:left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#070606] to-transparent z-10 transition-opacity duration-300 ${
              canScrollCarouselLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Subtle Right Scroll Cue Gradient */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-4 sm:right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#070606] to-transparent z-10 transition-opacity duration-300 ${
              canScrollCarouselRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            id="menuCarouselTrack"
            ref={carouselRef}
            onScroll={() => {
              checkCarouselScroll();
              handleUserInteraction();
            }}
            onTouchStart={handleUserInteraction}
            onTouchEnd={handleUserInteraction}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClickCapture={handleUserInteraction}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 perspective-stage snap-x snap-mandatory"
          >
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                isCarousel={true}
                onAddToCart={(it) => {
                  handleUserInteraction();
                  addToCart(it.id, it.name, it.price);
                }}
              />
            ))}
          </div>

          {/* Helper hint for mobile users */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 mt-3 px-1">
            <span>
              Showing {filteredItems.length} dishes &middot; Swipe horizontally
            </span>
            <span className="hidden sm:inline">
              Auto-glide active &middot; Pauses on hover/touch
            </span>
          </div>
        </div>
      ) : (
        /* Full Grid Layout */
        <div
          id="menuGrid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 perspective-stage"
        >
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              isCarousel={false}
              onAddToCart={(it) => addToCart(it.id, it.name, it.price)}
            />
          ))}
        </div>
      )}

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
