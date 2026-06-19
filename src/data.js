import {
  BadgeCheck,
  CheckCircle2,
  Gem,
  HeartHandshake,
  PackageCheck,
  Plane,
  ScrollText,
  ShieldCheck,
  Sparkles,
  WalletCards
} from 'lucide-react';

export const productIconMap = {
  comfort: HeartHandshake,
  general: Sparkles,
  health: ShieldCheck,
  men: ScrollText,
  travel: WalletCards,
  women: HeartHandshake,
  vip: Gem
};

export function getProductIcon(product) {
  if (product.vip) return productIconMap.vip;
  return productIconMap[product.category] || BadgeCheck;
}

export const featureItems = [
  { id: 'quality', icon: Gem },
  { id: 'approved', icon: CheckCircle2 },
  { id: 'delivery', icon: Plane },
  { id: 'packaging', icon: PackageCheck },
  { id: 'trusted', icon: HeartHandshake }
];
