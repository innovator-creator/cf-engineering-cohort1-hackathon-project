'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReportFormProps {
  productId?: string;
  productName?: string;
}

export default function ReportForm({ productId, productName }: ReportFormProps) {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      if (productId) formData.append('product_id', productId);
      formData.append('description', description);
      formData.append('anonymous', anonymous.toString());
      if (image) formData.append('image', image);

      const response = await fetch('/api/submit-report', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit report');
      }

      setSubmitted(true);
      
      // Redirect to product page after 2 seconds if we have a product_id
      if (productId) {
        setTimeout(() => {
          router.push(`/product/${productId}`);
        }, 2000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Report Submitted Successfully
        </h3>
        <p className="text-green-700">
          Thank you for helping keep our community safe.
          {productId && ' Redirecting to product page...'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {productId && productName && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-800">
            <strong>Reporting:</strong> {productName}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description of Issue *
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Describe the issue you encountered with this product..."
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image (Optional)
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Upload a photo of the product, packaging, or issue
        </p>
      </div>

      <div className="flex items-center">
        <input
          id="anonymous"
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
        />
        <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
          Submit anonymously
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
}
