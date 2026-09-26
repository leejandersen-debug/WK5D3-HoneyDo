"use client";

import Link from "next/link";
import { Avatar, PriorityChip, statusTone } from "@/app/components/TaskBadges";
import type { Task, TaskStatus } from "@/lib/types";
import styles from "./TaskBoard.module.css";

// Columns, left to right.
const COLUMNS: TaskStatus[] = ["To do", "In progress", "Done"];

export default function TaskBoard({ tasks }: { tasks: Task[] }) {
  return (
    <div className={styles.board}>
      {COLUMNS.map((status) => {
        const columnTasks = tasks.filter((t) => t.Status === status);
        return (
          <section
            key={status}
            className={styles.column}
            data-tone={statusTone(status)}
          >
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
                    <PriorityChip priority={task.Priority} />
                  </header>
                  <div className={styles.footer}>
                    <span className="person">
                      <Avatar name={task.AssignedTo} />
                      {task.AssignedTo}
                    </span>
                    <span className={styles.due}>Due {task.DateDue}</span>
                  </div>
                </article>
              ))
            )}
          </section>
        );
      })}
    </div>
  );
}
