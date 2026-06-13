import type { ProductCategory } from "@/lib/types/database";

export interface CategoryDisplayConfig {
  label: string;
  icon: string;
}

export const PRODUCT_CATEGORY_CONFIG: Record<ProductCategory, CategoryDisplayConfig> = {
  medicine: {
    label: "Medicine",
    icon: "pill",
  },
  cosmetic: {
    label: "Cosmetic",
    icon: "sparkles",
  },
  food: {
    label: "Food",
    icon: "apple",
  },
};
