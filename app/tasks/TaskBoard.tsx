"use client";

import Link from "next/link";
import type { Task, TaskStatus } from "@/lib/types";
import styles from "./TaskBoard.module.css";

// Columns, left to right.
const COLUMNS: TaskStatus[] = ["To do", "In progress", "Done"];

const statusClass: Record<TaskStatus, string> = {
  "To do": styles.statusTodo,
  "In progress": styles.statusInProgress,
  Done: styles.statusDone,
};

export default function TaskBoard({ tasks }: { tasks: Task[] }) {
  return (
    <div className={styles.board}>
      {COLUMNS.map((status) => {
        const columnTasks = tasks.filter((t) => t.Status === status);
        return (
          <section key={status} className={styles.column}>
            <h2 className={styles.columnHeading}>
              {status} <span>{columnTasks.length}</span>
            </h2>
            {columnTasks.length === 0 ? (
              <p className={styles.empty}>Nothing here.</p>
            ) : (
              columnTasks.map((task) => (
                <article key={task.ID} className={styles.card}>
                  <header className={styles.cardHeader}>
                    <h3 className={styles.title}>
                      <Link href={`/tasks/${task.ID}`} prefetch={false}>
                        {task.TaskTitle}
                      </Link>
                    </h3>
                    <span
                      className={`${styles.badge} ${statusClass[task.Status]}`}
                    >
                      {task.Status}
                    </span>
                  </header>
                  <dl className={styles.details}>
                    <dt>Priority</dt>
                    <dd>{task.Priority}</dd>
                    <dt>Due</dt>
                    <dd>{task.DateDue}</dd>
                    <dt>Assigned to</dt>
                    <dd>{task.AssignedTo}</dd>
                  </dl>
                </article>
              ))
            )}
          </section>
        );
      })}
    </div>
  );
}
