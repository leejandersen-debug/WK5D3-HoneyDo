import TaskBoard from "@/app/components/TaskBoard";

export default function Home() {
  return (
    <main>
      <TaskBoard
        intro={
          <>
            <p className="eyebrow">Your household hive</p>
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
