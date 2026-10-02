export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'drinks' | 'sorbets' | 'mochi' | 'gummies' | 'bundles';
  price: number;
  sweetLevel: number; // 1 to 5
  sourLevel: number;  // 1 to 5
  isBestSeller?: boolean;
  isNew?: boolean;
  calories: string;
  dietary: string[];
  shortDesc: string;
  longDesc: string;
  ingredients: string[];
  servingSize: string;
  image: string;
  mascotEndorsement: {
    mascot: 'lemmy' | 'melly' | 'duo';
    quote: string;
  };
}

// Image paths from asset generation
import logoImg from '../assets/images/brand_logo_emblem_1790920706507.jpg';
import heroImg from '../assets/images/hero_summer_spread_1790920717023.jpg';
import coolerImg from '../assets/images/product_sparkling_cooler_1790920727950.jpg';
import sorbetImg from '../assets/images/product_sorbet_cup_1790920739901.jpg';
import mochiImg from '../assets/images/product_fruit_mochi_1790920751831.jpg';
import gummiesImg from '../assets/images/product_sour_gummies_1790920764231.jpg';

export { logoImg, heroImg };

export const PRODUCTS: Product[] = [
  {
    id: 'lm-sparkling-cooler',
    name: 'Signature Sparkling Cooler',
    tagline: 'Sun-drenched Meyer lemon with cold-pressed crisp watermelon soda',
    category: 'drinks',
    price: 5.50,
    sweetLevel: 3,
    sourLevel: 4,
    isBestSeller: true,
    calories: '95 kcal / bottle (330ml)',
    dietary: ['100% Real Fruit', 'Vegan', 'No High-Fructose Syrup'],
    shortDesc: 'A fizzy explosion of freshly squeezed zesty lemon juice balanced with sweet ruby watermelon pulp.',
    longDesc: 'Our original house staple. We slow-press whole heirloom lemons and steep them with fresh watermelon nectar before carbonating with fine champagne bubbles. Served ice-cold for the ultimate mid-afternoon thirst quencher.',
    ingredients: ['Carbonated Mountain Spring Water', 'Cold-Pressed Watermelon Juice (35%)', 'Fresh Meyer Lemon Juice (18%)', 'Organic Agave', 'Lemon Peel Essence'],
    servingSize: '330 ml glass bottle',
    image: coolerImg,
    mascotEndorsement: {
      mascot: 'lemmy',
      quote: '"One sip and your eyebrows pop with pure happiness!" — Lemmy'
    }
  },
  {
    id: 'lm-sorbet-trio',
    name: 'Twin Swirl Sorbet Cup',
    tagline: 'Vivid yellow Amalfi lemon and cool red watermelon slow-churned gelato',
    category: 'sorbets',
    price: 6.25,
    sweetLevel: 4,
    sourLevel: 3,
    isBestSeller: true,
    isNew: true,
    calories: '140 kcal / cup',
    dietary: ['Dairy-Free', 'Vegan', 'Gluten-Free', 'Real Fruit Puree'],
    shortDesc: 'Ultra-creamy dairy-free sorbet combining electric sour lemon on the left and mellow sugar-baby watermelon on the right.',
    longDesc: 'Churned fresh every morning in small batches. The golden lemon sorbet delivers bright citrus aromatics, while the watermelon swirl delivers silky, refreshing sweetness that cools your palate instantly.',
    ingredients: ['Watermelon Pulp', 'Lemon Juice & Zest', 'Organic Cane Sugar', 'Plant Pectin', 'Spring Water'],
    servingSize: '180g double scoop cup',
    image: sorbetImg,
    mascotEndorsement: {
      mascot: 'melly',
      quote: '"Ice cold, ultra smooth, and definitely cool under sunglasses." — Melly'
    }
  },
  {
    id: 'lm-fruit-mochi',
    name: 'Handcrafted Fruit Mochi Box',
    tagline: 'Chewy glutinous rice cakes filled with juicy melon center and citrus cream',
    category: 'mochi',
    price: 12.00,
    sweetLevel: 4,
    sourLevel: 2,
    isBestSeller: true,
    calories: '110 kcal / piece (Box of 4)',
    dietary: ['Gluten-Free', 'Vegetarian', 'Daily Fresh Batch'],
    shortDesc: 'Pillowy soft mochi dusted with powdered sugar, bursting with real fruit gelée and tangy lemon whipped center.',
    longDesc: 'Handmade daily using traditional mochigome sweet rice. Each bite offers a melt-in-your-mouth cloud texture filled with sweet watermelon compote encased in a velvety citrus lemon curd cream.',
    ingredients: ['Mochigome Sweet Rice Flour', 'Lemon Curd Cream', 'Watermelon Reduction', 'Organic Tapioca', 'Cane Sugar'],
    servingSize: 'Box of 4 pieces (200g total)',
    image: mochiImg,
    mascotEndorsement: {
      mascot: 'duo',
      quote: '"The squishiest harmony of sweet chew and sour pop!" — Lemmy & Melly'
    }
  },
  {
    id: 'lm-sour-gummies',
    name: 'Sweet × Sour Gummy Drops',
    tagline: 'Miniature fruit slices dusted in tart citric crystal dust',
    category: 'gummies',
    price: 7.50,
    sweetLevel: 3,
    sourLevel: 5,
    isNew: true,
    calories: '120 kcal / pouch (60g)',
    dietary: ['Gelatin-Free (Pectin Based)', 'Vegan', 'Natural Fruit Pigments'],
    shortDesc: 'Chewy fruit bites molded into mini lemons and watermelon wedges with an electric sour sugar coating.',
    longDesc: 'Made with genuine fruit concentrates and plant-based citrus pectin. The mouth-puckering sour coating yields after three seconds to a deeply flavorful, sweet watermelon and honey-lemon interior.',
    ingredients: ['Fruit Juices (Watermelon & Lemon)', 'Apple Pectin', 'Citric Acid', 'Malic Acid', 'Organic Tapioca Syrup'],
    servingSize: '100g resealable eco-jar',
    image: gummiesImg,
    mascotEndorsement: {
      mascot: 'lemmy',
      quote: '"Guaranteed to give you that iconic happy winking face!" — Lemmy'
    }
  },
  {
    id: 'lm-tasting-bundle',
    name: 'The Lemon & Melon Explorer Crate',
    tagline: 'The complete Sweet × Sour experience packed with our signature items & collectibles',
    category: 'bundles',
    price: 28.00,
    sweetLevel: 4,
    sourLevel: 4,
    isBestSeller: true,
    calories: 'Assorted full spread',
    dietary: ['Includes Vegan Options', 'Eco-Insulated Packaging'],
    shortDesc: 'Includes 2 Sparkling Coolers, 1 Sorbet Pint, 1 Mochi 4-pack, 1 Gummy Jar + Holographic Mascot Sticker Sheet.',
    longDesc: 'The ultimate sampler for first-timers and gift givers! Packed in our signature retro yellow-and-red comic cooler crate with biodegradable cold gel packs to arrive frosty and delicious.',
    ingredients: ['Assortment of all fresh kitchen recipes', 'Collectible stickers and comic booklet included'],
    servingSize: 'Feeds 2–4 fruit lovers',
    image: heroImg,
    mascotEndorsement: {
      mascot: 'duo',
      quote: '"Both of us in one giant box of sunshine & chill vibes." — The Duo'
    }
  }
];

