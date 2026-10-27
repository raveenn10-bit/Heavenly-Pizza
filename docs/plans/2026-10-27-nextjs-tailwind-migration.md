# Next.js & Tailwind CSS Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Heavenly Pizza static website (`index.html`) into a production-grade, modular Next.js (App Router) and Tailwind CSS web application with 100% preservation of all existing layouts, 3D tilt effects, GSAP animations, video hero, customizer studio, and WhatsApp ordering flow.

**Architecture:** Next.js App Router with modular React Client & Server Components. All static images and background video reside in `public/assets/`. Interactive components (GSAP scroll triggers, 3D card tilt, ember canvas, cart drawer, pizza studio) are encapsulated as Client Components with shared state managed via a lightweight React Context (`CartContext`).

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP 3.12 (with ScrollTrigger), Google Fonts (`Inter`, `Playfair Display`, `Cinzel`), HTML5 Canvas 2D.

---

### Task 1: Next.js Project Scaffolding & Asset Setup
**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`
- Create: `public/assets/*` (copy all 8 assets from `./assets/`)
- Test: Verify Node environment and directory structure

**Step 1: Create package.json with dependencies**
Dependencies: `next`, `react`, `react-dom`, `gsap`. DevDependencies: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `postcss`, `autoprefixer`, `tailwindcss`.

**Step 2: Copy media files to `public/assets/`**
Ensure `hero-video.mp4`, `heavenly-logo.jpg`, and all 6 food/ambience JPGs are accessible under `/assets/...`.

**Step 3: Run package installation**
Run `npm install` to install all necessary packages.

---

### Task 2: Tailwind CSS, Theme Tokens & Fonts Setup
**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `app/layout.tsx`

**Step 1: Configure Tailwind with custom design tokens**
Port the exact color palette (`ember-50` to `ember-900`, `gold-300` to `gold-600`, `obsidian-600` to `obsidian-950`) and font definitions (`Cinzel`, `Playfair Display`, `Inter`).

**Step 2: Port global CSS & 3D utility classes**
Port custom scrollbar, ember glow, gold glow, card-cinematic, hero vignette, perspective stage, 3D depth card layers (`depth-layer-bg`, `depth-layer-img`, `depth-layer-mid`, `depth-layer-front`), and specular glare (`.depth-glare`).

**Step 3: Setup Google Fonts in layout**
Use `next/font/google` for `Inter`, `Playfair_Display`, and `Cinzel` for zero-layout-shift font rendering.

---

### Task 3: Menu Data Model & Cart State Management
**Files:**
- Create: `types/menu.ts`
- Create: `data/menuData.ts`
- Create: `context/CartContext.tsx`

**Step 1: Define TypeScript interfaces**
Define `MenuItem`, `CartItem`, `CustomPizzaState`, `OrderMode`, `ReservationData`.

**Step 2: Port complete 27-item menu data**
Port all verified items with Sri Lankan Rupee pricing, categories (`premium-supreme`, `deluxe-classic`, `pasta-lasagna`, `burgers-chicken`, `fried-rice`, `bites-drinks`), tags, and badges.

**Step 3: Implement CartContext**
Create global provider for cart items, adding/decrementing items, active order mode (`Dine-In`, `Takeaway`, `Delivery`), cart drawer open/close state, confirmation modal state, and toast trigger.

---

### Task 4: Header, Announcement Bar & Navigation
**Files:**
- Create: `components/Header.tsx`
- Create: `components/ScrollProgressBar.tsx`

**Step 1: Top announcement bar**
Render the orange-red announcement bar (`GOOD FOOD. GOOD COMPANY. GALLE.`) with directions link.

**Step 2: Sticky glass-nav header**
Emblem logo, brand typography (`HEAVENLY pizza · galle`), desktop navigation anchor links (`The menu`, `Slice Studio`, `Our vibe`, `Stories`, `Find us`), cart order button with dynamic count badge, and mobile drawer toggle.

**Step 3: Scroll progress bar**
Top progress line driven by scroll listener / GSAP ScrollTrigger.

---

### Task 5: Cinematic Hero Section & Canvas Embers
**Files:**
- Create: `components/Hero.tsx`
- Create: `components/EmberCanvas.tsx`

**Step 1: Canvas 2D Ember particle engine**
Render floating warm glowing ember particles on a canvas layer above the video.

**Step 2: Full-bleed background video**
Autoplaying, looping, muted `<video src="/assets/hero-video.mp4" poster="/assets/heavenly-mix-pizza.jpg">` with cinematic gradient vignette.

**Step 3: Editorial typography & GSAP entrance**
Staggered reveal of badge, serif headline (*"A little slice of heaven."*), subtitle, CTA buttons, and rotating circular badge (*"MORE THAN A SLICE."*). Quick-add button card for instant ordering.

---

### Task 6: 3D Depth Card Hook & Signature Showcase
**Files:**
- Create: `hooks/use3DTilt.ts`
- Create: `components/SignatureShowcase.tsx`

**Step 1: Reusable 3D tilt & dynamic specular glare hook**
Implement mousemove tilt math computing dynamic `rotateX`, `rotateY`, and CSS variables `--glare-x`, `--glare-y` with smooth mouseleave spring reset.

**Step 2: Port 4 Signature 3D Cards**
Render Heavenly Mix Supreme (LKR 2,100), Devilled & Nai Miris (LKR 1,750), Baked Chicken Lasagna (LKR 1,450), and Crispy Chicken Burger & Boba (LKR 680-750) with multi-plane Z-index depth layers.

---

### Task 7: Brand Pillars & Menu Explorer
**Files:**
- Create: `components/BrandPillars.tsx`
- Create: `components/MenuExplorer.tsx`

**Step 1: Brand pillars ribbon**
4 highlight cards: Handcrafted Crust, Authentic Galle Flavours, Peaceful Garden Seating, Fast Galle Delivery.

**Step 2: Interactive Menu Explorer**
Live search input, category tab pills with active highlight, dietary tag filter dropdown, 3D tilt menu cards with "+ Add to Order" integration, and empty search state.

---

### Task 8: Interactive "Slice Studio" (3D Customizer)
**Files:**
- Create: `components/SliceStudio.tsx`

**Step 1: Real-time customization engine**
State for Size (Regular 8", Medium 10", Large 12"), Artisanal Crust (Hand-tossed, Thin herb, Cheese burst), Sri Lankan Spice profile, and toggleable toppings with price calculation.

**Step 2: Live preview card & summary**
Dynamic badges, price display in LKR, live specs summary, and "+ Add Custom Pizza to Order" button.

---

### Task 9: Garden Ambience, Reviews & Table Reservation
**Files:**
- Create: `components/Ambience.tsx`
- Create: `components/Reviews.tsx`
- Create: `components/Reservation.tsx`

**Step 1: Garden & Indoor Dining Ambience**
Starlit garden description, celebration packages, feature list, and garden photo card.

**Step 2: Customer Reviews**
3 verified review cards with 3D tilt highlighting 4.4★ rating and 10k+ followers.

**Step 3: Interactive Table Reservation Form**
Input fields for guest name, phone/WhatsApp, date picker, time slot, guest count, seating preference, occasion, and special notes. Generates reservation pass modal and direct WhatsApp concierge message.

---

### Task 10: Cart Drawer, WhatsApp Engine, Modals & Footer
**Files:**
- Create: `components/CartDrawer.tsx`
- Create: `components/ConfirmationModal.tsx`
- Create: `components/Toast.tsx`
- Create: `components/Footer.tsx`

**Step 1: Slide-over Cart Drawer**
Slide-in panel with Dine-In / Takeaway / Delivery mode buttons, item quantity adjusters, subtotal/total calculations, and WhatsApp checkout submission generator.

**Step 2: Confirmation modal & Clipboard copy**
Receipt view with copy text button and direct WhatsApp link to `+94 71 111 8989`.

**Step 3: Cinematic Footer**
Animated infinite marquee ticker, top CTA banner, 4-column information grid, VIP club form, giant kinetic wordmark (`HEAVENLY PIZZA`), and copyright bar.

---

### Task 11: Integration, Verification & Build Test
**Files:**
- Update: `app/page.tsx`
- Test: Run `npm run build` and `npm run start` / `npm run dev` to verify clean build without TypeScript or lint errors.
- Verify: Confirm identical layout, styling, animations, video playback, and ordering features.
