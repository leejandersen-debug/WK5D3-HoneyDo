"use client";

import { useEffect, useState } from "react";
import { ASSIGNEES } from "@/lib/tasks";
import type { Task } from "@/lib/types";

export default function TaskList() {
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

  if (loading) {
    return <p className="tasks-status">Loading tasks…</p>;
  }

  if (error) {
    return (
      <p className="tasks-status tasks-error" role="alert">
        Couldn&apos;t load tasks: {error}
      </p>
    );
  }

  return (
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
  );
}
