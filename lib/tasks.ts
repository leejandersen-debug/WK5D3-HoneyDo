import type { Assignee, Task, TaskPriority, TaskStatus } from "@/lib/types";

export const ASSIGNEES: Assignee[] = ["Lee", "Tara", "Eric", "Jake"];
export const STATUSES: TaskStatus[] = ["To do", "In progress", "Done"];
export const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];

const seedTasks: Task[] = [
  {
    ID: "TASK0001",
    TaskTitle: "Call Breaux Dental for Appt",
    AssignedTo: "Tara",
    DateDue: "10/02/2026",
    Description: "Call for appointment to get filling taken care of.",
    Status: "To do",
    Priority: "Medium",
  },
  {
    ID: "TASK0002",
    TaskTitle: "List Boat for sale",
    AssignedTo: "Lee",
    DateDue: "09/28/2026",
    Description: "Prep boat for listing, then list on Marketplace",
    Status: "In progress",
    Priority: "Low",
  },
  {
    ID: "TASK0003",
    TaskTitle: "Complete Week 5 Coursework",
    AssignedTo: "Lee",
    DateDue: "09/28/2026",
    Description: "Finish AI Week 5 coursework and start Week 6.",
    Status: "In progress",
    Priority: "High",
  },
  {
    ID: "TASK0005",
    TaskTitle: "Fair with Kids",
    AssignedTo: "Tara",
    DateDue: "09/27/2026",
    Description: "Go to the Fair with the Barker kids. Bring Eric and Jake.",
    Status: "To do",
    Priority: "Medium",
  },
  {
    ID: "TASK0006",
    TaskTitle: "Schedule Travel",
    AssignedTo: "Lee",
    DateDue: "09/27/2026",
    Description:
      "Complete travel arrangements to Portland and Bangor, ME for work.",
    Status: "To do",
    Priority: "High",
  },
];

// Route handlers and pages can each load their own copy of this module, so
// keep the one in-memory list on globalThis where every copy sees it.
const store = globalThis as typeof globalThis & { __honeydoTasks?: Task[] };
export const tasks: Task[] = (store.__honeydoTasks ??= seedTasks);

export const TITLE_MAX = 30;
export const DESCRIPTION_MAX = 150;

/** Status and Priority are optional; new tasks default to "To do" / "Medium". */
export type NewTask = Omit<Task, "ID" | "Status" | "Priority"> &
  Partial<Pick<Task, "Status" | "Priority">>;

/** Returns an error message, or null if `input` is a valid new task. */
export function validateNewTask(input: unknown): string | null {
  if (typeof input !== "object" || input === null) {
    return "Request body must be a JSON object.";
  }
  const { TaskTitle, AssignedTo, DateDue, Description, Status, Priority } =
    input as Record<string, unknown>;

  if (typeof TaskTitle !== "string" || TaskTitle.trim() === "") {
    return "Title is required.";
  }
  if (TaskTitle.trim().length > TITLE_MAX) {
    return `Title must be ${TITLE_MAX} characters or fewer.`;
  }
  if (!ASSIGNEES.includes(AssignedTo as Assignee)) {
    return `Assignee must be one of: ${ASSIGNEES.join(", ")}.`;
  }
  if (typeof DateDue !== "string" || !isValidDate(DateDue)) {
    return "Due date must be a real date in mm/dd/yyyy format.";
  }
  if (typeof Description !== "string") {
    return "Description must be text.";
  }
  if (Description.trim().length > DESCRIPTION_MAX) {
    return `Description must be ${DESCRIPTION_MAX} characters or fewer.`;
  }
  if (Status !== undefined && !STATUSES.includes(Status as TaskStatus)) {
    return `Status must be one of: ${STATUSES.join(", ")}.`;
  }
  if (Priority !== undefined && !PRIORITIES.includes(Priority as TaskPriority)) {
    return `Priority must be one of: ${PRIORITIES.join(", ")}.`;
  }
  return null;
}

function isValidDate(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;
  const [, mm, dd, yyyy] = match.map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  // Rejects dates like 02/30/2026, which Date silently rolls over.
  return (
    date.getFullYear() === yyyy &&
    date.getMonth() === mm - 1 &&
    date.getDate() === dd
  );
}

/** Adds a validated task to the in-memory list and returns it with its new ID. */
export function addTask(input: NewTask): Task {
  const highest = tasks.reduce(
    (max, t) => Math.max(max, Number(t.ID.replace("TASK", "")) || 0),
    0,
  );
  const task: Task = {
    ID: `TASK${String(highest + 1).padStart(4, "0")}`,
    TaskTitle: input.TaskTitle.trim(),
    AssignedTo: input.AssignedTo,
    DateDue: input.DateDue,
    Description: input.Description.trim(),
    Status: input.Status ?? "To do",
    Priority: input.Priority ?? "Medium",
  };
  tasks.push(task);
  return task;
}
