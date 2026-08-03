'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = 'Write something...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-itsa-navy focus-within:border-transparent transition-shadow">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900 font-bold' : ''}`}
          title="Bold"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h7a5 5 0 014.28 7.576c1.666 1.488 2.72 3.69 2.72 6.136 0 4.567-3.702 8.288-8.267 8.288H6V4zm2 2v7h5a3 3 0 000-6H8zm0 9v7h5.733a6.288 6.288 0 000-12.576H8v5.576z"/></svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900 italic' : ''}`}
          title="Italic"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4L9 20h-2l10-16z"/></svg>
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900 font-bold' : ''}`}
          title="Heading 2"
        >
          <span className="text-xs font-bold font-sans">H2</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-gray-900 font-bold' : ''}`}
          title="Heading 3"
        >
          <span className="text-xs font-bold font-sans">H3</span>
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : ''}`}
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16M4 6h.01M4 12h.01M4 18h.01"></path></svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : ''}`}
          title="Numbered List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6h14M7 12h14M7 18h14M3 6h.01M3 12h.01M3 18h.01"></path></svg>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
