"use client";

import { useState } from "react";
import { DESCRIPTION_MAX, TITLE_MAX } from "@/lib/tasks";
import type { Task } from "@/lib/types";

interface Props {
  assignees: string[];
  /** Highest first. */
  priorities: string[];
  onAdded: (task: Task) => void;
  onCancel: () => void;
}

/** Converts the yyyy-mm-dd value of a date input to mm/dd/yyyy. */
function toDisplayDate(isoDate: string): string {
  const [yyyy, mm, dd] = isoDate.split("-");
  return `${mm}/${dd}/${yyyy}`;
}

/** "Medium" if it exists, otherwise the middle priority. Mirrors lib/settings. */
function defaultPriority(priorities: string[]): string {
  return priorities.includes("Medium")
    ? "Medium"
    : priorities[Math.floor((priorities.length - 1) / 2)];
}

export default function AddTaskForm({
  assignees,
  priorities,
  onAdded,
  onCancel,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TaskTitle: data.get("title"),
          AssignedTo: data.get("assignee"),
          DateDue: toDisplayDate(String(data.get("due"))),
          Priority: data.get("priority"),
          Description: data.get("description"),
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error ?? `Request failed: ${res.status}`);
      }
      form.reset();
      onAdded(body as Task);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input name="title" required maxLength={TITLE_MAX} autoFocus />
      </label>
      <div className="add-task-row">
        <label>
          Assigned to
          <select name="assignee" required defaultValue={assignees[0]}>
            {assignees.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select
            name="priority"
            required
            defaultValue={defaultPriority(priorities)}
          >
            {priorities.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Due
          <input name="due" type="date" required />
        </label>
      </div>
      <label>
        Description
        <textarea name="description" rows={3} maxLength={DESCRIPTION_MAX} />
      </label>

      {error && (
        <p className="tasks-error" role="alert">
          {error}
        </p>
      )}

      <div className="add-task-actions">
        <button type="button" className="button-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? "Saving…" : "Save task"}
        </button>
      </div>
    </form>
  );
}
