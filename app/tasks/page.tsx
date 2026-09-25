import { connection } from "next/server";
import { tasks } from "@/lib/tasks";
import TaskView from "./TaskView";

export default async function TasksPage() {
  // The task list changes at runtime, so render per request instead of
  // prerendering a snapshot at build time.
  await connection();
  // Read the data directly. Server components shouldn't call our own
  // /api routes — that's an extra HTTP request back to the same server.
  return <TaskView tasks={tasks} />;
}
