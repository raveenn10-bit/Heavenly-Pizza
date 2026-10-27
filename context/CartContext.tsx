"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode
} from "react";
import { CartItem, OrderMode } from "@/types/menu";

export interface ConfirmationModalState {
  isOpen: boolean;
  title: string;
  summaryText: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (id: string, name: string, price: number) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  orderMode: OrderMode;
  setOrderMode: (mode: OrderMode) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  confirmationModal: ConfirmationModalState;
  openConfirmationModal: (title: string, summaryText: string) => void;
  closeConfirmationModal: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  cartCount: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  { id: "heavenly-mix", name: "Heavenly Mix Pizza (Large)", price: 2100, qty: 1 }
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [orderMode, setOrderMode] = useState<OrderMode>("Dine-In");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<ConfirmationModalState>({
    isOpen: false,
    title: "",
    summaryText: ""
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up toast timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2800);
  }, []);

  const addToCart = useCallback(
    (id: string, name: string, price: number) => {
      setCart(prev => {
        const existingIndex = prev.findIndex(item => item.id === id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            qty: updated[existingIndex].qty + 1
          };
          return updated;
        }
        return [...prev, { id, name, price, qty: 1 }];
      });
      showToast(`Added "${name}" to your order!`);
    },
    [showToast]
  );

  const updateQty = useCallback((id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const openConfirmationModal = useCallback((title: string, summaryText: string) => {
    setConfirmationModal({
      isOpen: true,
      title,
      summaryText
    });
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setConfirmationModal(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const value: CartContextType = {
    cart,
    addToCart,
    updateQty,
    clearCart,
    orderMode,
    setOrderMode,
    isCartOpen,
    openCart,
    closeCart,
    confirmationModal,
    openConfirmationModal,
    closeConfirmationModal,
    toastMessage,
    showToast,
    cartCount,
    cartSubtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;
