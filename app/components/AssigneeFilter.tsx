"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Avatar } from "@/app/components/TaskBadges";

interface Props {
  options: string[];
  /** Selected names. Empty means "All". */
  selected: string[];
  onChange: (selected: string[]) => void;
}

function summary(selected: string[]): string {
  if (selected.length === 0) return "All";
  if (selected.length <= 2) return selected.join(", ");
  return `${selected.length} people`;
}

/** Dropdown of checkboxes for picking any number of assignees, or All. */
export default function AssigneeFilter({ options, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close when clicking outside the dropdown or pressing Escape.
  useEffect(() => {
    if (!open) return;
    function handlePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function toggle(name: string) {
    const next = selected.includes(name)
      ? selected.filter((n) => n !== name)
      : [...selected, name];
    // Picking everyone individually is the same as All.
    onChange(next.length === options.length ? [] : next);
  }

  return (
    <div className="filter" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="filter-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="filter-label">Assigned to</span>
        <span className="filter-value">{summary(selected)}</span>
        <span className="filter-caret" aria-hidden="true" />
      </button>

      {open && (
        <fieldset id={panelId} className="filter-panel">
          <legend className="sr-only">Show tasks assigned to</legend>
          <label className="filter-option filter-all">
            <input
              type="checkbox"
              checked={selected.length === 0}
              onChange={() => onChange([])}
            />
            All
          </label>
          {options.map((name) => (
            <label key={name} className="filter-option">
              <input
                type="checkbox"
                checked={selected.includes(name)}
                onChange={() => toggle(name)}
              />
              <Avatar name={name} />
              {name}
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}
