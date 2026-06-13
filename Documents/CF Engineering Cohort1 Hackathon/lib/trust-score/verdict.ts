import type { TrustVerdict } from "@/lib/types/product";

/**
 * Maps a numeric trust score to a verdict band (§8).
 * Does not handle the "Unknown" / no-data case — use getVerdictForUnknown() instead.
 */
export function getVerdict(score: number): TrustVerdict {
  if (score >= 80) {
    return "safe";
  }
  if (score >= 40) {
    return "warning";
  }
  return "dangerous";
}

/** Returns the verdict when insufficient data exists to compute a meaningful score (§8). */
export function getVerdictForUnknown(): TrustVerdict {
  return "unknown";
}
