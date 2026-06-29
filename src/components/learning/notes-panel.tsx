"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningNote } from "@/types/academic";

type NotesPanelProps = {
  notes: LearningNote[];
  onCreateNote: (title: string, body: string) => void;
  onUpdateNote: (noteId: string, title: string, body: string) => void;
  onDeleteNote: (noteId: string) => void;
};

export function NotesPanel({ notes, onCreateNote, onUpdateNote, onDeleteNote }: NotesPanelProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function resetForm() {
    setTitle("");
    setBody("");
    setEditingId(null);
  }

  function submitNote() {
    if (!title.trim() && !body.trim()) {
      return;
    }

    if (editingId) {
      onUpdateNote(editingId, title.trim() || "Untitled note", body.trim());
    } else {
      onCreateNote(title.trim() || "Untitled note", body.trim());
    }

    resetForm();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Note title"
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write a quick note..."
            className="min-h-28 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2">
            <Button type="button" onClick={submitNote}>
              {editingId ? "Save Note" : "Create Note"}
            </Button>
            {editingId ? (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            ) : null}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {notes.length === 0 ? (
            <p className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground">
              No notes yet.
            </p>
          ) : null}
          {notes.map((note) => (
            <div key={note.id} className="rounded-md border border-border/70 bg-background/32 p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-medium text-foreground">{note.title}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {note.body || "No details added."}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setEditingId(note.id);
                      setTitle(note.title);
                      setBody(note.body);
                    }}
                  >
                    Edit
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => onDeleteNote(note.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
