import Link from "next/link";
import React, { Suspense } from "react";
import Loading from "./loading";

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-orange-600 hover:text-orange-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
