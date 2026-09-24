import type { Assignee, Task } from "@/lib/types";

export const ASSIGNEES: Assignee[] = ["Lee", "Tara", "Eric", "Jake"];

export const tasks: Task[] = [
  {
    ID: "TASK0001",
    TaskTitle: "Call Breaux Dental for Appt",
    AssignedTo: "Tara",
    DateDue: "10/02/2026",
    Description: "Call for appointment to get filling taken care of.",
  },
  {
    ID: "TASK0002",
    TaskTitle: "List Boat for sale",
    AssignedTo: "Lee",
    DateDue: "09/28/2026",
    Description: "Prep boat for listing, then list on Marketplace",
  },
  {
    ID: "TASK0003",
    TaskTitle: "Complete Week 5 Coursework",
    AssignedTo: "Lee",
    DateDue: "09/28/2026",
    Description: "Finish AI Week 5 coursework and start Week 6.",
  },
  {
    ID: "TASK0004",
    TaskTitle: "Call Breaux Dental for Appt",
    AssignedTo: "Tara",
    DateDue: "10/02/2026",
    Description: "Call for appointment to get filling taken care of.",
  },
  {
    ID: "TASK0005",
    TaskTitle: "Fair with Kids",
    AssignedTo: "Tara",
    DateDue: "09/27/2026",
    Description: "Go to the Fair with the Barker kids. Bring Eric and Jake.",
  },
  {
    ID: "TASK0006",
    TaskTitle: "Schedule Travel",
    AssignedTo: "Lee",
    DateDue: "09/27/2026",
    Description:
      "Complete travel arrangements to Portland and Bangor, ME for work.",
  },
];
