import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@/lib/supabase/server";
import { calculateTrustScore } from "@/lib/trust-score/calculate";
import type { TrustScoreFactors } from "@/lib/trust-score/calculate";
import type { ProductCategory, ProductStatus } from "@/lib/types/database";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

interface SeedProduct {
  name: string;
  category: ProductCategory;
  manufacturer: string;
  manufacturer_verified: boolean;
  country_of_origin: string;
  batch_number?: string;
  expiry_date?: string;
  barcode: string;
  status: ProductStatus;
  verified_by_authority: boolean;
  factors: TrustScoreFactors;
}

const SEED_PRODUCTS: SeedProduct[] = [
  // verified_safe (4)
  {
    name: "Panadol Extra",
    category: "medicine",
    manufacturer: "GSK",
    manufacturer_verified: true,
    country_of_origin: "United Kingdom",
    batch_number: "BN-2024-7731",
    expiry_date: "2026-08-31",
    barcode: "5000123456789",
    status: "verified_safe",
    verified_by_authority: true,
    factors: {
      adminVerified: true,
      existsInDb: true,
      validBarcode: true,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  {
    name: "Nivea Soft Cream",
    category: "cosmetic",
    manufacturer: "Beiersdorf",
    manufacturer_verified: true,
    country_of_origin: "Germany",
    batch_number: "BN-2024-5521",
    expiry_date: "2027-03-15",
    barcode: "4224705111111",
    status: "verified_safe",
    verified_by_authority: true,
    factors: {
      adminVerified: true,
      existsInDb: true,
      validBarcode: true,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  {
    name: "Vaseline Petroleum Jelly",
    category: "cosmetic",
    manufacturer: "Unilever",
    manufacturer_verified: true,
    country_of_origin: "United States",
    batch_number: "BN-2024-6610",
    expiry_date: "2028-01-01",
    barcode: "8712561734567",
    status: "verified_safe",
    verified_by_authority: true,
    factors: {
      adminVerified: true,
      existsInDb: true,
      validBarcode: true,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  {
    name: "Indomie Chicken Noodles",
    category: "food",
    manufacturer: "Indofood",
    manufacturer_verified: true,
    country_of_origin: "Indonesia",
    batch_number: "BN-2024-3301",
    expiry_date: "2025-12-31",
    barcode: "8998866101234",
    status: "verified_safe",
    verified_by_authority: true,
    factors: {
      adminVerified: true,
      existsInDb: true,
      validBarcode: true,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  // under_review (4)
  {
    name: "Benylin Dry Cough Syrup",
    category: "medicine",
    manufacturer: "Johnson & Johnson",
    manufacturer_verified: false,
    country_of_origin: "Canada",
    batch_number: "BN-2024-6612",
    expiry_date: "2026-05-30",
    barcode: "5059995001234",
    status: "under_review",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 1,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  {
    name: "Amoxicillin 500mg Capsules",
    category: "medicine",
    manufacturer: "Sandoz",
    manufacturer_verified: false,
    country_of_origin: "India",
    batch_number: "BN-2024-9934",
    expiry_date: "2026-11-30",
    barcode: "8901234567890",
    status: "under_review",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 2,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  {
    name: "Olay Regenerist Micro-Sculpting Cream",
    category: "cosmetic",
    manufacturer: "Procter & Gamble",
    manufacturer_verified: false,
    country_of_origin: "United States",
    batch_number: "BN-2024-8845",
    expiry_date: "2027-06-01",
    barcode: "0370006251234",
    status: "under_review",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 1,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  {
    name: "Peak Milk Powder",
    category: "food",
    manufacturer: "FrieslandCampina",
    manufacturer_verified: false,
    country_of_origin: "Netherlands",
    batch_number: "BN-2024-2219",
    expiry_date: "2026-02-28",
    barcode: "8710400123456",
    status: "under_review",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 2,
      invalidBatch: false,
      notFoundInSystem: false,
    },
  },
  // suspected_counterfeit (4)
  {
    name: "Coartem Dispersible (Suspect)",
    category: "medicine",
    manufacturer: "Unknown",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    batch_number: "BN-FAKE-0099",
    expiry_date: "2025-01-01",
    barcode: "6291000000001",
    status: "suspected_counterfeit",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 3,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  {
    name: "GlowMax Whitening Cream",
    category: "cosmetic",
    manufacturer: "Unlicensed Vendor",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    batch_number: "BN-X2024-0001",
    barcode: "6292000000002",
    status: "suspected_counterfeit",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 4,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  {
    name: "Fake Bournvita Jar",
    category: "food",
    manufacturer: "Counterfeit Works Ltd",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    batch_number: "BN-CF-8821",
    barcode: "6293000000003",
    status: "suspected_counterfeit",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 3,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  {
    name: "Counterfeit Indomie Pack",
    category: "food",
    manufacturer: "Unknown",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    batch_number: "BN-CF-4402",
    barcode: "6294000000004",
    status: "suspected_counterfeit",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: false,
      reportCount: 2,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  // recalled (4)
  {
    name: "Tylenol Extra Strength 500mg",
    category: "medicine",
    manufacturer: "Johnson & Johnson",
    manufacturer_verified: true,
    country_of_origin: "United States",
    batch_number: "BN-2023-4401",
    expiry_date: "2025-06-30",
    barcode: "3004504811234",
    status: "recalled",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 2,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  {
    name: "Old Spice Swagger Deodorant",
    category: "cosmetic",
    manufacturer: "Procter & Gamble",
    manufacturer_verified: true,
    country_of_origin: "United States",
    batch_number: "BN-2023-1190",
    expiry_date: "2025-09-01",
    barcode: "0120440145678",
    status: "recalled",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 3,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  {
    name: "Maggi Chicken Flavor Cubes",
    category: "food",
    manufacturer: "Nestlé",
    manufacturer_verified: true,
    country_of_origin: "Nigeria",
    batch_number: "BN-2023-5567",
    expiry_date: "2024-12-31",
    barcode: "0612808001234",
    status: "recalled",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 2,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  {
    name: "Nestlé Cerelac Wheat",
    category: "food",
    manufacturer: "Nestlé",
    manufacturer_verified: true,
    country_of_origin: "South Africa",
    batch_number: "BN-2023-7788",
    expiry_date: "2024-08-15",
    barcode: "6001068271234",
    status: "recalled",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: true,
      validBarcode: true,
      reportCount: 4,
      invalidBatch: true,
      notFoundInSystem: false,
    },
  },
  // unknown (4)
  {
    name: "Unregistered Herbal Tonic",
    category: "medicine",
    manufacturer: "Unknown",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    barcode: "0000000000001",
    status: "unknown",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: false,
      validBarcode: false,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: true,
    },
  },
  {
    name: "Unlabeled Lip Gloss",
    category: "cosmetic",
    manufacturer: "Unknown",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    barcode: "0000000000002",
    status: "unknown",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: false,
      validBarcode: false,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: true,
    },
  },
  {
    name: "Generic Instant Coffee Sachets",
    category: "food",
    manufacturer: "Unknown",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    barcode: "0000000000003",
    status: "unknown",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: false,
      validBarcode: false,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: true,
    },
  },
  {
    name: "Mystery Snack Mix",
    category: "food",
    manufacturer: "Unknown",
    manufacturer_verified: false,
    country_of_origin: "Unknown",
    barcode: "0000000000004",
    status: "unknown",
    verified_by_authority: false,
    factors: {
      adminVerified: false,
      existsInDb: false,
      validBarcode: false,
      reportCount: 0,
      invalidBatch: false,
      notFoundInSystem: true,
    },
  },
];

async function verifyCounts(
  supabase: ReturnType<typeof createClient>,
) {
  const { data, error } = await supabase
    .from("products")
    .select("status, category")
    .eq("source", "marksure");

  if (error) {
    console.error("Verification query failed:", error.message);
    return;
  }

  const byStatus: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byStatusCategory: Record<string, number> = {};

  for (const row of data ?? []) {
    byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
    byCategory[row.category] = (byCategory[row.category] ?? 0) + 1;
    const key = `${row.status} / ${row.category}`;
    byStatusCategory[key] = (byStatusCategory[key] ?? 0) + 1;
  }

  console.log("\n--- Verification: products by status ---");
  for (const [status, count] of Object.entries(byStatus).sort()) {
    console.log(`  ${status}: ${count}`);
  }

  console.log("\n--- Verification: products by category ---");
  for (const [category, count] of Object.entries(byCategory).sort()) {
    console.log(`  ${category}: ${count}`);
  }

  console.log("\n--- Verification: products by status + category ---");
  for (const [key, count] of Object.entries(byStatusCategory).sort()) {
    console.log(`  ${key}: ${count}`);
  }

  console.log(`\nTotal marksure products: ${data?.length ?? 0}`);
}

async function main() {
  loadEnvLocal();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
    process.exit(1);
  }

  const supabase = createClient();
  console.log(`Seeding ${SEED_PRODUCTS.length} products...\n`);

  for (const product of SEED_PRODUCTS) {
    const trust_score = calculateTrustScore(product.factors);
    const { batch_number, expiry_date, factors: _factors, ...rest } = product;

    const { data, error } = await supabase
      .from("products")
      .insert({
        ...rest,
        batch_number: batch_number ?? null,
        expiry_date: expiry_date ?? null,
        trust_score,
        source: "marksure",
      })
      .select("id, name")
      .single();

    if (error) {
      console.error(`FAILED  ${product.name}: ${error.message}`);
    } else {
      console.log(`INSERTED  ${data.name}  →  ${data.id}  (trust_score: ${trust_score})`);
    }
  }

  await verifyCounts(supabase);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
