import type { FieldStatus } from "@/types";

export const CDN = "https://pub-861836c4cda7439e918e1357065cdc65.r2.dev";

export const CONTACT = {
  phone: "0934814565",
  phoneName: "Ms. Thanh Ngân",
  email: "romraeco@gmail.com",
  facebook: "https://www.facebook.com/share/19YSmj4Zx1/",
  formspree: "https://formspree.io/f/mldnwnoz",
};

export const MAP_CENTER: [number, number] = [108.2, 16.05];
export const MAP_ZOOM = 10;

export const STATUS_COLORS: Record<FieldStatus, string> = {
  collected: "#4a6b3a",
  available: "#e8c07d",
};

export const STATUS_LABELS: Record<FieldStatus, string> = {
  collected: "Đã thu gom",
  available: "Sẵn sàng",
};

export const STATUS_ICONS: Record<FieldStatus, string> = {
  collected: "🟢",
  available: "🟡",
};
