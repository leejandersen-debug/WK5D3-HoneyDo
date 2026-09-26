/** The editable lists behind the "Assigned to" and "Priority" choices. */
export interface Settings {
  assignees: string[];
  /** Ordered highest priority first; sorting by priority follows this order. */
  priorities: string[];
}

export type ListName = keyof Settings;

export const LIST_NAMES: ListName[] = ["assignees", "priorities"];

export const NAME_MAX = 20;

// Like the task list, keep one in-memory copy on globalThis so route
// handlers, pages, and server actions all see the same settings.
const store = globalThis as typeof globalThis & {
  __honeydoSettings?: Settings;
};
export const settings: Settings = (store.__honeydoSettings ??= {
  assignees: ["Lee", "Tara", "Eric", "Jake"],
  priorities: ["High", "Medium", "Low"],
});

export function isListName(value: unknown): value is ListName {
  return LIST_NAMES.includes(value as ListName);
}

/**
 * Returns an error message, or null if `name` can be added to `list`.
 * `except` is the entry being renamed, so renaming to a different case of
 * itself isn't a duplicate.
 */
export function validateName(
  list: ListName,
  name: string,
  except?: string,
): string | null {
  if (name === "") return "Name can't be empty.";
  if (name.length > NAME_MAX) {
    return `Name must be ${NAME_MAX} characters or fewer.`;
  }
  const duplicate = settings[list].some(
    (item) => item !== except && item.toLowerCase() === name.toLowerCase(),
  );
  return duplicate ? `"${name}" is already in the list.` : null;
}

/** New tasks get "Medium" if it exists, otherwise the middle priority. */
export function defaultPriority(): string {
  const { priorities } = settings;
  return priorities.includes("Medium")
    ? "Medium"
    : priorities[Math.floor((priorities.length - 1) / 2)];
}
