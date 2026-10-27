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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Ready for Heavenly Pizza</span>
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
            className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>Open WhatsApp (+94 71 111 8989)</span>
          </a>
          <button
            id="copySummaryBtn"
            type="button"
            onClick={handleCopy}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy Text</span>
          </button>
        </div>
      </div>
    </div>
  );
}
