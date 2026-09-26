"use server";

import { refresh } from "next/cache";
import {
  isListName,
  settings,
  validateName,
  type ListName,
} from "@/lib/settings";
import { tasks } from "@/lib/tasks";

export interface ActionState {
  error: string | null;
  /** What the user typed, so a failed submit doesn't wipe their input. */
  value?: string;
}

// Which task field each list feeds.
const TASK_FIELD = {
  assignees: "AssignedTo",
  priorities: "Priority",
} as const;

// Server actions are public endpoints, so check every field from the form.
function readList(formData: FormData): ListName | null {
  const list = formData.get("list");
  return isListName(list) ? list : null;
}

function readText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function addItem(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const list = readList(formData);
  if (!list) return { error: "Unknown list." };
  const name = readText(formData, "name");

  const error = validateName(list, name);
  if (error) return { error, value: name };

  settings[list].push(name);
  refresh();
  return { error: null };
}

export async function renameItem(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const list = readList(formData);
  if (!list) return { error: "Unknown list." };
  const from = readText(formData, "from");
  const to = readText(formData, "name");

  const index = settings[list].indexOf(from);
  if (index === -1) return { error: `"${from}" is no longer in the list.` };
  const error = validateName(list, to, from);
  if (error) return { error, value: to };

  // Rename everywhere so no task is left pointing at the old name.
  settings[list][index] = to;
  const field = TASK_FIELD[list];
  for (const task of tasks) {
    if (task[field] === from) task[field] = to;
  }
  refresh();
  return { error: null };
}

export async function removeItem(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const list = readList(formData);
  if (!list) return { error: "Unknown list." };
  const name = readText(formData, "name");

  const index = settings[list].indexOf(name);
  if (index === -1) return { error: `"${name}" is no longer in the list.` };
  if (settings[list].length === 1) {
    return { error: "The list needs at least one entry." };
  }
  const inUse = tasks.filter((t) => t[TASK_FIELD[list]] === name).length;
  if (inUse > 0) {
    return {
      error: `"${name}" is used by ${inUse} task${inUse === 1 ? "" : "s"}. Change ${inUse === 1 ? "it" : "them"} first.`,
    };
  }

  settings[list].splice(index, 1);
  refresh();
  return { error: null };
}

export async function moveItem(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const list = readList(formData);
  if (!list) return { error: "Unknown list." };
  const name = readText(formData, "name");
  const offset = formData.get("direction") === "up" ? -1 : 1;

  const items = settings[list];
  const index = items.indexOf(name);
  const target = index + offset;
  if (index === -1 || target < 0 || target >= items.length) {
    return { error: null };
  }

  [items[index], items[target]] = [items[target], items[index]];
  refresh();
  return { error: null };
}
