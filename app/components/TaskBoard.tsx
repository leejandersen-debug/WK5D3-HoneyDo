"use client";

import { useEffect, useState } from "react";
import AddTaskForm from "@/app/components/AddTaskForm";
import TaskList from "@/app/components/TaskList";
import type { Task } from "@/lib/types";

/** Owns the task list so the add form and the list share the same state. */
export default function TaskBoard({ intro }: { intro: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

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

  function handleAdded(task: Task) {
    setTasks((current) => [...current, task]);
    setAdding(false);
  }

  return (
    <>
      <section className="hero">
        {intro}
        {adding ? (
          <AddTaskForm onAdded={handleAdded} onCancel={() => setAdding(false)} />
        ) : (
          <button
            type="button"
            className="button-primary"
            onClick={() => setAdding(true)}
          >
            Add a task
          </button>
        )}
      </section>

      <section className="tasks" aria-labelledby="tasks-heading">
        <h2 id="tasks-heading">This week&apos;s tasks</h2>
        {loading ? (
          <p className="tasks-status">Loading tasks…</p>
        ) : error ? (
          <p className="tasks-status tasks-error" role="alert">
            Couldn&apos;t load tasks: {error}
          </p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </section>
    </>
  );
}
