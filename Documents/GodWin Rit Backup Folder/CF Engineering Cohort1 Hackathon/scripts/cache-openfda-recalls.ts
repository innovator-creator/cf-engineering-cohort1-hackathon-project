import { createClient } from '../lib/supabase/server';

interface FDAEnforcementRecord {
  recall_number: string;
  status: string;
  classification: string;
  product_type: string;
  recalling_firm: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  voluntary_mandatory: string;
  initial_firm_notification: string;
  distribution_pattern: string;
  recall_initiation_date: string;
  report_date: string;
  reason_for_recall: string;
  product_description: string;
  code_info: string;
}

export async function cacheFDARecalls() {
  const supabase = await createClient();

  console.log('Fetching FDA enforcement records...');

  try {
    // Fetch recent FDA drug enforcement records
    const response = await fetch(
      'https://api.fda.gov/drug/enforcement.json?limit=50&sort=report_date:desc'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch FDA data');
    }

    const data = await response.json();
    const records: FDAEnforcementRecord[] = data.results || [];

    console.log(`Found ${records.length} FDA enforcement records`);

    let upserted = 0;

    for (const record of records) {
      // Check if this recall already exists
      const { data: existing } = await supabase
        .from('alerts')
        .select('id')
        .eq('external_ref', record.recall_number)
        .single();

      if (existing) {
        console.log(`Skipping existing recall: ${record.recall_number}`);
        continue;
      }

      // Insert new alert
      const { error } = await supabase.from('alerts').insert({
        title: `${record.recalling_firm} - ${record.product_description.substring(0, 100)}...`,
        message: `Reason: ${record.reason_for_recall}\nProduct: ${record.product_description}\nRecall Date: ${record.recall_initiation_date}`,
        type: 'recall',
        source: 'openfda',
        external_ref: record.recall_number,
      });

      if (error) {
        console.error(`Failed to insert recall ${record.recall_number}:`, error);
      } else {
        upserted++;
        console.log(`Inserted recall: ${record.recall_number}`);
      }
    }

    console.log(`Successfully cached ${upserted} new FDA recalls`);
  } catch (error) {
    console.error('Error caching FDA recalls:', error);
    throw error;
  }
}

// Run if executed directly (tsx compatible)
const isMainModule = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));
if (isMainModule) {
  cacheFDARecalls()
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
