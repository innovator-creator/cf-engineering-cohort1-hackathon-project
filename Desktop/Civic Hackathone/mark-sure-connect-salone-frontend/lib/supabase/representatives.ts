import { supabase } from "./client"
import type { Representative } from "./types"

/**
 * Fetches all representatives from Supabase
 * Ordered by name
 */
export async function fetchRepresentatives(): Promise<Representative[]> {
  try {
    const { data, error } = await supabase
      .from("representatives")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching representatives:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      throw new Error(`Failed to fetch representatives: ${error.message}`)
    }

    if (!data) {
      console.warn("No data returned from representatives table")
      return []
    }

    return data as Representative[]
  } catch (error) {
    console.error("Unexpected error in fetchRepresentatives:", error)
    throw error
  }
}

