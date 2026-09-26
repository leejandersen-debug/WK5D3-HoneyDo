import type { Metadata } from "next";
import { connection } from "next/server";
import { settings } from "@/lib/settings";
import { tasks } from "@/lib/tasks";
import ListEditor from "./ListEditor";

export const metadata: Metadata = {
  title: "Settings",
};

function countBy(field: "AssignedTo" | "Priority"): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const task of tasks) {
    counts[task[field]] = (counts[task[field]] ?? 0) + 1;
  }
  return counts;
}

export default async function SettingsPage() {
  // Settings change at runtime, so render per request.
  await connection();

  return (
    <main className="settings">
      <h1>Settings</h1>
      <p className="settings-intro">
        Choose who tasks can be assigned to and which priorities you use.
        Renaming an entry updates every task that uses it.
      </p>

      <div className="settings-grid">
        <ListEditor
          list="assignees"
          title="Assigned to"
          description="The people who can be assigned tasks."
          items={[...settings.assignees]}
          usage={countBy("AssignedTo")}
          kind="person"
        />
        <ListEditor
          list="priorities"
          title="Priority"
          description="Highest priority first. Sorting by priority follows this order."
          items={[...settings.priorities]}
          usage={countBy("Priority")}
          kind="priority"
        />
      </div>
    </main>
  );
}
