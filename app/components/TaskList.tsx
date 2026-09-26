import Link from "next/link";
import {
  Avatar,
  PriorityChip,
  StatusChip,
  statusTone,
} from "@/app/components/TaskBadges";
import { ASSIGNEES } from "@/lib/tasks";
import type { Task } from "@/lib/types";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="task-grid">
      {tasks.map((task) => (
        <li
          key={task.ID}
          className="task-card"
          data-tone={statusTone(task.Status)}
        >
          <div className="task-meta">
            <div className="chips">
              <StatusChip status={task.Status} />
              <PriorityChip priority={task.Priority} />
            </div>
            <span className="task-due">Due {task.DateDue}</span>
          </div>
          <h3 className="task-title">
            <Link href={`/tasks/${task.ID}`}>{task.TaskTitle}</Link>
          </h3>
          <p className="task-description">{task.Description}</p>
          <label className="task-assignee">
            <Avatar name={task.AssignedTo} />
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
