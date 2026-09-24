"use client";

import { useEffect, useState } from "react";
import { ASSIGNEES } from "@/lib/tasks";
import type { Task } from "@/lib/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ignore a response that lands after this component has unmounted.
    let ignore = false;

    async function loadTasks() {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }
        const data: Task[] = await res.json();
        if (!ignore) setTasks(data);
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadTasks();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <span className="brand">HoneyDo</span>
        <span className="tagline">HoneyDo List for what HoneyDoes.</span>
      </header>

      <main>
        <section className="hero">
          <h1>Get the household to-do list done.</h1>
          <p className="subhead">
            Track every chore, errand, and appointment in one place and see
            who&apos;s on it at a glance.
          </p>
          <button type="button" className="button-primary">
            Add a task
          </button>
        </section>

        <section className="tasks" aria-labelledby="tasks-heading">
          <h2 id="tasks-heading">This week&apos;s tasks</h2>
          {loading && <p className="tasks-status">Loading tasks…</p>}
          {error && (
            <p className="tasks-status tasks-error" role="alert">
              Couldn&apos;t load tasks: {error}
            </p>
          )}
          {!loading && !error && (
            <ul className="task-grid">
              {tasks.map((task) => (
                <li key={task.ID} className="task-card">
                  <div className="task-meta">
                    <span className="task-id">{task.ID}</span>
                    <span className="task-due">Due {task.DateDue}</span>
                  </div>
                  <h3 className="task-title">{task.TaskTitle}</h3>
                  <p className="task-description">{task.Description}</p>
                  <label className="task-assignee">
                    Assigned to
                    <select defaultValue={task.AssignedTo}>
                      {ASSIGNEES.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 HoneyDo. All rights reserved.</p>
      </footer>
    </>
  );
}
