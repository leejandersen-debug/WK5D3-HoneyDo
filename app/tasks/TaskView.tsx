"use client";

import { useState } from "react";
import type { Task, TaskStatus } from "@/lib/types";
import TaskBoard from "./TaskBoard";
import TaskList from "./TaskList";
import styles from "./page.module.css";

type Filter = "all" | "todo" | "doing" | "done";
type Sort = "priority" | "due" | "recent";
type View = "list" | "board";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "doing", label: "In progress" },
  { value: "done", label: "Done" },
];

const SORTS: { value: Sort; label: string }[] = [
  { value: "priority", label: "Priority" },
  { value: "due", label: "Due date" },
  { value: "recent", label: "Recent" },
];

const VIEWS: { value: View; label: string }[] = [
  { value: "list", label: "List" },
  { value: "board", label: "Board" },
];

const FILTER_STATUS: Record<Exclude<Filter, "all">, TaskStatus> = {
  todo: "To do",
  doing: "In progress",
  done: "Done",
};

/** Converts mm/dd/yyyy to a sortable yyyymmdd number. */
function dueKey(date: string): number {
  const [mm, dd, yyyy] = date.split("/");
  return Number(`${yyyy}${mm}${dd}`);
}

/** Converts TASK0007 to 7. Higher IDs were created more recently. */
function idNumber(id: string): number {
  return Number(id.replace("TASK", "")) || 0;
}

function applyFilterAndSort(
  tasks: Task[],
  filter: Filter,
  sort: Sort,
  priorities: string[],
): Task[] {
  // Priorities are listed highest first, so the index is the rank.
  const rank = (task: Task) => priorities.indexOf(task.Priority);

  const filtered =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.Status === FILTER_STATUS[filter]);

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case "priority":
        return rank(a) - rank(b) || dueKey(a.DateDue) - dueKey(b.DateDue);
      case "due":
        return dueKey(a.DateDue) - dueKey(b.DateDue) || rank(a) - rank(b);
      case "recent":
        // There's no created-at field, so newest ID first stands in for it.
        return idNumber(b.ID) - idNumber(a.ID);
    }
  });
}

function ButtonGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className={styles.group} role="group" aria-label={label}>
      <span className={styles.groupLabel}>{label}</span>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.toggle} ${active ? styles.toggleActive : ""}`}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function TaskView({
  tasks,
  priorities,
}: {
  tasks: Task[];
  priorities: string[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("priority");
  const [view, setView] = useState<View>("list");

  const visible = applyFilterAndSort(tasks, filter, sort, priorities);

  return (
    <main
      className={`${styles.page} ${view === "board" ? styles.pageWide : ""}`}
    >
      <h1 className={styles.heading}>All tasks</h1>

      <div className={styles.controls}>
        <ButtonGroup
          label="Filter"
          options={FILTERS}
          value={filter}
          onChange={setFilter}
        />
        <ButtonGroup
          label="Sort"
          options={SORTS}
          value={sort}
          onChange={setSort}
        />
        <ButtonGroup
          label="View"
          options={VIEWS}
          value={view}
          onChange={setView}
        />
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet.</p>
      ) : view === "board" ? (
        <TaskBoard tasks={visible} />
      ) : visible.length === 0 ? (
        <p className={styles.empty}>No tasks match this filter.</p>
      ) : (
        <TaskList tasks={visible} />
      )}
    </main>
  );
}
