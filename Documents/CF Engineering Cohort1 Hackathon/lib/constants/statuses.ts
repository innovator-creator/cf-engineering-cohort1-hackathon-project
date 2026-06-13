import type { ProductStatus } from "@/lib/types/database";
import type { TrustVerdict } from "@/lib/types/product";

export interface StatusDisplayConfig {
  label: string;
  description: string;
  colorClass: string;
}

/** §7.1 product status categories — badge labels, descriptions, and Tailwind colors. */
export const PRODUCT_STATUS_CONFIG: Record<ProductStatus, StatusDisplayConfig> = {
  verified_safe: {
    label: "Verified Safe",
    description: "Exists in DB, admin-approved, no negative reports",
    colorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  under_review: {
    label: "Under Review",
    description: "Some reports exist, not confirmed fake",
    colorClass: "bg-amber-100 text-amber-800 border-amber-200",
  },
  suspected_counterfeit: {
    label: "Suspected Counterfeit",
    description: "Multiple reports, invalid batch, or flagged",
    colorClass: "bg-red-100 text-red-800 border-red-200",
  },
  recalled: {
    label: "Recalled Product",
    description: "Officially flagged by admin or regulatory recall data",
    colorClass: "bg-red-200 text-red-900 border-red-300",
  },
  unknown: {
    label: "Unknown Product",
    description: "Not found in MarkSure DB; may have external data",
    colorClass: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export interface VerdictDisplayConfig extends StatusDisplayConfig {
  minScore: number | null;
  maxScore: number | null;
}

/** §8 trust score verdict bands — score ranges, labels, and Tailwind colors. */
export const TRUST_VERDICT_CONFIG: Record<TrustVerdict, VerdictDisplayConfig> = {
  safe: {
    label: "Safe",
    description: "Score 80–100 — product meets trust thresholds",
    colorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    minScore: 80,
    maxScore: 100,
  },
  warning: {
    label: "Warning",
    description: "Score 40–79 — exercise caution before use",
    colorClass: "bg-amber-100 text-amber-800 border-amber-200",
    minScore: 40,
    maxScore: 79,
  },
  dangerous: {
    label: "Dangerous",
    description: "Score 0–39 — high risk; avoid use",
    colorClass: "bg-red-100 text-red-800 border-red-200",
    minScore: 0,
    maxScore: 39,
  },
  unknown: {
    label: "Unknown",
    description: "No sufficient data to compute a trust score",
    colorClass: "bg-slate-100 text-slate-700 border-slate-200",
    minScore: null,
    maxScore: null,
  },
};
