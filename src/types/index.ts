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
