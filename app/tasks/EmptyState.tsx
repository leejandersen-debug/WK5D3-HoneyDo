"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AddTaskForm from "@/app/components/AddTaskForm";
import Logo from "@/app/components/Logo";
import styles from "./page.module.css";

/** Shown instead of the list when there are no tasks at all. */
export default function EmptyState({
  assignees,
  priorities,
}: {
  assignees: string[];
  priorities: string[];
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  return (
    <section className={styles.emptyState} aria-labelledby="empty-heading">
      <Logo size={88} />
      <h2 id="empty-heading">No tasks yet</h2>
      <p>
        Add your first chore, errand, or appointment and everyone can see
        who&apos;s on it.
      </p>
      {adding ? (
        <AddTaskForm
          assignees={assignees}
          priorities={priorities}
          onAdded={() => {
            setAdding(false);
            // Re-render the server page so the new task replaces this state.
            router.refresh();
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          type="button"
          className="button-primary"
          onClick={() => setAdding(true)}
        >
          <span aria-hidden="true">+</span> Add your first task
        </button>
      )}
    </section>
  );
}
