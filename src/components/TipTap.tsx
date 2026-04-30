// src/Tiptap.tsx
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Button } from './Core/Button'

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [3], // solo h3
                },
                // Desactiva lo que no quieres
                bulletList: false,
                orderedList: false,
                codeBlock: false,
                blockquote: false,
                horizontalRule: false,
                hardBreak: false,
                strike: false,
                code: false,
            }),
        ],
        content: '¡Escribe aquí tu sesión!', // initial content
        immediatelyRender: false
    })

    if (!editor) {
        return null // Prevent rendering until the editor is initialized
    }

    return (
        <>
            <EditorContent editor={editor} />
            <BubbleMenu editor={editor}>
                <div style={{ display: "flex", gap: "4px" }}>

                    <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                        Titulo
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleBold().run()}>
                        Negrita
                    </Button>
                    <Button onClick={() => editor.chain().focus().toggleItalic().run()}>
                        Cursiva
                    </Button>
                    <Button onClick={() => console.log(editor.getHTML())}>
                        HTML
                    </Button>
                </div>
            </BubbleMenu>
        </>
    )
}

export default Tiptap