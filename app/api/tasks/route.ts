import { addTask, tasks, validateNewTask, type NewTask } from "@/lib/tasks";

export async function GET() {
  return Response.json(tasks);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const error = validateNewTask(body);
  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  const task = addTask(body as NewTask);
  return Response.json(task, { status: 201 });
}
