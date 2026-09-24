import Link from "next/link";
import { notFound } from "next/navigation";
import { tasks } from "@/lib/tasks";

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
      <Link href="/" className="back-link">
        &larr; All tasks
      </Link>
      <p className="task-id">{task.ID}</p>
      <h1>{task.TaskTitle}</h1>
      <dl>
        <dt>Assigned to</dt>
        <dd>{task.AssignedTo}</dd>
        <dt>Due</dt>
        <dd>{task.DateDue}</dd>
      </dl>
      <p className="task-description">{task.Description}</p>
    </main>
  );
}
