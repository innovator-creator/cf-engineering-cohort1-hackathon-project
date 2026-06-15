import { NextRequest, NextResponse } from 'next/server'
import { searchProductsByName } from '@/lib/db/products'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: 'Query must be at least 2 characters' },
      { status: 400 }
    )
  }

  try {
    const results = await searchProductsByName(q)
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed', details: String(error) },
      { status: 500 }
    )
  }
}