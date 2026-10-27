import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import ConfirmationModal from "@/components/ConfirmationModal";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heavenlypizza.vercel.app"),
  title: "Heavenly Pizza — Galle | A Little Slice of Heaven",
  description:
    "Crafting Galle's favourite artisanal wood-fired style pizzas, bubbling baked lasagna, crispy golden chicken burgers, and chilled boba drinks in a cozy starlit garden setting.",
  openGraph: {
    title: "Heavenly Pizza — Galle | A Little Slice of Heaven",
    description:
      "Crafting Galle's favourite artisanal wood-fired style pizzas, bubbling baked lasagna, crispy golden chicken burgers, and chilled boba drinks in a cozy starlit garden setting.",
    images: ["/assets/heavenly-mix-pizza.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} font-sans selection:bg-ember-500 selection:text-white bg-[#070606] text-[#f5f2eb] overflow-x-hidden`}
      >
        <CartProvider>
          <ScrollProgressBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <ConfirmationModal />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