export const FLAVOR_PROFILES = [
  {
    id: 'all',
    label: 'All Treats',
    sub: 'Full Kitchen Menu'
  },
  {
    id: 'balanced',
    label: 'Sweet × Sour 50/50',
    sub: 'Perfect Harmony'
  },
  {
    id: 'lemmy-sour',
    label: 'Lemmy’s Sour Hits',
    sub: 'Electric Zest'
  },
  {
    id: 'melly-sweet',
    label: 'Melly’s Sweet Chills',
    sub: 'Refreshing Melon'
  }
];

export const BRAND_STORY = {
  headline: "When Sunshine Meets Cool Shade",
  lead: "How an unapologetically sour lemon and a ridiculously cool watermelon founded a food movement.",
  chapters: [
    {
      title: "The Accidental Recipe",
      desc: "It started at a summer farmers market. Lemmy was squeezing the punchiest organic lemons, and Melly was slicing sugar-baby watermelons on ice. When the two juices splashed together by total coincidence, everyone in line stopped talking and smiled."
    },
    {
      title: "Real Fruit. No Fake Syrups.",
      desc: "We refuse lab-made dyes and artificial tartness powders. Every drink, sorbet, mochi, and gummy starts with fresh fruit delivered before sunrise from partner orchards."
    },
    {
      title: "Daily Fresh Kitchens",
      desc: "Crafted in small batches with compostable boxes and recycled glass. Because great food should be as kind to the earth as it is joyfully addictive to your tastebuds."
    }
  ]
};

export const REVIEWS = [
  {
    name: "Chloe Chen",
    role: "Verified Sweet × Sour Fan",
    item: "Signature Sparkling Cooler",
    rating: 5,
    date: "2 days ago",
    comment: "This drink ruined all other lemonades for me. The watermelon softens the lemon punch just enough to keep you chugging the whole bottle. 10/10."
  },
  {
    name: "Marcus Vance",
    role: "Dessert Enthusiast",
    item: "Twin Swirl Sorbet Cup",
    rating: 5,
    date: "1 week ago",
    comment: "Eating the two flavors together on one spoon is magic. One side wakes up your tongue, the other cools it down. Even the packaging looks awesome."
  },
  {
    name: "Aoi Takahashi",
    role: "Pastry Chef & Customer",
    item: "Handcrafted Fruit Mochi Box",
    rating: 5,
    date: "3 days ago",
    comment: "The mochi skin elasticity is textbook perfection. The zesty lemon cream cuts through the sweet watermelon gelée beautifully. Ordering the 4-pack every weekend now."
  }
];
