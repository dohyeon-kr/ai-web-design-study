export type SizeKey = '500g' | '1kg' | '1.5kg';

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  variety: string;
  pricePerKg: number;
  rating: number;
  category: CategoryKey;
  description: string;
  cardSurface: 'citrus' | 'mango' | 'grape';
  imageSrc: string;
  imageAlt: string;
};

export type CategoryKey = 'fruits' | 'vegetables' | 'peppers' | 'roots' | 'herbs';

export type Category = {
  key: CategoryKey;
  label: string;
  emoji: string;
  tone: 'warm' | 'cool' | 'yellow';
};

export const SIZE_MULTIPLIER: Record<SizeKey, number> = {
  '500g': 0.5,
  '1kg': 1,
  '1.5kg': 1.5,
};
