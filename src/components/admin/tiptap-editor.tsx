"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export function TiptapEditor({ name, defaultValue = "", placeholder = "Write your post..." }: Props) {
  const [value, setValue] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="overflow-hidden rounded-2xl border border-steel bg-white">
        <div className="border-b border-steel/70 bg-mist/60 px-3 py-2 text-xs text-ink-muted">
          Loading editor...
        </div>
        <div className="min-h-[300px] p-6 text-sm text-ink-muted">Preparing TipTap...</div>
      </div>
    );
  }

  const setLink = () => {
    const existing = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", existing ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-steel bg-white">
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap items-center gap-1 border-b border-steel/70 bg-mist/60 p-2">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} label="Heading 1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bullet list">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Ordered list">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Blockquote">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} label="Inline code">
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Divider">
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} label="Insert link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} label="Remove link">
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} label="Undo">
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} label="Redo">
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>
      <EditorContent editor={editor} className="tiptap max-h-[600px] overflow-y-auto" />
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${
        active ? "bg-ink text-amber" : "text-ink hover:bg-stone"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px bg-steel" />;
}
