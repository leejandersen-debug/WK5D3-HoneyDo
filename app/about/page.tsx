import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · HoneyDo",
};

export default function AboutPage() {
  return (
    <main className="about">
      <h1>About HoneyDo</h1>
      <p>
        HoneyDo keeps the household to-do list in one place: chores, errands,
        and appointments, each with a due date, a priority, and the person
        who&apos;s on it.
      </p>
      <p>
        Add a task from the home page, then use the Tasks page to filter by
        status, sort by priority or due date, and switch between a list and a
        board.
      </p>
    </main>
  );
}
