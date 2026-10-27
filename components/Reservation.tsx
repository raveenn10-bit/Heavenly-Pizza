"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";

export default function Reservation() {
  const { openConfirmationModal } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "7:00 PM",
    guests: "4 Guests",
    seating: "Peaceful Garden Seating",
    occasion: "Casual Dining",
    notes: "",
  });

  // Set default date to today's date formatted YYYY-MM-DD
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const depthCards = sectionRef.current?.querySelectorAll(".gsap-scroll-depth");
      if (depthCards && depthCards.length > 0) {
        depthCards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 70,
              rotateX: 16,
              scale: 0.92,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "bottom 12%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
  };

  return (
    <section
      id="reservationSection"
      ref={sectionRef}
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Left: Interactive Reservation Form */}
        <div className="lg:col-span-7 gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-8">
          <span className="text-xs font-bold uppercase tracking-widest text-ember-400 block mb-1">
            Instant WhatsApp Concierge
          </span>
          <h2 className="gsap-split-heading font-serif text-2xl sm:text-4xl font-bold text-white mb-2">
            RESERVE A TABLE OR{" "}
            <span className="italic font-normal text-[#f04e23]">CELEBRATION.</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mb-6">
            Book our peaceful garden patio or cozy indoor lounge for family
            dinners, birthdays, or bridal showers.
          </p>

          <form id="reservationForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="resName"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Your Name *
                </label>
                <input
                  id="resName"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Kasun Perera"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                />
              </div>
              <div>
                <label
                  htmlFor="resPhone"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="resPhone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="e.g. 071 234 5678"
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="resDate"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Preferred Date *
                </label>
                <input
                  id="resDate"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                />
              </div>
              <div>
                <label
                  htmlFor="resTime"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Time (1:00 PM – 9:00 PM)
                </label>
                <select
                  id="resTime"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                >
                  <option value="1:30 PM">1:30 PM (Lunch)</option>
                  <option value="3:00 PM">3:00 PM (Afternoon)</option>
                  <option value="5:30 PM">5:30 PM (Sunset Garden)</option>
                  <option value="7:00 PM">7:00 PM (Prime Dinner)</option>
                  <option value="8:15 PM">8:15 PM (Late Dinner)</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="resGuests"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Number of Guests
                </label>
                <select
                  id="resGuests"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                >
                  <option value="2 Guests">2 Guests (Couple)</option>
                  <option value="4 Guests">4 Guests (Family/Friends)</option>
                  <option value="6-8 Guests">6–8 Guests (Group Table)</option>
                  <option value="10+ Celebration Party">
                    10+ Guests (Celebration Event)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="resSeating"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Seating Preference
                </label>
                <select
                  id="resSeating"
                  value={formData.seating}
                  onChange={(e) =>
                    setFormData({ ...formData, seating: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                >
                  <option value="Peaceful Garden Seating">
                    Peaceful Outdoor Garden
                  </option>
                  <option value="Cozy Indoor Dining">
                    Cozy Indoor Dining Lounge
                  </option>
                  <option value="Best Available Table">
                    Best Available Table
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="resOccasion"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Special Occasion
                </label>
                <select
                  id="resOccasion"
                  value={formData.occasion}
                  onChange={(e) =>
                    setFormData({ ...formData, occasion: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
                >
                  <option value="Casual Dining">Casual Family / Friends Meal</option>
                  <option value="Birthday Celebration">
                    Birthday Celebration
                  </option>
                  <option value="Bride-to-Be / Bridal Shower">
                    Bride-to-Be / Party Decor
                  </option>
                  <option value="Anniversary / Date Night">
                    Date Night / Anniversary
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="resNotes"
                className="block text-xs font-medium text-stone-300 mb-1"
              >
                Special Requests or Pre-Order Notes
              </label>
              <input
                id="resNotes"
                type="text"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="e.g. Cake table setup, extra cheesy lasagna pre-order..."
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/15 text-sm text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-ember-500 to-amber-600 hover:from-ember-600 hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-xl ember-glow transition"
            >
              Confirm Booking Request &amp; Generate Pass
            </button>
          </form>
        </div>

        {/* Right: Direct Contact, Hours & Location Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="gsap-scroll-depth card-cinematic rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-white">
                VISIT HEAVENLY PIZZA
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                Open Every Day
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-ember-500/10 border border-ember-500/20 flex items-center justify-center shrink-0 text-ember-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Galle Flagship Location
                  </div>
                  <div className="text-stone-400 text-xs mt-0.5">
                    Heavenly Pizza, Baddegama Road, Kahaduwawattha (Kithulampitiya
                    Rd), Galle, Sri Lanka 80000
                  </div>
                  <a
                    href="https://maps.app.goo.gl/kq4AhGKhzCb9FAmH7?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 text-xs text-ember-400 hover:text-amber-300 font-semibold underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-ember-500/10 border border-ember-500/20 flex items-center justify-center shrink-0 text-ember-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white">Opening Hours</div>
                  <div className="text-stone-400 text-xs mt-0.5">
                    Monday – Sunday: 1:00 PM – 9:30 PM
                  </div>
                  <div className="text-amber-300/90 text-xs">
                    Uber Eats &amp; PickMe Delivery from 12:30 PM
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-ember-500/10 border border-ember-500/20 flex items-center justify-center shrink-0 text-ember-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Direct Hotline &amp; WhatsApp
                  </div>
                  <div className="text-stone-300 text-xs mt-0.5">
                    071 111 8989 / +94 71 111 8989
                  </div>
                  <div className="text-stone-400 text-xs">
                    Email: info@heavenlypizza.lk • Web: heavenlypizza.lk
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/94711118989"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs text-center transition flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp Us</span>
              </a>
              <a
                href="https://www.ubereats.com/lk/store/heavenly-pizza-galle/SV1DJ9IwXcyz1lMebHDKxA"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-amber-200 font-semibold text-xs text-center transition border border-white/10 flex items-center justify-center gap-1.5"
              >
                <span>Order on Uber Eats</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
