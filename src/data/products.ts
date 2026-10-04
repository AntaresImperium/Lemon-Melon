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

export interface Review {
  name: string;
  role: string;
  item: string;
  rating: number;
  date: string;
  comment: string;
}

// Official brand logo image from user upload
import logoImg from '../assets/images/official_brand_logo_1791122370922.jpg';
import heroImg from '../assets/images/hero_summer_spread_1790920717023.jpg';

export { logoImg, heroImg };

/**
 * Official products list.
 * Currently empty per brand launch phase.
 * Add items here whenever new foods are added to the menu!
 */
export const PRODUCTS: Product[] = [];

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
      title: "The Lunchtime Spark",
      desc: "It all started one day during lunchtime when Edward spontaneously said the words 'Lemon and Melon.' The catchy rhyme, the irresistible image of zesty sour lemon colliding with chilled sweet watermelon, and the sheer energy of the concept instantly clicked. What began as a fun lunchtime idea quickly turned into a real, exciting business dedicated to creating delicious foods."
    },
    {
      title: "Real Fruit. No Fake Syrups.",
      desc: "We refuse lab-made dyes and artificial tartness powders. Every drink, dessert, and treat will start with honest, real ingredients delivered fresh from partner orchards."
    },
    {
      title: "Daily Fresh Kitchens",
      desc: "Crafted in small batches with compostable boxes and eco-friendly packaging. Because great food should be as kind to the earth as it is joyfully addictive to your tastebuds."
    }
  ]
};

/**
 * Customer tasting notes.
 * Currently empty for initial launch. Reviews will appear here once tasters review official items.
 */
export const REVIEWS: Review[] = [];
