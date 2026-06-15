import { createClient } from '@/lib/supabase/server'

export async function searchProductsByName(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, status, trust_score, image_url, manufacturer, source')
    .or(`name.ilike.%${query}%,manufacturer.ilike.%${query}%`)
    .order('trust_score', { ascending: false })
    .limit(10)

  if (error) throw new Error(error.message)
  return data
}

export async function getProductById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}