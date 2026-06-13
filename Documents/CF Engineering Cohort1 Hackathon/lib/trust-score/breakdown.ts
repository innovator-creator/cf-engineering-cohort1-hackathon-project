import type { TrustScoreFactor } from "@/lib/types/product";
import type { TrustScoreFactors } from "./calculate";

/**
 * Returns a human-readable list of contributing factors that applied (§8 wording).
 */
export function getScoreBreakdown(factors: TrustScoreFactors): TrustScoreFactor[] {
  const breakdown: TrustScoreFactor[] = [];

  if (factors.adminVerified) {
    breakdown.push({
      label: "Verified by admin",
      points: 40,
      reason: "Product has been verified by a MarkSure administrator",
    });
  }

  if (factors.existsInDb) {
    breakdown.push({
      label: "Exists in MarkSure database",
      points: 25,
      reason: "Product record found in the MarkSure database",
    });
  }

  if (factors.validBarcode) {
    breakdown.push({
      label: "Valid QR/barcode format",
      points: 10,
      reason: "Barcode or QR code passes format validation",
    });
  }

  if (factors.reportCount === 0) {
    breakdown.push({
      label: "No reports filed",
      points: 15,
      reason: "No community reports have been submitted for this product",
    });
  } else {
    const reportPenalty = -10 * factors.reportCount;
    breakdown.push({
      label: "User report filed",
      points: reportPenalty,
      reason:
        factors.reportCount === 1
          ? "1 community report has been filed"
          : `${factors.reportCount} community reports have been filed`,
    });
  }

  if (factors.invalidBatch) {
    breakdown.push({
      label: "Invalid/malformed batch number",
      points: -25,
      reason: "Batch number does not match records for this product",
    });
  }

  if (factors.notFoundInSystem) {
    breakdown.push({
      label: "Not found in system (Unknown)",
      points: -40,
      reason: "Product was not found in the MarkSure database",
    });
  }

  return breakdown;
}
