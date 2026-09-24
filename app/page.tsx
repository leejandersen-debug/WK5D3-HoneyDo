import { ASSIGNEES, tasks } from "@/lib/tasks";

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
