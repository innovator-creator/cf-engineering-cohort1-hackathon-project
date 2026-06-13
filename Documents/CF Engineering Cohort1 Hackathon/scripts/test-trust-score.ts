import { calculateTrustScore } from "@/lib/trust-score/calculate";
import { getScoreBreakdown } from "@/lib/trust-score/breakdown";
import { getVerdict, getVerdictForUnknown } from "@/lib/trust-score/verdict";

function runScenario(
  name: string,
  factors: Parameters<typeof calculateTrustScore>[0],
  options?: { useUnknownVerdict?: boolean; expectedScore?: number; expectedVerdict?: string },
) {
  const score = calculateTrustScore(factors);
  const verdict = options?.useUnknownVerdict
    ? getVerdictForUnknown()
    : getVerdict(score);
  const breakdown = getScoreBreakdown(factors);

  console.log(`\n=== ${name} ===`);
  console.log("Factors:", JSON.stringify(factors));
  console.log("Score:", score);
  console.log("Verdict:", verdict);
  if (options?.expectedScore !== undefined) {
    console.log(
      "Expected score:",
      options.expectedScore,
      score === options.expectedScore ? "✓" : "✗",
    );
  }
  if (options?.expectedVerdict !== undefined) {
    console.log(
      "Expected verdict:",
      options.expectedVerdict,
      verdict === options.expectedVerdict ? "✓" : "✗",
    );
  }
  console.log("Breakdown:");
  for (const factor of breakdown) {
    const sign = factor.points >= 0 ? "+" : "";
    console.log(`  - ${factor.label} (${sign}${factor.points}): ${factor.reason}`);
  }
}

// Scenario 1: Verified safe product → score 90, verdict 'safe'
runScenario(
  "Verified safe product",
  {
    adminVerified: true,
    existsInDb: true,
    validBarcode: true,
    reportCount: 0,
    invalidBatch: false,
    notFoundInSystem: false,
  },
  { expectedScore: 90, expectedVerdict: "safe" },
);

// Scenario 2: Product with 2 reports (in DB, valid barcode, not admin verified)
runScenario("Product with 2 reports", {
  adminVerified: false,
  existsInDb: true,
  validBarcode: true,
  reportCount: 2,
  invalidBatch: false,
  notFoundInSystem: false,
});

// Scenario 3: Product with invalid batch number
runScenario("Product with invalid batch number", {
  adminVerified: false,
  existsInDb: true,
  validBarcode: true,
  reportCount: 0,
  invalidBatch: true,
  notFoundInSystem: false,
});

// Scenario 4: Unknown product (not found in system) → score 0, verdict 'unknown'
runScenario(
  "Unknown product (not found in system)",
  {
    adminVerified: false,
    existsInDb: false,
    validBarcode: false,
    reportCount: 0,
    invalidBatch: false,
    notFoundInSystem: true,
  },
  { useUnknownVerdict: true, expectedScore: 0, expectedVerdict: "unknown" },
);
