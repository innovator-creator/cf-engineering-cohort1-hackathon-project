'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  name: string
  category: string
  status: string
  trust_score: number
  manufacturer: string
  source: string
}

const STATUS_COLORS: Record<string, string> = {
  verified_safe: 'bg-green-100 text-green-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  suspected_counterfeit: 'bg-red-100 text-red-800',
  recalled: 'bg-red-200 text-red-900',
  unknown: 'bg-gray-100 text-gray-800',
}

const STATUS_LABELS: Record<string, string> = {
  verified_safe: '✅ Verified Safe',
  under_review: '⚠️ Under Review',
  suspected_counterfeit: '❌ Suspected Counterfeit',
  recalled: '🚫 Recalled',
  unknown: '❓ Unknown',
}

export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    if (query.length < 2) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search-product?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(Array.isArray(data) ? data : [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by product name or manufacturer..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading || query.length < 2}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searched && !loading && results.length === 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
          No products found for &quot;{query}&quot;.{' '}
          <a href="/report" className="text-green-600 underline">Report this product</a>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-3">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.manufacturer} · {product.category}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[product.status]}`}>
                    {STATUS_LABELS[product.status]}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">Score: {product.trust_score}/100</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}