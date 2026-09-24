export type Assignee = "Lee" | "Tara" | "Eric" | "Jake";

export interface Task {
  ID: string;
  /** Max 30 characters. */
  TaskTitle: string;
  AssignedTo: Assignee;
  /** mm/dd/yyyy */
  DateDue: string;
  /** Max 150 characters. */
  Description: string;
}
