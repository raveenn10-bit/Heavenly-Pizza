"use client";

import React, { useState, useEffect, useRef, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import { use3DTilt } from "@/hooks/use3DTilt";

function ReservationForm() {
  const { openConfirmationModal, showToast } = useCart();
  const searchParams = useSearchParams();
  const initialOccasion = searchParams.get("occasion");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "7:00 PM (Prime Dinner)",
    guests: "4 Guests (Family/Friends)",
    seating: "Peaceful Garden Patio",
    occasion: "Casual Dining / Family Feast",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set default date to today's date formatted YYYY-MM-DD
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      date: today,
      occasion: initialOccasion || prev.occasion,
    }));
  }, [initialOccasion]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const date = formData.date;
    const time = formData.time;
    const guests = formData.guests;
    const seating = formData.seating;
    const occasion = formData.occasion;
    const notes = formData.notes.trim() || "Standard table setup";

    const resText =
      `*HEAVENLY PIZZA GALLE — TABLE RESERVATION*\n` +
      `Guest Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Date & Time: ${date} at ${time}\n` +
      `Party Size: ${guests}\n` +
      `Seating Area: ${seating}\n` +
      `Occasion: ${occasion}\n` +
      `Special Notes: ${notes}\n` +
      `Location: Kahaduwawattha, Baddegama Rd, Galle (071 111 8989)`;

    openConfirmationModal("Table Reservation Pass Created!", resText);
    showToast("Reservation Pass Created! Tap 'Open WhatsApp' in the pass to send.");
    setIsSubmitted(true);
  };

  return (
    <div className="card-cinematic rounded-3xl p-6 sm:p-8 border border-white/10">
      <div className="mb-6 space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block">
          INSTANT WHATSAPP CONCIERGE · GALLE
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
          RESERVE A TABLE OR{" "}
          <span className="italic font-normal text-[#f04e23]">CELEBRATION</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-300">
          Book our starlit garden patio or cozy indoor lounge. We prepare your table with care and confirm immediately via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="resNameInput"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Your Name *
            </label>
            <input
              id="resNameInput"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Kasun Perera"
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-ember-500"
            />
          </div>
          <div>
            <label
              htmlFor="resPhoneInput"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Phone / WhatsApp Number *
            </label>
            <input
              id="resPhoneInput"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="e.g. 071 234 5678"
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-ember-500"
            />
          </div>
        </div>

        {/* Date, Time, Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="resDateInput"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Preferred Date *
            </label>
            <input
              id="resDateInput"
              type="date"
              required
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
            />
          </div>

          <div>
            <label
              htmlFor="resTimeSelect"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Time Slot (1:00 PM – 9:00 PM)
            </label>
            <select
              id="resTimeSelect"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
            >
              <option value="1:00 PM (Lunch Opening)">1:00 PM (Lunch Opening)</option>
              <option value="1:30 PM (Lunch Feast)">1:30 PM (Lunch Feast)</option>
              <option value="3:00 PM (Afternoon Tea &amp; Boba)">3:00 PM (Afternoon Tea &amp; Boba)</option>
              <option value="5:30 PM (Sunset Garden Glow)">5:30 PM (Sunset Garden Glow)</option>
              <option value="7:00 PM (Prime Dinner)">7:00 PM (Prime Dinner)</option>
              <option value="8:15 PM (Late Dinner &amp; Drinks)">8:15 PM (Late Dinner &amp; Drinks)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="resGuestsSelect"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Party Size
            </label>
            <select
              id="resGuestsSelect"
              value={formData.guests}
              onChange={(e) =>
                setFormData({ ...formData, guests: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
            >
              <option value="2 Guests (Intimate / Couple)">2 Guests (Intimate / Couple)</option>
              <option value="4 Guests (Family/Friends)">4 Guests (Family / Friends)</option>
              <option value="6-8 Guests (Group Feasting Table)">6–8 Guests (Group Table)</option>
              <option value="10-15 Guests (Celebration Party)">10–15 Guests (Party Gathering)</option>
              <option value="16+ Guests (Full Section Booking)">16+ Guests (Full Section Booking)</option>
            </select>
          </div>
        </div>

        {/* Seating & Occasion */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="resSeatingSelect"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Seating Preference
            </label>
            <select
              id="resSeatingSelect"
              value={formData.seating}
              onChange={(e) =>
                setFormData({ ...formData, seating: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
            >
              <option value="Peaceful Garden Patio">Peaceful Outdoor Garden Patio</option>
              <option value="Cozy Indoor Dining Lounge">Cozy Indoor Dining Lounge</option>
              <option value="Under the Fairy String Lights">Under the Fairy String Lights</option>
              <option value="Best Available Table">Best Available Table</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="resOccasionSelect"
              className="block text-xs font-medium text-stone-300 mb-1"
            >
              Special Occasion
            </label>
            <select
              id="resOccasionSelect"
              value={formData.occasion}
              onChange={(e) =>
                setFormData({ ...formData, occasion: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
            >
              <option value="Casual Dining / Family Feast">Casual Dining / Family Feast</option>
              <option value="Bride to Be / Bridal Shower">Bride to Be / Bridal Shower (Custom Decor)</option>
              <option value="Birthday Celebration">Birthday Celebration (Cake Service)</option>
              <option value="Date Night / Anniversary">Date Night / Anniversary (Romantic Setup)</option>
              <option value="Business / Team Dinner">Business / Team Dinner</option>
            </select>
          </div>
        </div>

        {/* Custom Notes */}
        <div>
          <label
            htmlFor="resNotesInput"
            className="block text-xs font-medium text-stone-300 mb-1"
          >
            Special Requests, Decor Needs, or Pre-Orders
          </label>
          <textarea
            id="resNotesInput"
            rows={3}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="e.g. Bringing birthday cake, high chair needed, pre-order 2 Large Heavenly Mix Pizzas and 1 Lasagna..."
            className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-ember-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-ember-500 to-amber-600 hover:from-ember-600 hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-xl ember-glow transition transform hover:-translate-y-0.5"
        >
          Confirm Booking Request &amp; Generate WhatsApp Pass →
        </button>

        {isSubmitted && (
          <p className="text-center text-xs text-emerald-400 font-medium">
            ✓ Reservation Pass generated! Click the WhatsApp button in the popup to send directly to our team.
          </p>
        )}
      </form>
    </div>
  );
}

function VipSliceClubCard() {
  const { showToast } = useCart();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [birthMonth, setBirthMonth] = useState("January");
  const [joined, setJoined] = useState(false);

  const handleVipSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    showToast("Welcome to the VIP Slice Club! Your 10% welcome perk is active.");
    setJoined(true);
    setName("");
    setContact("");
  };

  return (
    <div className="card-cinematic rounded-3xl p-6 sm:p-7 border border-amber-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            VIP SLICE CLUB · EXCLUSIVE PERKS
          </span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
          Join the Galle VIP Slice Club
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Sign up for 10% off your next garden feast, complimentary garlic butter dip, secret pizza tastings, and an annual birthday surprise on us!
        </p>

        {joined ? (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-1">
            <div className="text-sm font-bold flex items-center gap-1.5">
              <span>🎉 You&apos;re Officially a VIP Member!</span>
            </div>
            <p className="text-xs text-stone-300">
              Show your phone number to our staff when dining in or ordering takeaway to redeem your 10% discount pass.
            </p>
          </div>
        ) : (
          <form onSubmit={handleVipSubmit} className="space-y-3 pt-1">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="vipNameInput"
                  className="block text-[11px] font-medium text-stone-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="vipNameInput"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kasun Perera"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label
                  htmlFor="vipContactInput"
                  className="block text-[11px] font-medium text-stone-300 mb-1"
                >
                  WhatsApp Number or Email *
                </label>
                <input
                  id="vipContactInput"
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="071 234 5678 or email"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/15 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="vipBirthMonthSelect"
                className="block text-[11px] font-medium text-stone-300 mb-1"
              >
                Birthday Month (for your Annual Birthday Pizza gift)
              </label>
              <select
                id="vipBirthMonthSelect"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-ember-500 hover:from-amber-600 hover:to-ember-600 text-white font-bold text-xs tracking-wider uppercase shadow-md transition"
            >
              Claim Instant 10% VIP Pass
            </button>
            <p className="text-[11px] text-stone-400 text-center">
              No spam ever. Unsubscribe or opt-out anytime with 1 tap.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardTiltRef = use3DTilt<HTMLDivElement>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const depthCards = pageRef.current?.querySelectorAll(".gsap-scroll-depth");
      if (depthCards && depthCards.length > 0) {
        depthCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
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
      {/* Top Banner Header */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-ember-500/25 blur-[130px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-ember-400 bg-ember-500/10 px-4 py-1.5 rounded-full border border-ember-500/20">
            INSTANT WHATSAPP CONCIERGE · GALLE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            RESERVE A TABLE OR{" "}
            <span className="italic font-normal text-[#f04e23]">CELEBRATION</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether planning an intimate date night under the garden fairy lights, a lively family feast, or a customized bridal shower, secure your table with instant WhatsApp confirmation.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Booking Form (Left) & Visit Flagship Card + VIP Club (Right) */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Booking Form */}
          <div className="lg:col-span-7 gsap-scroll-depth">
            <Suspense
              fallback={
                <div className="card-cinematic rounded-3xl p-8 text-center text-stone-400 text-sm">
                  Loading reservation form...
                </div>
              }
            >
              <ReservationForm />
            </Suspense>
          </div>

          {/* Right Column: Visit Flagship Card & VIP Slice Club */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visit Flagship Card */}
            <div
              ref={cardTiltRef}
              className="depth-card-3d gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block">
                    SANCTUARY LOCATION
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                    VISIT OUR FLAGSHIP
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open Today
                </span>
              </div>

              <div className="space-y-4 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center shrink-0 text-ember-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Address</div>
                    <div className="text-stone-300 text-xs mt-0.5 leading-relaxed">
                      Baddegama Road, Kahaduwawattha (Kithulampitiya Rd), Galle, Sri Lanka 80000
                    </div>
                    <a
                      href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-1.5 text-xs text-ember-400 hover:text-amber-300 font-semibold underline"
                    >
                      <span>Open in Google Maps</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center shrink-0 text-ember-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Opening Hours</div>
                    <div className="text-stone-300 text-xs mt-0.5">
                      Monday – Sunday: 1:00 PM – 9:30 PM
                    </div>
                    <div className="text-amber-300/90 text-xs mt-0.5 font-medium">
                      Uber Eats &amp; PickMe delivery from 12:30 PM
                    </div>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center shrink-0 text-ember-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Hotline</div>
                    <a
                      href="tel:+94711118989"
                      className="text-stone-200 hover:text-white text-xs mt-0.5 block font-mono"
                    >
                      071 111 8989 / +94 71 111 8989
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/94711118989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs text-center transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href="https://www.ubereats.com/lk/store/heavenly-pizza-galle/SV1DJ9IwXcyz1lMebHDKxA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-amber-200 font-semibold text-xs text-center transition border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <span>Uber Eats</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* VIP Slice Club Signup Form */}
            <div className="gsap-scroll-depth">
              <VipSliceClubCard />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Guidelines & FAQs */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
            CONCIERGE POLICIES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Table Booking &amp; Event Guidelines
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-stone-300">
          <div className="card-cinematic rounded-2xl p-5 border border-white/10 space-y-2">
            <h4 className="font-bold text-white text-sm">Instant WhatsApp Pass</h4>
            <p>
              Your reservation pass is generated on submit. Simply tap &quot;Open WhatsApp&quot; to forward your details directly to our reservations team.
            </p>
          </div>

          <div className="card-cinematic rounded-2xl p-5 border border-white/10 space-y-2">
            <h4 className="font-bold text-white text-sm">Celebration Decor</h4>
            <p>
              For Bridal Showers, Birthdays, and Anniversaries, we provide custom floral and balloon table setups. Please book at least 24 hours in advance.
            </p>
          </div>

          <div className="card-cinematic rounded-2xl p-5 border border-white/10 space-y-2">
            <h4 className="font-bold text-white text-sm">Table Grace Period</h4>
            <p>
              We hold reserved garden and indoor tables for 20 minutes past your scheduled time. Call 071 111 8989 if you are running late!
            </p>
          </div>

          <div className="card-cinematic rounded-2xl p-5 border border-white/10 space-y-2">
            <h4 className="font-bold text-white text-sm">Walk-Ins &amp; Parking</h4>
            <p>
              Walk-in guests are always warmly welcomed based on garden availability. Free parking is available directly on our property.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
