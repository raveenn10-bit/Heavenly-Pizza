"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function ConfirmationModal() {
  const { confirmationModal, closeConfirmationModal, showToast } = useCart();

  if (!confirmationModal.isOpen) return null;

  const handleCopy = () => {
    const text = confirmationModal.summaryText;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          showToast("Copied order details to clipboard!");
        },
        () => {
          fallbackCopy(text);
        }
      );
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("Copied order details to clipboard!");
    } catch {
      showToast("Ready to send via WhatsApp!");
    }
  };

  const waUrl =
    "https://wa.me/94711118989?text=" +
    encodeURIComponent(confirmationModal.summaryText);

  return (
    <div
      id="confirmationModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeConfirmationModal();
      }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <div className="card-cinematic rounded-3xl max-w-md w-full p-6 border border-amber-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <span
            id="modalBadge"
            className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold"
          >
            ✔ Ready for Heavenly Pizza
          </span>
          <button
            id="closeModalBtn"
            type="button"
            onClick={closeConfirmationModal}
            className="text-stone-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <h3 id="modalTitle" className="font-serif text-xl font-bold text-white">
          {confirmationModal.title || "Order Summary"}
        </h3>
        <pre
          id="modalSummaryBox"
          className="bg-obsidian-950 p-4 rounded-2xl border border-white/10 text-xs text-amber-100 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto"
        >
          {confirmationModal.summaryText}
        </pre>
        <div className="flex gap-3">
          <a
            id="modalWhatsAppLink"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition"
          >
            💬 Open WhatsApp (+94 71 111 8989)
          </a>
          <button
            id="copySummaryBtn"
            type="button"
            onClick={handleCopy}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition"
          >
            📋 Copy Text
          </button>
        </div>
      </div>
    </div>
  );
}
