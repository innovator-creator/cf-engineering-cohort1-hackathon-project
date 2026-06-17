import type { Alert } from '@/lib/types/database';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recall':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'counterfeit_warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'general':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSourceLabel = (source: string) => {
    return source === 'openfda' ? 'FDA' : 'Admin';
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(alert.type)}`}>
          {alert.type.replace('_', ' ').toUpperCase()}
        </span>
        <span className="text-xs text-gray-500">
          {getSourceLabel(alert.source)}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{alert.title}</h3>

      <p className="text-sm text-gray-600 whitespace-pre-line mb-3">
        {alert.message}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{new Date(alert.created_at).toLocaleDateString()}</span>
        {alert.source === 'openfda' && alert.external_ref && (
          <a
            href={`https://api.fda.gov/drug/enforcement.json?search=recall_number:"${alert.external_ref}"`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            View FDA Record
          </a>
        )}
      </div>
    </div>
  );
}
