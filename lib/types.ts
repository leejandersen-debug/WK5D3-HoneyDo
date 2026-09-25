export type Assignee = "Lee" | "Tara" | "Eric" | "Jake";

export type TaskStatus = "To do" | "In progress" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

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
