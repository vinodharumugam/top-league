export interface TierInfo {
  name: string;
  price: number;
  priceLabel: string;
  emoji: string;
  color: string;
  minRating: number;
  maxRating: number;
}

export const TIERS: TierInfo[] = [
  {
    name: 'Star',
    price: 5000000,
    priceLabel: '$5M',
    emoji: '⭐',
    color: '#FFD700',
    minRating: 88,
    maxRating: 99,
  },
  {
    name: 'Great',
    price: 3000000,
    priceLabel: '$3M',
    emoji: '🔥',
    color: '#FF6D00',
    minRating: 83,
    maxRating: 87,
  },
  {
    name: 'Good',
    price: 1500000,
    priceLabel: '$1.5M',
    emoji: '💪',
    color: '#4CAF50',
    minRating: 78,
    maxRating: 82,
  },
  {
    name: 'Rising',
    price: 750000,
    priceLabel: '$750K',
    emoji: '🌱',
    color: '#00BCD4',
    minRating: 70,
    maxRating: 77,
  },
];

export const TOTAL_BUDGET = 999999999;
export const SQUAD_SIZE = 11;

export function getTierByName(name: string): TierInfo | undefined {
  return TIERS.find((t) => t.name === name);
}

export function formatMoney(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}
