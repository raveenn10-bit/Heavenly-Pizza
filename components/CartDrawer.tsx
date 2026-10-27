"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatLKR } from "@/data/menuData";
import { OrderMode } from "@/types/menu";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateQty,
    clearCart,
    orderMode,
    setOrderMode,
    cartSubtotal,
    openConfirmationModal,
    showToast,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  if (!isCartOpen) return null;

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) {
      showToast("Please add at least one item to your order first!");
      return;
    }
    const custName = customerName.trim() || "Valued Guest";
    const custNote = customerNote.trim() || "None";
    const total = cartSubtotal;
    const lines = cart
      .map((i) => `• ${i.qty}x ${i.name} — ${formatLKR(i.price * i.qty)}`)
      .join("\n");

    const summary =
      `*HEAVENLY PIZZA GALLE — NEW ORDER*\n` +
      `Customer: ${custName}\n` +
      `Service Mode: ${orderMode}\n` +
      `--------------------------\n` +
      `${lines}\n` +
      `--------------------------\n` +
      `*TOTAL ESTIMATE: ${formatLKR(total)}*\n` +
      `Notes / Address: ${custNote}\n` +
      `Location: Baddegama Rd, Kahaduwawattha, Galle (071 111 8989)`;

    closeCart();
    openConfirmationModal("Your Heavenly Order is Ready!", summary);
  };

  return (
    <div
      id="cartDrawerBackdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex justify-end"
    >
      <div className="w-full max-w-md bg-obsidian-900 border-l border-white/15 h-full flex flex-col justify-between p-6 overflow-y-auto animate-slide-left">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                YOUR HEAVENLY ORDER
              </h3>
              <p className="text-xs text-stone-400">
                Freshly prepared to order in Galle
              </p>
            </div>
            <button
              id="closeCartBtn"
              type="button"
              onClick={closeCart}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300"
            >
              ✕
            </button>
          </div>

          {/* Order Mode Selector */}
          <div className="grid grid-cols-3 gap-2 my-4 bg-obsidian-950 p-1.5 rounded-xl border border-white/10 text-xs">
            {(["Dine-In", "Takeaway", "Delivery"] as OrderMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                data-mode={mode}
                onClick={() => setOrderMode(mode)}
                className={`order-mode-btn py-2 rounded-lg font-semibold tracking-wide transition ${
                  orderMode === mode
                    ? "bg-ember-500 text-white"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Cart Items List */}
          <div
            id="cartItemsContainer"
            className="space-y-3 my-4 max-h-72 overflow-y-auto pr-1"
          >
            {cart.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                Your order tray is empty. Add a Heavenly Pizza or custom creation!
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-obsidian-950 border border-white/10"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-gold-400 font-semibold">
                      {formatLKR(item.price)} each
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      data-dec-id={item.id}
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-white w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      data-inc-id={item.id}
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-ember-500 hover:bg-ember-600 text-white text-xs font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Checkout Footer */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <div className="space-y-2">
            <input
              id="checkoutCustomerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your Name (optional)"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-ember-500"
            />
            <input
              id="checkoutCustomerNote"
              type="text"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="Delivery Address in Galle / Table or Spice Note"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-ember-500"
            />
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal</span>
              <span id="cartSubtotalText">{formatLKR(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-1">
              <span>Total Estimate</span>
              <span id="cartTotalText" className="text-gold-400">
                {formatLKR(cartSubtotal)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              id="sendWhatsAppOrderBtn"
              type="button"
              onClick={handleSendWhatsAppOrder}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Place Order via WhatsApp (071 111 8989)</span>
            </button>
            <button
              id="clearCartBtn"
              type="button"
              onClick={clearCart}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 text-xs transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
