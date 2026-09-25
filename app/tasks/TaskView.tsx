"use client";

import Link from "next/link";
import type { Task, TaskStatus } from "@/lib/types";
import styles from "./page.module.css";

const statusClass: Record<TaskStatus, string> = {
  "To do": styles.statusTodo,
  "In progress": styles.statusInProgress,
  Done: styles.statusDone,
};

export default function TaskView({ tasks }: { tasks: Task[] }) {
  return (
    <main className={styles.page}>
      <Link href="/" className="back-link">
        &larr; Home
      </Link>
      <h1 className={styles.heading}>All tasks</h1>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet.</p>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <article key={task.ID} className={styles.card}>
              <header className={styles.cardHeader}>
                <h2 className={styles.title}>
                  <Link href={`/tasks/${task.ID}`}>{task.TaskTitle}</Link>
                </h2>
                <span className={`${styles.badge} ${statusClass[task.Status]}`}>
                  {task.Status}
                </span>
              </header>
              <dl className={styles.details}>
                <dt>Priority</dt>
                <dd>{task.Priority}</dd>
                <dt>Assigned to</dt>
                <dd>{task.AssignedTo}</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
