export type MenuCategory =
  | "all"
  | "premium-supreme"
  | "deluxe-classic"
  | "pasta-lasagna"
  | "burgers-chicken"
  | "fried-rice"
  | "bites-drinks";

export type DietaryTag = "all" | "popular" | "spicy" | "seafood" | "budget";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  tier: string;
  price: number;
  desc: string;
  tags: string[];
  badge: string;
  img: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export type OrderMode = "Dine-In" | "Takeaway" | "Delivery";

export interface CustomTopping {
  name: string;
  price: number;
}

export interface CustomPizzaState {
  size: string;
  sizePrice: number;
  crust: string;
  crustPrice: number;
  spice: string;
  toppings: CustomTopping[];
}

export interface ReservationFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  occasion: string;
  notes: string;
}
