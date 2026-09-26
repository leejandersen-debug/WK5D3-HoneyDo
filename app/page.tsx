import { connection } from "next/server";
import TaskBoard from "@/app/components/TaskBoard";
import { settings } from "@/lib/settings";

export default async function Home() {
  // The assignee and priority lists are editable, so render per request.
  await connection();

  return (
    <main>
      <TaskBoard
        assignees={[...settings.assignees]}
        priorities={[...settings.priorities]}
        intro={
          <>
            <h1>
              Get the household to-do list{" "}
              <span className="highlight">done.</span>
            </h1>
            <p className="subhead">
              Track every chore, errand, and appointment in one place and see
              who&apos;s on it at a glance.
            </p>
          </>
        }
      />
    </main>
  );
}
