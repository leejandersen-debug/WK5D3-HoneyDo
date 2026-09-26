"use client";

import { useEffect, useState } from "react";
import AddTaskForm from "@/app/components/AddTaskForm";
import AssigneeFilter from "@/app/components/AssigneeFilter";
import TaskList from "@/app/components/TaskList";
import type { Task } from "@/lib/types";

/** Owns the task list so the add form and the list share the same state. */
export default function TaskBoard({
  intro,
  assignees,
  priorities,
}: {
  intro: React.ReactNode;
  assignees: string[];
  priorities: string[];
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  // Empty means everyone.
  const [shownAssignees, setShownAssignees] = useState<string[]>([]);
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

  const visible =
    shownAssignees.length === 0
      ? tasks
      : tasks.filter((t) => shownAssignees.includes(t.AssignedTo));

  function handleAdded(task: Task) {
    setTasks((current) => [...current, task]);
    setAdding(false);
  }

  return (
    <>
      <section className="hero">
        {intro}
        <div className="hero-actions">
          {!adding && (
            <button
              type="button"
              className="button-primary"
              onClick={() => setAdding(true)}
            >
              <span aria-hidden="true">+</span> Add a task
            </button>
          )}
          <AssigneeFilter
            options={assignees}
            selected={shownAssignees}
            onChange={setShownAssignees}
          />
        </div>
        {adding && (
          <AddTaskForm
            assignees={assignees}
            priorities={priorities}
            onAdded={handleAdded}
            onCancel={() => setAdding(false)}
          />
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
        ) : tasks.length === 0 ? (
          <p className="tasks-status">
            No tasks yet. Use &ldquo;Add a task&rdquo; above to get started.
          </p>
        ) : visible.length === 0 ? (
          <p className="tasks-status">
            No tasks assigned to {shownAssignees.join(" or ")}.
          </p>
        ) : (
          <TaskList tasks={visible} assignees={assignees} />
        )}
      </section>
    </>
  );
}
