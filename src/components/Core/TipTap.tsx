"use client";

// src/Tiptap.tsx
import { Button } from "@/src/components/Core/Button";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

import styles from "./TipTap.module.css";

type Props = {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  label?: string;
  max?: number;
};

const Tiptap: React.FC<Props> = ({
  name,
  value,
  onChange,
  placeholder = "",
  label,
  max = 512,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3],
        },
        bulletList: false,
        orderedList: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        hardBreak: false,
        strike: false,
        code: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: max,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(name, editor.getHTML().toString());
    },
  });

  const { charactersCount = 0 } = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount: context.editor?.storage.characterCount.characters(),
    }),
  }) as { charactersCount: number };

  if (!editor) {
    return null;
  }

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <EditorContent id={name} editor={editor} className={styles.tiptap} />
      <p>
        {charactersCount}/{max}
      </p>
      <BubbleMenu editor={editor}>
        <div style={{ display: "flex", gap: "4px" }}>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            Titulo
          </Button>
          <Button onClick={() => editor.chain().focus().toggleBold().run()}>
            Negrita
          </Button>
          <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Cursiva
          </Button>
        </div>
      </BubbleMenu>
    </>
  );
};

export default Tiptap;
