import React from "react";
import {
  Bold,
  CodeSquare,
  Italic,
  Sparkles,
  Strikethrough,
} from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { AiChatSession } from "../../../configs/AIModel";
import { useUser } from "@clerk/nextjs";

function EditorExtensions({ editor }) {
  const { fileId } = useParams();
  const SearchAi = useAction(api.myActions.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();

  const onAiClick = async () => {
    const selectedText = editor?.state.doc.textBetween(
      editor?.state.selection.from,
      editor?.state.selection.to,
      " "
    );
    console.log("Selected Text:", selectedText);
    const result = await SearchAi({
      query: selectedText,
      fileId: fileId,
    });
    const UnformattedResult = JSON.parse(result);
    let AllUnformattedResult = "";
    UnformattedResult &&
      UnformattedResult.forEach((item) => {
        AllUnformattedResult += item.pageContent + "\n";
      });
    const PROMPT = `Answer in HTML format: You are a helpful AI assistant and your own interpretation. Based on the context provided, please answer the question concisely and accurately.\n\nContext:\n${AllUnformattedResult}\n\nQuestion: ${selectedText}\n\n`;

    const AiModelResult = await AiChatSession.sendMessage(PROMPT);
    const FinalAns = AiModelResult.response.text().slice(24).slice(0, -3);
    // console.log("LOL", FinalAns);

    const AllText = editor?.getHTML();
    editor?.commands.setContent(
      AllText +
        `<p>
        <strong>Answer:</strong><br>
        ${FinalAns}</p>`
    );

    saveNotes({
      fileId: fileId,
      notes: editor?.getHTML(),
      createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
    });
  };

  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-2 mb-2">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "text-blue-500" : ""}
          >
            <Italic />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={editor?.isActive("strike") ? "is-active" : ""}
          >
            <Strikethrough />
          </button>
          <button onClick={() => onAiClick()} className={"hover:text-blue-500"}>
            <Sparkles />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtensions;
