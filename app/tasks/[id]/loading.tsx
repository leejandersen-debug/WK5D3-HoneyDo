/** Skeleton for the task detail page, shown while the route streams in. */
export default function Loading() {
  return (
    <main className="task-detail skeleton" aria-busy="true">
      <style>{`
        .skeleton .bar {
          border-radius: 6px;
          background: linear-gradient(
            90deg,
            var(--border) 0%,
            var(--surface) 50%,
            var(--border) 100%
          );
          background-size: 200% 100%;
          animation: skeleton-sweep 1.4s ease-in-out infinite;
        }
        .skeleton .back { width: 7rem; height: 2rem; margin-bottom: 1.25rem; border-radius: 999px; }
        .skeleton .id { width: 5rem; height: 0.8rem; }
        .skeleton .title { width: 70%; height: 2.25rem; margin: 0.5rem 0 0.75rem; }
        .skeleton .chips { margin-bottom: 1.5rem; }
        .skeleton .chip-bar { width: 5.5rem; height: 1.5rem; border-radius: 999px; }
        .skeleton dt.bar { width: 5.5rem; height: 1rem; }
        .skeleton dd.bar { width: 8rem; height: 1rem; }
        .skeleton .line { height: 1rem; margin-bottom: 0.6rem; }
        .skeleton .line:last-child { width: 60%; }
        .skeleton .sr-only {
          position: absolute; width: 1px; height: 1px;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
        }
        @keyframes skeleton-sweep {
          from { background-position: 100% 0; }
          to { background-position: -100% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton .bar { animation: none; }
        }
      `}</style>

      <p role="status" className="sr-only">
        Loading task…
      </p>

      <div aria-hidden="true">
        <div className="bar back" />
        <div className="detail-card">
          <div className="bar id" />
          <div className="bar title" />
          <div className="chips">
            <div className="bar chip-bar" />
            <div className="bar chip-bar" />
          </div>
          <dl>
            {["Assigned to", "Due"].map((label) => (
              <div key={label} style={{ display: "contents" }}>
                <dt className="bar" />
                <dd className="bar" />
              </div>
            ))}
          </dl>
          <div className="bar line" />
          <div className="bar line" />
          <div className="bar line" />
        </div>
      </div>
    </main>
  );
}
