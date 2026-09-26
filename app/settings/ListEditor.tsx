"use client";

import { useActionState, useState } from "react";
import { Avatar, PriorityChip } from "@/app/components/TaskBadges";
import { NAME_MAX, type ListName } from "@/lib/settings";
import {
  addItem,
  moveItem,
  removeItem,
  renameItem,
  type ActionState,
} from "./actions";

const INITIAL: ActionState = { error: null };

interface Props {
  list: ListName;
  title: string;
  description: string;
  items: string[];
  /** How many tasks use each entry. */
  usage: Record<string, number>;
  kind: "person" | "priority";
}

export default function ListEditor({
  list,
  title,
  description,
  items,
  usage,
  kind,
}: Props) {
  const [addState, addAction, adding] = useActionState(addItem, INITIAL);
  const headingId = `${list}-heading`;

  return (
    <section className="settings-card" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <p className="settings-description">{description}</p>

      <ol className="settings-list">
        {items.map((name, index) => (
          <ItemRow
            key={name}
            list={list}
            name={name}
            count={usage[name] ?? 0}
            kind={kind}
            rank={index + 1}
            isFirst={index === 0}
            isLast={index === items.length - 1}
            canRemove={items.length > 1}
          />
        ))}
      </ol>

      <form action={addAction} className="settings-add">
        <input type="hidden" name="list" value={list} />
        <input
          // Remount after each submit so a failed add keeps what was typed.
          key={addState.value ?? ""}
          name="name"
          defaultValue={addState.value}
          maxLength={NAME_MAX}
          required
          placeholder={kind === "person" ? "Add a person" : "Add a priority"}
          aria-label={kind === "person" ? "New person" : "New priority"}
        />
        <button type="submit" className="button-primary" disabled={adding}>
          Add
        </button>
      </form>
      {addState.error && (
        <p className="settings-error" role="alert">
          {addState.error}
        </p>
      )}
    </section>
  );
}

function ItemRow({
  list,
  name,
  count,
  kind,
  rank,
  isFirst,
  isLast,
  canRemove,
}: {
  list: ListName;
  name: string;
  count: number;
  kind: "person" | "priority";
  rank: number;
  isFirst: boolean;
  isLast: boolean;
  canRemove: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [renameState, renameAction, renaming] = useActionState(
    renameItem,
    INITIAL,
  );
  const [removeState, removeAction, removing] = useActionState(
    removeItem,
    INITIAL,
  );
  const [, moveAction, moving] = useActionState(moveItem, INITIAL);
  const busy = renaming || removing || moving;
  const error = editing ? renameState.error : removeState.error;

  return (
    <li className="settings-row">
      <div className="settings-row-main">
        {kind === "person" ? (
          <Avatar name={name} />
        ) : (
          // Position in the list is the priority rank.
          <span className="settings-rank">{rank}</span>
        )}

        {editing ? (
          <form
            action={renameAction}
            className="settings-rename"
            onSubmit={(e) => {
              // Nothing to save if the name didn't change.
              const next = new FormData(e.currentTarget).get("name");
              if (String(next).trim() === name) {
                e.preventDefault();
                setEditing(false);
              }
            }}
          >
            <input type="hidden" name="list" value={list} />
            <input type="hidden" name="from" value={name} />
            <input
              key={renameState.value ?? name}
              name="name"
              defaultValue={renameState.value ?? name}
              maxLength={NAME_MAX}
              required
              autoFocus
              aria-label={`New name for ${name}`}
              onKeyDown={(e) => {
                if (e.key === "Escape") setEditing(false);
              }}
            />
            <button type="submit" className="settings-button" disabled={busy}>
              Save
            </button>
            <button
              type="button"
              className="settings-button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            {kind === "priority" ? (
              <PriorityChip priority={name} showSuffix={false} />
            ) : (
              <span className="settings-name">{name}</span>
            )}
            <span className="settings-count">
              {count} task{count === 1 ? "" : "s"}
            </span>
            <div className="settings-actions">
              {kind === "priority" && (
                <form action={moveAction} className="settings-move">
                  <input type="hidden" name="list" value={list} />
                  <input type="hidden" name="name" value={name} />
                  <button
                    type="submit"
                    name="direction"
                    value="up"
                    className="settings-button"
                    disabled={busy || isFirst}
                    aria-label={`Move ${name} up`}
                    title="Move up"
                  >
                    &uarr;
                  </button>
                  <button
                    type="submit"
                    name="direction"
                    value="down"
                    className="settings-button"
                    disabled={busy || isLast}
                    aria-label={`Move ${name} down`}
                    title="Move down"
                  >
                    &darr;
                  </button>
                </form>
              )}
              <button
                type="button"
                className="settings-button"
                onClick={() => setEditing(true)}
                disabled={busy}
                aria-label={`Rename ${name}`}
              >
                Rename
              </button>
              <form action={removeAction}>
                <input type="hidden" name="list" value={list} />
                <input type="hidden" name="name" value={name} />
                <button
                  type="submit"
                  className="settings-button settings-remove"
                  disabled={busy || !canRemove}
                  aria-label={`Remove ${name}`}
                >
                  Remove
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {error && (
        <p className="settings-error" role="alert">
          {error}
        </p>
      )}
    </li>
  );
}
