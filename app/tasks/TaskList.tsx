"use client";

import Link from "next/link";
import type { Task, TaskStatus } from "@/lib/types";
import styles from "./TaskList.module.css";

const dotClass: Record<TaskStatus, string> = {
  "To do": styles.dotTodo,
  "In progress": styles.dotInProgress,
  Done: styles.dotDone,
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.ID} className={styles.row}>
          <span
            className={`${styles.dot} ${dotClass[task.Status]}`}
            role="img"
            aria-label={task.Status}
            title={task.Status}
          />
          <Link
            href={`/tasks/${task.ID}`}
            prefetch={false}
            className={styles.title}
          >
            {task.TaskTitle}
          </Link>
          <span className={styles.priority}>{task.Priority}</span>
          <span className={styles.due}>Due {task.DateDue}</span>
        </li>
      ))}
    </ul>
  );
}
