"use client";

// src/Tiptap.tsx
import { Button } from "@/src/components/Core/Button";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
};

const Tiptap: React.FC<Props> = ({
  name,
  value,
  onChange,
  placeholder = "",
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
        limit: 8192,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(name, editor.getHTML().toString());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
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
