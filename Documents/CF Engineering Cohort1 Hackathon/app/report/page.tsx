import React from "react";

export default function ReportPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <div className="max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl">
          Report a Product
        </h1>
        <p className="mt-4 text-zinc-500">
          Submit information on suspected counterfeit or hazardous products. (Coming soon)
        </p>
      </div>
    </div>
  );
}
