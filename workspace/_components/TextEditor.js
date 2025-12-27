"use client";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorExtensions from "./EditorExtensions";
import React, { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing your Questions here...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "h-screen p-5 focus:outline-none",
      },
    },
  });
  // adding notes
  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [notes && editor]);
  return (
    <div>
      {/* Editor Extensions */}
      <EditorExtensions editor={editor} />
      {/* Main Editor */}
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
