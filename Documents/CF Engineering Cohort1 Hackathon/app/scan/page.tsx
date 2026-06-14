import React from "react";

export default function ScanPage() {
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
            <path d="M3 5H1v14h2V5zm4 0H5v14h2V5zm6 0h-2v14h2V5zm4 0h-2v14h2V5zm5 0h-2v14h2V5zm-13 0H9v14h2V5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl">
          Scan Barcode
        </h1>
        <p className="mt-4 text-zinc-500">
          Analyze products via barcode scanning or camera upload. (Coming soon)
        </p>
      </div>
    </div>
  );
}
