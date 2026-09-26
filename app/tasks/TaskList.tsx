"use client";

import Link from "next/link";
import { Avatar, PriorityChip, statusTone } from "@/app/components/TaskBadges";
import type { Task } from "@/lib/types";
import styles from "./TaskList.module.css";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.ID} className={styles.row}>
          <span
            className={styles.dot}
            data-tone={statusTone(task.Status)}
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
          <PriorityChip priority={task.Priority} />
          <span className={`person ${styles.assignee}`}>
            <Avatar name={task.AssignedTo} />
            {task.AssignedTo}
          </span>
          <span className={styles.due}>Due {task.DateDue}</span>
        </li>
      ))}
    </ul>
  );
}
