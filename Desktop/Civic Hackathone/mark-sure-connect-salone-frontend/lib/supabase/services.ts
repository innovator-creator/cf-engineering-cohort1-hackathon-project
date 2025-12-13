import { supabase } from "./client"
import type { GovService } from "./types"

/**
 * Fetches all government services from Supabase
 * Ordered by service_name
 */
export async function fetchGovServices(): Promise<GovService[]> {
  try {
    const { data, error } = await supabase
      .from("gov_services")
      .select("*")
      .order("service_name", { ascending: true })

    if (error) {
      console.error("Error fetching government services:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      throw new Error(`Failed to fetch government services: ${error.message}`)
    }

    if (!data) {
      console.warn("No data returned from gov_services table")
      return []
    }

    return data as GovService[]
  } catch (error) {
    console.error("Unexpected error in fetchGovServices:", error)
    throw error
  }
}

