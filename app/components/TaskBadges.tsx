import type { Assignee, TaskPriority, TaskStatus } from "@/lib/types";

// Each maps to a color family defined in globals.css ([data-tone="..."]).
type Tone = "honey" | "tangerine" | "berry" | "violet" | "leaf" | "sky";

const STATUS_TONE: Record<TaskStatus, Tone> = {
  "To do": "violet",
  "In progress": "honey",
  Done: "leaf",
};

const PRIORITY_TONE: Record<TaskPriority, Tone> = {
  High: "berry",
  Medium: "tangerine",
  Low: "sky",
};

const PERSON_TONE: Record<Assignee, Tone> = {
  Lee: "tangerine",
  Tara: "berry",
  Eric: "sky",
  Jake: "leaf",
};

export function statusTone(status: TaskStatus): Tone {
  return STATUS_TONE[status];
}

export function StatusChip({ status }: { status: TaskStatus }) {
  return (
    <span className="chip chip-dot" data-tone={STATUS_TONE[status]}>
      {status}
    </span>
  );
}

export function PriorityChip({ priority }: { priority: TaskPriority }) {
  return (
    <span className="chip" data-tone={PRIORITY_TONE[priority]}>
      {priority} priority
    </span>
  );
}

/** Initial in a colored circle. Decorative: the name is always shown beside it. */
export function Avatar({ name }: { name: Assignee }) {
  return (
    <span className="avatar" data-tone={PERSON_TONE[name]} aria-hidden="true">
      {name[0]}
    </span>
  );
}
