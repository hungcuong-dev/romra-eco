export type FieldStatus = "available" | "collected" | "burn_risk";

export interface RiceField {
  id: string;
  name: string;
  lat: number;
  lng: number;
  straw_kg: number;
  farmer: string;
  status: FieldStatus;
  images: string[];
  description: string;
  district: string;
  harvestMonth: string;
  linkedProductIds: string[];
}

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  decompose: string;
  size: string;
  weight: string;
  color: string;
  features: string[];
}

export interface Founder {
  name: string;
  role: string;
  education: string;
  quote: string;
  quoteEn: string;
  image: string;
  facebook: string;
}

export interface Achievement {
  title: string;
  description: string;
  excerpt?: string;
  image: string;
  link: string;
  linkText: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  target_amount: number;
  current_amount: number;
  cover_image: string;
  drop_value_vnd: number;
  status: "active" | "completed";
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  campaign_id: string;
  read_time_minutes: number;
  created_at: string;
  url?: string; // external article link
}
