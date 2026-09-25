import Link from "next/link";
import { connection } from "next/server";
import { tasks } from "@/lib/tasks";
import type { Task, TaskStatus } from "@/lib/types";
import styles from "./page.module.css";

const statusClass: Record<TaskStatus, string> = {
  "To do": styles.statusTodo,
  "In progress": styles.statusInProgress,
  Done: styles.statusDone,
};

export default async function TasksPage() {
  // The task list changes at runtime, so render per request instead of
  // prerendering a snapshot at build time.
  await connection();
  // Read the data directly. Server components shouldn't call our own
  // /api routes — that's an extra HTTP request back to the same server.
  const allTasks: Task[] = tasks;

  return (
    <main className={styles.page}>
      <Link href="/" className="back-link">
        &larr; Home
      </Link>
      <h1 className={styles.heading}>All tasks</h1>

      {allTasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet.</p>
      ) : (
        <div className={styles.list}>
          {allTasks.map((task) => (
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
