import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-6">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500">
          MarkSure LifeScan — Scan. Verify. Stay Safe.
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          &copy; {currentYear} MarkSure LifeScan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
