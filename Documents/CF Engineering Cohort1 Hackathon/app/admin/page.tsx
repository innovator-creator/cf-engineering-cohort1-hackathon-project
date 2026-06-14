import React from "react";

export default function AdminPage() {
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl">
          Admin Panel
        </h1>
        <p className="mt-4 text-zinc-500">
          Manage product databases, verification lists, and view reported products. (Coming soon)
        </p>
      </div>
    </div>
  );
}
