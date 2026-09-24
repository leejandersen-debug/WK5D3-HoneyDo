type Assignee = "Lee" | "Tara" | "Eric" | "Jake";

interface Task {
  ID: string;
  /** Max 30 characters. */
  TaskTitle: string;
  AssignedTo: Assignee;
  /** mm/dd/yyyy */
  DateDue: string;
  /** Max 150 characters. */
  Description: string;
}

const ASSIGNEES: Assignee[] = ["Lee", "Tara", "Eric", "Jake"];

const tasks: Task[] = [
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

export default function Home() {
  return (
    <>
      <header className="site-header">
        <span className="brand">HoneyDo</span>
        <span className="tagline">HoneyDo List for what HoneyDoes.</span>
      </header>

      <main>
        <section className="hero">
          <h1>Get the household to-do list done.</h1>
          <p className="subhead">
            Track every chore, errand, and appointment in one place and see
            who&apos;s on it at a glance.
          </p>
          <button type="button" className="button-primary">
            Add a task
          </button>
        </section>

        <section className="tasks" aria-labelledby="tasks-heading">
          <h2 id="tasks-heading">This week&apos;s tasks</h2>
          <ul className="task-grid">
            {tasks.map((task) => (
              <li key={task.ID} className="task-card">
                <div className="task-meta">
                  <span className="task-id">{task.ID}</span>
                  <span className="task-due">Due {task.DateDue}</span>
                </div>
                <h3 className="task-title">{task.TaskTitle}</h3>
                <p className="task-description">{task.Description}</p>
                <label className="task-assignee">
                  Assigned to
                  <select defaultValue={task.AssignedTo}>
                    {ASSIGNEES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 HoneyDo. All rights reserved.</p>
      </footer>
    </>
  );
}
