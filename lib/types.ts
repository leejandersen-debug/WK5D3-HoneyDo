/** One of settings.assignees, which is editable on the Settings page. */
export type Assignee = string;

export type TaskStatus = "To do" | "In progress" | "Done";

/** One of settings.priorities, which is editable on the Settings page. */
export type TaskPriority = string;

export interface Task {
  ID: string;
  /** Max 30 characters. */
  TaskTitle: string;
  AssignedTo: Assignee;
  /** mm/dd/yyyy */
  DateDue: string;
  /** Max 150 characters. */
  Description: string;
  Status: TaskStatus;
  Priority: TaskPriority;
}
