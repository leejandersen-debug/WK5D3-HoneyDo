import { tasks } from "@/lib/tasks";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/tasks/[id]">,
) {
  const { id } = await params;
  const task = tasks.find((t) => t.ID === id);

  if (!task) {
    return Response.json({ error: "Task not found." }, { status: 404 });
  }

  return Response.json(task);
}
