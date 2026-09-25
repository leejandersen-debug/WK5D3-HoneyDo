import TaskBoard from "@/app/components/TaskBoard";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <span className="brand">HoneyDo</span>
        <span className="tagline">HoneyDo List for what HoneyDoes.</span>
      </header>

      <main>
        <TaskBoard
          intro={
            <>
              <h1>Get the household to-do list done.</h1>
              <p className="subhead">
                Track every chore, errand, and appointment in one place and see
                who&apos;s on it at a glance.
              </p>
            </>
          }
        />
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 HoneyDo. All rights reserved.</p>
      </footer>
    </>
  );
}
