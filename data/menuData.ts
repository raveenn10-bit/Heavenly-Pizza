import { MenuItem } from "@/types/menu";

// Image constants mapping to Next.js public directory assets
export const IMG_HERO_PIZZA = "/assets/heavenly-mix-pizza.jpg";
export const IMG_DEVILLED_PIZZA = "/assets/devilled-pizza.jpg";
export const IMG_CRISPY_BURGER = "/assets/crispy-chicken-burger.jpg";
export const IMG_PASTA_LASAGNA = "/assets/baked-lasagna.jpg";
export const IMG_DRINKS_BOBA = "/assets/boba-drinks.jpg";

/**
 * Verified Artisanal Menu Data - Heavenly Pizza Galle
 * Refined editorial presentation with exact prices, categories, and ingredients
 */
export const MENU_ITEMS: MenuItem[] = [
  // Premium & Supreme Pizzas
  {
    id: "heavenly-mix",
    name: "Heavenly Mix Pizza",
    category: "premium-supreme",
    tier: "Premium Signature",
    price: 2100,
    desc: "Spicy chicken, ocean prawns, cuttlefish, tuna, chicken sausage, black olives, bell pepper, onion & melted mozzarella cheese.",
    tags: ["popular", "seafood", "spicy"],
    badge: "Bestseller",
    img: IMG_HERO_PIZZA
  },
  {
    id: "seafood-pizza",
    name: "Seafood Supreme Pizza",
    category: "premium-supreme",
    tier: "Premium Pizza",
    price: 1900,
    desc: "Fresh Southern coast cuttlefish, prawns, tuna, mozzarella cheese, crisp bell pepper, onion, and extra virgin olive oil.",
    tags: ["seafood", "popular"],
    badge: "Coastal Special",
    img: IMG_DEVILLED_PIZZA
  },
  {
    id: "devilled-supreme",
    name: "Devilled Chicken Supreme Pizza",
    category: "premium-supreme",
    tier: "Supreme Pizza",
    price: 1750,
    desc: "Signature Sri Lankan devilled chicken tossed in sweet-spicy chili glaze, capsicum, onion, mozzarella cheese & olive oil.",
    tags: ["popular", "spicy"],
    badge: "Galle Signature",
    img: IMG_DEVILLED_PIZZA
  },
  {
    id: "hot-spicy-supreme",
    name: "Hot & Spicy Nai Miris Supreme",
    category: "premium-supreme",
    tier: "Supreme Pizza",
    price: 1750,
    desc: "Fiery spicy chicken, aromatic Sri Lankan nai miris (scotch bonnet), green chilli, bell pepper, mozzarella & olive oil.",
    tags: ["spicy", "popular"],
    badge: "Nai Miris Heat",
    img: IMG_DEVILLED_PIZZA
  },
  {
    id: "hawaiian-supreme",
    name: "Hawaiian Supreme Pizza",
    category: "premium-supreme",
    tier: "Supreme Pizza",
    price: 1700,
    desc: "Savory chicken ham, caramelized tropical pineapple chunks, stretchy mozzarella cheese, onion & olive oil.",
    tags: ["popular"],
    badge: "Sweet & Savory",
    img: IMG_HERO_PIZZA
  },
  {
    id: "double-chicken-supreme",
    name: "Double Chicken Supreme Pizza",
    category: "premium-supreme",
    tier: "Supreme Pizza",
    price: 1400,
    desc: "Loaded with spicy roasted chicken, savory chicken sausages, onion, bell pepper, mozzarella cheese & olive oil.",
    tags: ["popular", "spicy"],
    badge: "Double Protein",
    img: IMG_HERO_PIZZA
  },
  {
    id: "twin-meat-supreme",
    name: "Twin Meat Delight Supreme",
    category: "premium-supreme",
    tier: "Supreme Pizza",
    price: 1360,
    desc: "Smoky chicken salami, juicy chicken sausages, crisp bell pepper, onion, mozzarella cheese & olive oil.",
    tags: ["popular"],
    badge: "Meat Lovers",
    img: IMG_HERO_PIZZA
  },

  // Deluxe & Classic Pizzas
  {
    id: "tandoori-deluxe",
    name: "Tandoori Chicken Deluxe Pizza",
    category: "deluxe-classic",
    tier: "Deluxe Pizza",
    price: 1216,
    desc: "Char-spiced tandoori chicken, fresh ginger, roasted garlic, bell pepper, onion, mozzarella cheese & olive oil.",
    tags: ["popular", "spicy", "budget"],
    badge: "Smoky Tandoor",
    img: IMG_DEVILLED_PIZZA
  },
  {
    id: "butter-chicken-deluxe",
    name: "Butter Chicken Deluxe Pizza",
    category: "deluxe-classic",
    tier: "Deluxe Pizza",
    price: 1216,
    desc: "Velvety butter chicken masala, aromatic ginger & garlic, caramelized onion, mozzarella cheese & olive oil.",
    tags: ["popular", "budget"],
    badge: "Creamy Masala",
    img: IMG_HERO_PIZZA
  },
  {
    id: "spicy-chicken-deluxe",
    name: "Spicy Chicken Deluxe Pizza",
    category: "deluxe-classic",
    tier: "Deluxe Pizza",
    price: 1216,
    desc: "Spiced chicken breast, sliced green chilli, red onion, bubbling mozzarella cheese & olive oil.",
    tags: ["spicy", "budget"],
    badge: "Classic Heat",
    img: IMG_DEVILLED_PIZZA
  },
  {
    id: "heavenly-fresh-veg",
    name: "Heavenly Fresh Vegetarian Pizza",
    category: "deluxe-classic",
    tier: "Deluxe Vegetarian",
    price: 1216,
    desc: "Garden mushroom, crisp capsicum, sweet corn, vine tomato, bell pepper, onion, mozzarella cheese & olive oil.",
    tags: ["budget"],
    badge: "100% Vegetarian",
    img: IMG_HERO_PIZZA
  },
  {
    id: "bolognese-classic",
    name: "Bolognese Classic Pizza",
    category: "deluxe-classic",
    tier: "Classic Pizza",
    price: 1136,
    desc: "Slow-simmered chicken bolognese ragù, melted mozzarella cheese, bell pepper & sweet onion.",
    tags: ["budget"],
    badge: "Italian Classic",
    img: IMG_HERO_PIZZA
  },
  {
    id: "margherita-classic",
    name: "Margherita Classic Pizza",
    category: "deluxe-classic",
    tier: "Classic Pizza",
    price: 994,
    desc: "Artisanal mozzarella cheese, sun-ripened tomato, bell pepper, onion & extra virgin olive oil.",
    tags: ["budget", "popular"],
    badge: "Artisan Cheese",
    img: IMG_HERO_PIZZA
  },
  {
    id: "sausages-classic",
    name: "Sausages Classic Pizza",
    category: "deluxe-classic",
    tier: "Classic Pizza",
    price: 994,
    desc: "Sliced chicken sausages, cracked black pepper, onion, mozzarella cheese & olive oil.",
    tags: ["budget"],
    badge: "Family Favorite",
    img: IMG_HERO_PIZZA
  },
  {
    id: "salami-classic",
    name: "Chicken Salami Classic Pizza",
    category: "deluxe-classic",
    tier: "Classic Pizza",
    price: 994,
    desc: "Savory cured chicken salami slices over melted mozzarella cheese and signature herb tomato base.",
    tags: ["budget"],
    badge: "Classic Salami",
    img: IMG_HERO_PIZZA
  },

  // Pastas & Lasagna
  {
    id: "heavenly-lasagna",
    name: "Heavenly Baked Chicken Lasagna",
    category: "pasta-lasagna",
    tier: "Signature Oven Pasta",
    price: 1450,
    desc: "Layers of rich spiced chicken meat sauce, velvety béchamel, and premium mozzarella baked until golden and bubbling.",
    tags: ["popular"],
    badge: "Chef's Lasagna",
    img: IMG_PASTA_LASAGNA
  },
  {
    id: "carbonara-pasta",
    name: "Creamy Carbonara Pasta",
    category: "pasta-lasagna",
    tier: "Artisanal Pasta",
    price: 1200,
    desc: "Al dente pasta ribbons folded into a rich parmesan cream sauce with savoury chicken strips, black pepper & herbs.",
    tags: ["popular", "budget"],
    badge: "Creamy Carbonara",
    img: IMG_PASTA_LASAGNA
  },
  {
    id: "cheesy-pasta",
    name: "Signature Cheesy Penne Pasta",
    category: "pasta-lasagna",
    tier: "Artisanal Pasta",
    price: 1200,
    desc: "Velvety double-cheese sauce, black olives, sweet corn, and fresh herbs baked to cheesy perfection.",
    tags: ["budget"],
    badge: "Cheesy Penne",
    img: IMG_PASTA_LASAGNA
  },

  // Burgers, Wraps & Crispy Chicken
  {
    id: "crispy-chicken-burger",
    name: "Golden Crispy Chicken Burger",
    category: "burgers-chicken",
    tier: "Gourmet Burger",
    price: 680,
    desc: "Crunchy golden-fried chicken breast fillet, melted cheddar slice, spicy house mayo & crisp lettuce on a toasted bun.",
    tags: ["popular", "budget"],
    badge: "Crispy Fried",
    img: IMG_CRISPY_BURGER
  },
  {
    id: "classic-chicken-burger",
    name: "Classic Grilled Chicken Burger",
    category: "burgers-chicken",
    tier: "Gourmet Burger",
    price: 650,
    desc: "Juicy herb-seasoned chicken patty, caramelized onions, fresh greens, and signature burger sauce.",
    tags: ["budget"],
    badge: "Classic Burger",
    img: IMG_CRISPY_BURGER
  },
  {
    id: "crispy-chicken-4pc",
    name: "Crispy Chicken (4 Pcs) + Fries Platter",
    category: "burgers-chicken",
    tier: "House Specialty",
    price: 1550,
    desc: "Four pieces of golden crunchy fried chicken breast — juicy inside, ultra-crispy outside — served with seasoned French Fries.",
    tags: ["popular"],
    badge: "Platter Special",
    img: IMG_CRISPY_BURGER
  },
  {
    id: "fresh-chicken-wrap",
    name: "Fresh Crispy Chicken Wrap",
    category: "burgers-chicken",
    tier: "Wraps",
    price: 780,
    desc: "Tender crispy chicken strips, crunchy garden slaw, and roasted garlic sauce wrapped in a warm grilled tortilla.",
    tags: ["budget"],
    badge: "Crispy Wrap",
    img: IMG_CRISPY_BURGER
  },

  // Wok-Fired Fried Rice
  {
    id: "mixed-fried-rice",
    name: "Heavenly Mixed Special Fried Rice",
    category: "fried-rice",
    tier: "Basmati Wok Rice",
    price: 1750,
    desc: "Fragrant long-grain basmati rice wok-tossed with eggs, roast chicken, cuttlefish, prawns, tuna & chicken sausage.",
    tags: ["popular", "seafood"],
    badge: "Mixed Special",
    img: IMG_PASTA_LASAGNA
  },
  {
    id: "seafood-fried-rice",
    name: "Galle Seafood Basmati Rice",
    category: "fried-rice",
    tier: "Basmati Wok Rice",
    price: 1550,
    desc: "Wok-fired basmati rice with farm eggs, ocean prawns, tender cuttlefish, tuna & spring onion.",
    tags: ["seafood"],
    badge: "Coastal Wok",
    img: IMG_PASTA_LASAGNA
  },
  {
    id: "crispy-chicken-rice",
    name: "Crispy Chicken Basmati Fried Rice",
    category: "fried-rice",
    tier: "Basmati Wok Rice",
    price: 1350,
    desc: "Aromatic egg fried basmati rice crowned with golden crispy fried chicken legs and chili paste.",
    tags: ["popular", "spicy"],
    badge: "Local Special",
    img: IMG_CRISPY_BURGER
  },
  {
    id: "chicken-fried-rice",
    name: "Classic Chicken Basmati Rice",
    category: "fried-rice",
    tier: "Basmati Wok Rice",
    price: 1040,
    desc: "Fluffy basmati rice wok-tossed with seasoned chicken, eggs, carrots & leeks.",
    tags: ["budget"],
    badge: "Everyday Classic",
    img: IMG_PASTA_LASAGNA
  },

  // Bites, Mocktails & Bubble Tea
  {
    id: "boba-milk-tea",
    name: "Brown Sugar Pearl Bubble Tea & Mocktails",
    category: "bites-drinks",
    tier: "Beverages & Boba",
    price: 750,
    desc: "Chilled brown sugar tapioca pearl milk tea or tropical passionfruit & virgin mint mojito mocktail.",
    tags: ["popular", "budget"],
    badge: "Brown Sugar Boba",
    img: IMG_DRINKS_BOBA
  },
  {
    id: "crispy-french-fries",
    name: "Golden Seasoned French Fries",
    category: "bites-drinks",
    tier: "Bites & Sides",
    price: 600,
    desc: "Crispy golden potato fries lightly dusted with peri-peri and sea salt, served with tomato ketchup & garlic dip.",
    tags: ["popular", "budget"],
    badge: "Crispy Fries",
    img: IMG_CRISPY_BURGER
  },
  {
    id: "sri-lankan-omelette",
    name: "Cheesy / Sri Lankan Spicy Omelette",
    category: "bites-drinks",
    tier: "Bites & Sides",
    price: 600,
    desc: "Fluffy farm-egg omelette folded with green chillies, red onions, tomatoes, and melted cheese.",
    tags: ["spicy", "budget"],
    badge: "Spicy Omelette",
    img: IMG_DEVILLED_PIZZA
  }
];

export function formatLKR(num: number): string {
  return "LKR " + Number(num).toLocaleString("en-LK");
}
