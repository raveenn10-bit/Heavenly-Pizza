"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "garden",
    title: "The Starlit Garden Sanctuary",
    subtitle: "Kahaduwawattha Patio",
    image: "/assets/garden-ambience.jpg",
    tag: "Garden Vibe",
    description:
      "Lush tropical palms swaying gently in the Galle evening breeze, illuminated by golden fairy string lights and rustic timber tables.",
  },
  {
    id: "mix-pizza",
    title: "Signature Wood-Fired Crusts",
    subtitle: "Heavenly Mix Flagship",
    image: "/assets/heavenly-mix-pizza.jpg",
    tag: "Wood-Fired Pizza",
    description:
      "Hand-stretched dough baked at high heat with blistering leopard crust, rich Italian tomato base, and gooey mozzarella pull.",
  },
  {
    id: "lasagna",
    title: "Bubbling Cheesy Lasagna",
    subtitle: "Clay-Pot Golden Crust",
    image: "/assets/baked-lasagna.jpg",
    tag: "Pasta Classic",
    description:
      "Slow-simmered bolognese and velvety béchamel layered between tender pasta sheets and baked to bubbling, golden perfection.",
  },
  {
    id: "burger",
    title: "Crispy Golden Crunch Burger",
    subtitle: "Double Spiced Fillet",
    image: "/assets/crispy-chicken-burger.jpg",
    tag: "Golden Crunch",
    description:
      "Marinated buttermilk chicken fried to an audible crunch, drizzled with house garlic aioli and tucked into a toasted brioche bun.",
  },
  {
    id: "boba",
    title: "Artisanal Chilled Boba & Coolers",
    subtitle: "Island Refreshment",
    image: "/assets/boba-drinks.jpg",
    tag: "Handcrafted Sips",
    description:
      "Slow-cooked brown sugar tapioca pearls, premium Ceylon tea infusions, and fresh tropical passionfruit quenchers.",
  },
  {
    id: "devilled",
    title: "Fiery Devilled Sri Lankan Fusion",
    subtitle: "Spice Meets Tradition",
    image: "/assets/devilled-pizza.jpg",
    tag: "Island Fusion",
    description:
      "Tender spicy chicken stir-fried with banana peppers, red onions, and hot chili paste, tempered with sweet molten mozzarella.",
  },
];

interface ReviewItem {
  source: string;
  quote: string;
  author: string;
  verifiedLabel: string;
  occasion: string;
}

const REVIEWS: ReviewItem[] = [
  {
    source: "Google Review · June 2026",
    quote:
      "Visited Heavenly Pizza and honestly loved every bite. The pizza was fresh, cheesy, and packed with authentic flavor.",
    author: "Dine-In Guest",
    verifiedLabel: "Verified Visit",
    occasion: "Garden Dining",
  },
  {
    source: "Google Review · May 2026",
    quote:
      "I ordered from Heavenly Pizza Galle through PickMe, and it was amazing! The crust tasted exquisite and the drinks were perfect.",
    author: "Galle Delivery Customer",
    verifiedLabel: "Verified Order",
    occasion: "PickMe Doorstep Delivery",
  },
  {
    source: "Google Review · April 2026",
    quote:
      "Delicious pizza, good service, and nice atmosphere. Perfect spot in Kahaduwawattha for family dinner and crispy chicken.",
    author: "Local Guide • Galle",
    verifiedLabel: "Verified Visit",
    occasion: "Family Dinner Feast",
  },
  {
    source: "Google Review · July 2026",
    quote:
      "The Devilled & Nai Miris pizza is next level! Real southern heat paired with generous mozzarella. The garden seating at night is magical.",
    author: "Colombo Weekend Traveler",
    verifiedLabel: "Verified Visit",
    occasion: "Starlit Date Night",
  },
  {
    source: "Facebook Recommendation · June 2026",
    quote:
      "Celebrated my sister's Bride-to-Be dinner here under the fairy lights. The staff prepared the table beautifully and the lasagna was bubbling perfection!",
    author: "Galle Event Host",
    verifiedLabel: "Verified Event",
    occasion: "Bride-to-Be Celebration",
  },
  {
    source: "Google Review · May 2026",
    quote:
      "Best crispy chicken burgers and boba drinks in Galle! Super clean, fast direct WhatsApp delivery, and genuinely warm hospitality.",
    author: "Daily Foodie",
    verifiedLabel: "Verified Order",
    occasion: "WhatsApp Direct Order",
  },
];

