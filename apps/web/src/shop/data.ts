import type { Category, Product } from './types';

const asset = (path: string): string => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const CATEGORIES: Category[] = [
  { key: 'fruits', label: 'Fruits', emoji: '🍓', tone: 'warm' },
  { key: 'vegetables', label: 'Vegetables', emoji: '🥦', tone: 'cool' },
  { key: 'peppers', label: 'Peppers', emoji: '🫑', tone: 'yellow' },
  { key: 'roots', label: 'Roots', emoji: '🥕', tone: 'warm' },
  { key: 'herbs', label: 'Herbs', emoji: '🌿', tone: 'cool' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'navel-orange',
    name: 'Orange',
    subtitle: 'Navel Orange',
    variety: '1.5Kgs at Rs.100 Only',
    pricePerKg: 60,
    rating: 4.5,
    category: 'fruits',
    description:
      'Considered to be the most aromatic in the orange family — bright, tart, with a long sweet finish.',
    cardSurface: 'citrus',
    imageSrc: asset('fruit/orange.png'),
    imageAlt: 'A bright navel orange with a single green leaf',
  },
  {
    id: 'banganpalli-mango',
    name: 'Mango',
    subtitle: 'Banganpalli',
    variety: '1.5Kgs at Rs.180 Only',
    pricePerKg: 110,
    rating: 4.7,
    category: 'fruits',
    description:
      'Honey-sweet, fiberless flesh from the orchards of Andhra — the queen of summer table mangoes.',
    cardSurface: 'mango',
    imageSrc: asset('fruit/mango.png'),
    imageAlt: 'A whole Banganpalli mango with a sliced cheek',
  },
  {
    id: 'concord-grapes',
    name: 'Grapes',
    subtitle: 'Concord',
    variety: '500g at Rs.90 Only',
    pricePerKg: 180,
    rating: 4.6,
    category: 'fruits',
    description:
      'Deep-purple, slip-skin grapes with a rich musky aroma — perfect for snacking or fresh juice.',
    cardSurface: 'grape',
    imageSrc: asset('fruit/grapes.png'),
    imageAlt: 'A bunch of deep purple Concord grapes with a leaf',
  },
];

export const findProduct = (id: string): Product | undefined => PRODUCTS.find((p) => p.id === id);
