/**
 * TypeScript interfaces matching the Supabase database schema
 */

export interface GovService {
  id: number
  service_name: string
  ministry: string
  requirements: string | null
  official_fee: string | null
  contact_phone: string | null
  contact_email: string | null
  related_links: string | null
  created_at: string
}

export interface Representative {
  id: number
  name: string | null
  title: string | null
  region: string | null
  constituency: string | null
  party: string | null
  office_address: string | null
  phone: string | null
  email: string | null
  created_at: string
}

