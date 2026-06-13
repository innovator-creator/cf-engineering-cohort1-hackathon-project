import type { Product, TrustScoreHistory } from "./database";

/** Trust score verdict bands from §8 (Safe / Warning / Dangerous / Unknown). */
export type TrustVerdict = "safe" | "warning" | "dangerous" | "unknown";

/** A single contributing factor in a trust score breakdown. */
export interface TrustScoreFactor {
  label: string;
  points: number;
  reason: string;
}

/** Product enriched with computed trust score verdict and factor breakdown. */
export interface ProductWithBreakdown extends Product {
  verdict: TrustVerdict;
  breakdown: TrustScoreFactor[];
  history?: TrustScoreHistory[];
}

/** Lookup/API response wrapping a product with trust score details. */
export interface ProductLookupResult {
  found: boolean;
  product?: ProductWithBreakdown;
  source?: Product["source"];
}
