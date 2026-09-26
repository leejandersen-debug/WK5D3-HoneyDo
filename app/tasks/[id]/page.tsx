import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Avatar,
  PriorityChip,
  StatusChip,
  statusTone,
} from "@/app/components/TaskBadges";
import { tasks } from "@/lib/tasks";

/** Converts mm/dd/yyyy to the yyyy-mm-dd form <time dateTime> expects. */
function toIsoDate(date: string): string {
  const [mm, dd, yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

export default async function TaskPage(props: PageProps<"/tasks/[id]">) {
  const { id } = await props.params;
  // Read the data directly. Server components shouldn't call our own
  // /api routes — that's an extra HTTP request back to the same server.
  const task = tasks.find((t) => t.ID === id);

  if (!task) {
    notFound();
  }

  return (
    <main className="task-detail">
      <Link href="/tasks" className="back-link">
        &larr; All tasks
      </Link>
      <article className="detail-card" data-tone={statusTone(task.Status)}>
        <header>
          <p className="task-id">{task.ID}</p>
          <h1>{task.TaskTitle}</h1>
          <div className="chips">
            <StatusChip status={task.Status} />
            <PriorityChip priority={task.Priority} />
          </div>
        </header>
        <dl>
          <dt>Assigned to</dt>
          <dd className="person">
            <Avatar name={task.AssignedTo} />
            {task.AssignedTo}
          </dd>
          <dt>Due</dt>
          <dd>
            <time dateTime={toIsoDate(task.DateDue)}>{task.DateDue}</time>
          </dd>
        </dl>
        <p className="task-description">{task.Description}</p>
      </article>
    </main>
  );
}
