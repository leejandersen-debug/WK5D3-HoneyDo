"use client"; // Error boundaries must be client components.

import { useEffect } from "react";
import Link from "next/link";

/** Fallback for the task detail page when rendering it throws. */
export default function TaskError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="task-detail task-error">
      <style>{`
        .task-error .label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--error);
        }
        .task-error .message {
          margin-bottom: 1.5rem;
          padding: 1rem 1.25rem;
          color: var(--muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 4px solid var(--error);
          border-radius: 6px;
        }
        .task-error .digest {
          display: block;
          margin-top: 0.5rem;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.8rem;
        }
      `}</style>

      <Link href="/tasks" className="back-link">
        &larr; All tasks
      </Link>
      <article className="detail-card" data-tone="berry" role="alert">
        <p className="label">Something went wrong</p>
        <h1>We couldn&apos;t load this task.</h1>
        <p className="message">
          {error.message || "An unexpected error occurred."}
          {error.digest && (
            <span className="digest">Reference: {error.digest}</span>
          )}
        </p>
        <button type="button" className="button-primary" onClick={retry}>
          Try again
        </button>
      </article>
    </main>
  );
}
