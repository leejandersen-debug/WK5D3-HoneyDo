import { ASSIGNEES } from "@/lib/tasks";
import type { Task } from "@/lib/types";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
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
  );
}
