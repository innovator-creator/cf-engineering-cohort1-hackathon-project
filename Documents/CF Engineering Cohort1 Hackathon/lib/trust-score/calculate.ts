/** Input flags and counts for deterministic trust score calculation (§8). */
export interface TrustScoreFactors {
  adminVerified: boolean;
  existsInDb: boolean;
  validBarcode: boolean;
  reportCount: number;
  invalidBatch: boolean;
  notFoundInSystem: boolean;
}

const POINTS = {
  adminVerified: 40,
  existsInDb: 25,
  validBarcode: 10,
  noReports: 15,
  perReport: -10,
  invalidBatch: -25,
  notFoundInSystem: -40,
} as const;

function clampScore(score: number): number {
  return Math.min(100, Math.max(0, score));
}

/**
 * Computes a trust score (0–100) from product verification flags and report counts.
 * Pure function — no database access.
 */
export function calculateTrustScore(factors: TrustScoreFactors): number {
  let score = 0;

  if (factors.adminVerified) {
    score += POINTS.adminVerified;
  }
  if (factors.existsInDb) {
    score += POINTS.existsInDb;
  }
  if (factors.validBarcode) {
    score += POINTS.validBarcode;
  }
  if (factors.reportCount === 0) {
    score += POINTS.noReports;
  } else {
    score += POINTS.perReport * factors.reportCount;
  }
  if (factors.invalidBatch) {
    score += POINTS.invalidBatch;
  }
  if (factors.notFoundInSystem) {
    score += POINTS.notFoundInSystem;
  }

  return clampScore(score);
}
