'use client';
import { useState } from 'react';

type BatchResult =
  | { verified: false; match: null; message: string }
  | { verified: true; match: boolean; message: string; scorePenalty: number };

interface BatchVerifyFormProps {
  productId: string;
  hasBatchOnRecord: boolean;
}

export default function BatchVerifyForm({ productId, hasBatchOnRecord }: BatchVerifyFormProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<BatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!hasBatchOnRecord) return null;

  async function handleVerify() {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/verify-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, batch_number: input.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-6 mb-8 bg-white">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Verify Batch Number</h3>
      <p className="text-sm text-gray-500 mb-4">
        Enter the batch number printed on your product packaging to check authenticity.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          placeholder="e.g. BN-2024-001"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleVerify}
          disabled={!input.trim() || loading}
          className="px-5 py-2 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Checking…' : 'Verify'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {result && result.verified && (
        <div className={`p-4 rounded-xl border ${result.match
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="font-bold text-base mb-1">
            {result.match ? '✅ Batch Verified' : '❌ Batch Mismatch'}
          </div>
          <p className="text-sm">{result.message}</p>
          {!result.match && (
            <p className="text-xs mt-2 font-medium opacity-80">
              ⚠️ Trust score penalty applied: {result.scorePenalty} points
            </p>
          )}
        </div>
      )}
    </div>
  );
}