export default function AmbiencePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroTiltRef = use3DTilt<HTMLDivElement>();
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const handleReviewScroll = (direction: "left" | "right") => {
    if (reviewsScrollRef.current) {
      const scrollAmount = 350;
      reviewsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal animations for scroll depth elements
      const depthElements = pageRef.current?.querySelectorAll(".gsap-scroll-depth");
      if (depthElements && depthElements.length > 0) {
        depthElements.forEach((el) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#070606] text-[#f5f2eb] pb-24">
      {/* Hero / Header Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-ember-500/25 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-gold-500/15 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-ember-400 bg-ember-500/10 px-4 py-1.5 rounded-full border border-ember-500/20">
              KAHADUWAWATTHA · BADDEGAMA ROAD · GALLE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              STARLIT GARDEN &amp;{" "}
              <span className="italic font-normal text-[#f04e23]">CULINARY PASSION</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              Step into Galle&apos;s hidden sanctuary — where tropical evening breezes rustle through palm canopies, fairy string lights warm rustic wooden tables, and the aroma of blistered wood-fired pizzas welcomes you home.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-ember-500 to-amber-600 hover:from-ember-600 hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-xl ember-glow transition transform hover:-translate-y-0.5"
              >
                <span>Book Your Garden Table →</span>
              </Link>
              <a
                href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition"
              >
                <span>📍 Get Directions to Galle Flagship</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section: Garden Sanctuary & Wood-Fired Passion */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <span>🌿 Open-Air Tropical Atmosphere</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              A Peaceful Retreat Far from the Highway Bustle
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p>
                Tucked into the lush greenery of Kahaduwawattha along Baddegama Road, Heavenly Pizza was envisioned as more than just a kitchen — it is a gathering haven. Here, the hum of Galle city recedes into the rustle of coconut fronds and the gentle warmth of hand-strung amber bulbs.
              </p>
              <p>
                At the heart of our dining experience is our blazing wood-fired oven. Baking at extreme heat on refractory stone, our sourdough dough rises rapidly with airy, leopard-spotted corniciones, locking in the rich tang of San Marzano sauce, fresh herbs, and stringy premium mozzarella.
              </p>
              <p>
                Whether you seek an intimate table under the night sky or a lively shared feast for family and friends, our open garden patio provides the ultimate backdrop for unhurried evenings and heartfelt memories.
              </p>
            </div>

            {/* Pull Quote Box */}
            <div className="card-cinematic rounded-2xl p-5 border-l-4 border-l-ember-500">
              <p className="text-amber-200 text-sm italic font-serif leading-relaxed">
                &quot;We don&apos;t just serve food; we set the stage for laughter, milestones, and that unforgettable moment when the cheese pulls across the table.&quot;
              </p>
              <span className="block text-xs text-stone-400 mt-2 font-semibold">
                — Heavenly Pizza Culinary &amp; Ambience Team, Galle
              </span>
            </div>
          </div>

          {/* Right Featured Card with 3D Tilt */}
          <div className="lg:col-span-6">
            <div
              ref={heroTiltRef}
              className="depth-card-3d gsap-scroll-depth card-cinematic relative rounded-3xl overflow-hidden border border-white/15 p-3.5 shadow-2xl"
            >
              <div className="depth-glare absolute inset-0 rounded-3xl z-30 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden h-80 sm:h-[420px] group">
                <img
                  src="/assets/garden-ambience.jpg"
                  alt="Heavenly Pizza Starlit Garden Ambience in Galle"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070606] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Float Overlay Details */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-obsidian-950/90 backdrop-blur-md border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block">
                    Galle Garden Patio
                  </span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Open Every Evening for Garden Dining
                  </p>
                </div>
                <Link
                  href="/reservations"
                  className="px-4 py-2 rounded-xl bg-ember-500 hover:bg-ember-600 text-white text-xs font-semibold shadow-md transition"
                >
                  Reserve Table →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrations & Milestones Section */}
      <section className="py-16 bg-obsidian-900/60 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block">
              CELEBRATE LIFE IN THE GARDEN
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Celebrations &amp; <span className="italic font-normal text-[#f04e23]">Milestones</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Turn your special moments into cinematic garden experiences with our custom setup packages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Bridal Showers */}
            <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-pink-500/40 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 text-2xl">
                  💍
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                    Signature Event Package
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Bridal Showers (&quot;Bride to Be&quot;)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Celebrate the bride-to-be in an enchanting open-air setting. Enjoy custom floral table setups, personalized celebration backdrops, candlelit centerpieces, and curated pizza &amp; boba pairings that create unforgettable photo memories.
                </p>
                <ul className="space-y-2 text-xs text-stone-300 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">✓</span> Dedicated decorated garden area
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">✓</span> Welcome fruit sparklers &amp; boba
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">✓</span> Pre-ordered tasting pizzas &amp; lasagna
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link
                  href="/reservations"
                  className="block text-center py-2.5 rounded-xl bg-pink-600/80 hover:bg-pink-600 text-white font-semibold text-xs transition"
                >
                  Book Bridal Shower Setup →
                </Link>
              </div>
            </div>

            {/* Card 2: Birthday Dinners & Group Family Feasts */}
            <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-amber-500/40 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl">
                  🎂
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Group Feasts &amp; Birthdays
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Birthday Feasts &amp; Family Nights
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Gather the whole crew around long rustic garden tables for generous multi-topping pizza boards, bubbling trays of golden lasagna, and crispy chicken burger baskets. Bring your birthday cake and let us host the feast!
                </p>
                <ul className="space-y-2 text-xs text-stone-300 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Large group seating for 6 to 25+ guests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Cake cutting service &amp; plateware provided
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Kid-friendly atmosphere &amp; safe garden lawn
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link
                  href="/reservations"
                  className="block text-center py-2.5 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-semibold text-xs transition"
                >
                  Reserve Birthday Feast Table →
                </Link>
              </div>
            </div>

            {/* Card 3: Cozy Date Nights under the stars */}
            <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-ember-500/40 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center text-ember-400 text-2xl">
                  ✨
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ember-400">
                    Intimate Dining
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Cozy Date Nights Under the Stars
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Quiet corner tables nestled beneath twinkling garden canopy lights. Savor artisanal pizzas crafted with care, share a decadent clay-baked lasagna, and sip chilled fruit coolers under the soft glow of candlelight.
                </p>
                <ul className="space-y-2 text-xs text-stone-300 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-ember-400">✓</span> Romantic corner garden table reservations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-ember-400">✓</span> Ambient acoustic playlist &amp; candlelight
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-ember-400">✓</span> Chilled boba drinks &amp; dessert options
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link
                  href="/reservations"
                  className="block text-center py-2.5 rounded-xl bg-ember-600/80 hover:bg-ember-600 text-white font-semibold text-xs transition"
                >
                  Book Date Night Table →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
            HOSPITALITY WITH NO COMPROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Guest Amenities &amp; <span className="italic font-normal text-[#f04e23]">Comfort</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Every convenience designed so you can relax completely from the moment you pull in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Amenity 1 */}
          <div className="gsap-scroll-depth card-cinematic rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center text-ember-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Free Parking Lot &amp; Street Parking
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Spacious private parking area right at the entrance of our Kahaduwawattha garden, with ample secure street parking for cars and vans.
            </p>
          </div>

          {/* Amenity 2 */}
          <div className="gsap-scroll-depth card-cinematic rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Credit, Debit &amp; NFC Mobile Payments
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              We accept Visa, Mastercard, Contactless NFC tap-to-pay (Apple Pay &amp; Google Pay), as well as direct LANKAQR instant transfers.
            </p>
          </div>

          {/* Amenity 3 */}
          <div className="gsap-scroll-depth card-cinematic rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Table Service &amp; Kid-Friendly
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Warm table-side service by our friendly team, comfortable seating, high chairs for toddlers, and child-approved cheesy pizza selections.
            </p>
          </div>

          {/* Amenity 4 */}
          <div className="gsap-scroll-depth card-cinematic rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Takeaway &amp; Delivery Concierge
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Curbside pickup counter for hot takeaways, plus live delivery tracking via Uber Eats and PickMe from 12:30 PM across the Galle district.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="py-16 bg-obsidian-900/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block mb-2">
                CAPTURED MOMENTS &amp; FLAVORS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Garden Photo <span className="italic font-normal text-[#f04e23]">Gallery</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md">
              A glimpse into our wood-fired hearth, artisanal culinary creations, and the golden evening ambience of our Galle sanctuary. Click any photo to view in high resolution.
            </p>
          </div>

          {/* 6-Photo Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="gsap-scroll-depth card-cinematic rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-ember-500/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-obsidian-900/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-ember-400 font-semibold">
                    <span>Click to expand</span>
                    <span className="group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full card-cinematic rounded-3xl overflow-hidden border border-ember-500/40 p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-ember-500/20 text-ember-300 text-xs font-semibold">
                {selectedPhoto.tag}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition"
              >
                ✕
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden max-h-[60vh] bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[58vh] mx-auto"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <Link
                href="/reservations"
                className="px-5 py-2.5 rounded-xl bg-ember-500 hover:bg-ember-600 text-white font-semibold text-xs transition"
              >
                Reserve Your Table →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Verified Guest Reviews Section ("Voices of Galle Lovers") */}
      <section className="py-16 sm:py-24 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            <div className="text-center sm:text-left max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                10,000+ SOCIAL FOLLOWERS · 4.4★ ON GOOGLE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Voices of <span className="italic font-normal text-[#f04e23]">Galle Lovers</span>
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm">
                Read what local Galle residents and travelers have shared about dining in our starlit garden.
              </p>
            </div>

            {/* Manual Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleReviewScroll("left")}
                aria-label="Previous review"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 hover:border-gold-400/40 transition active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleReviewScroll("right")}
                aria-label="Next review"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 hover:border-gold-400/40 transition active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Auto-Scroll Ribbon Track with Edge Fades */}
        <div className="relative group/reviews pause-on-hover overflow-hidden w-full">
          {/* Left Gradient Edge Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#070606] to-transparent z-10" />

          {/* Right Gradient Edge Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#070606] to-transparent z-10" />

          {/* Scrollable Container */}
          <div
            ref={reviewsScrollRef}
            className="overflow-x-auto no-scrollbar scroll-smooth w-full"
          >
            <div className="horizontal-auto-scroll-l2r flex gap-6 py-4 px-4 sm:px-6 pr-6">
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <div
                  key={`${review.author}-${i}`}
                  className="card-cinematic rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-gold-400/30 transition w-[290px] sm:w-[350px] shrink-0 space-y-5 select-none shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* 5 Gold Star SVGs */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starIdx) => (
                          <svg
                            key={starIdx}
                            className="w-4 h-4 fill-current text-gold-400"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400 px-2.5 py-0.5 rounded-full bg-white/5 font-medium border border-white/5">
                        {review.source}
                      </span>
                    </div>

                    <p className="text-stone-200 text-sm italic leading-relaxed">
                      &quot;{review.quote}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white block">{review.author}</span>
                      <span className="text-stone-400 text-[11px]">{review.occasion}</span>
                    </div>
                    {/* Verified Visit Badge */}
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px]">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {review.verifiedLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-cinematic rounded-3xl p-8 sm:p-12 border border-ember-500/40 text-center relative overflow-hidden ember-glow">
          <div className="absolute inset-0 bg-gradient-to-r from-ember-500/10 via-transparent to-gold-500/10 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block">
              YOUR GARDEN TABLE IS WAITING
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Experience the Magic of Galle Under the Stars
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Join us tonight at Kahaduwawattha on Baddegama Road. Book your table in advance or connect with our WhatsApp concierge for custom celebration decor.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <Link
                href="/reservations"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-ember-500 to-amber-600 hover:from-ember-600 hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-2xl transition transform hover:-translate-y-0.5"
              >
                Book Your Garden Table →
              </Link>
              <a
                href="https://wa.me/94711118989"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-xl transition flex items-center gap-2"
              >
                <span>WhatsApp Us (+94 71 111 8989)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
