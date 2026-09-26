import type { Assignee, TaskPriority, TaskStatus } from "@/lib/types";

// Each maps to a color family defined in globals.css ([data-tone="..."]).
type Tone = "honey" | "tangerine" | "berry" | "violet" | "leaf" | "sky";

const STATUS_TONE: Record<TaskStatus, Tone> = {
  "To do": "violet",
  "In progress": "honey",
  Done: "leaf",
};

// Priorities and people are editable, so these only pin colors for the
// defaults. Any other name gets a stable color from toneFor().
const PRIORITY_TONE: Record<string, Tone> = {
  High: "berry",
  Medium: "tangerine",
  Low: "sky",
};

const PERSON_TONE: Record<string, Tone> = {
  Lee: "tangerine",
  Tara: "berry",
  Eric: "sky",
  Jake: "leaf",
};

const TONES: Tone[] = ["honey", "tangerine", "berry", "violet", "leaf", "sky"];

/** Picks a tone from `known`, or one derived from the name so it never changes. */
function toneFor(name: string, known: Record<string, Tone>): Tone {
  if (Object.hasOwn(known, name)) return known[name];
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return TONES[hash % TONES.length];
}

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

export function PriorityChip({
  priority,
  showSuffix = true,
}: {
  priority: TaskPriority;
  /** Adds the word "priority"; leave on unless the context already says it. */
  showSuffix?: boolean;
}) {
  return (
    <span className="chip" data-tone={toneFor(priority, PRIORITY_TONE)}>
      {showSuffix ? `${priority} priority` : priority}
    </span>
  );
}

/** Initial in a colored circle. Decorative: the name is always shown beside it. */
export function Avatar({ name }: { name: Assignee }) {
  return (
    <span
      className="avatar"
      data-tone={toneFor(name, PERSON_TONE)}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
