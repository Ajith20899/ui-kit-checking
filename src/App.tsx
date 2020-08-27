import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import "./App.css";

// type TextEditorT = {
//   onEditorChange: (t: string, h: string) => void;
//   boxTextEditor?: boolean;
// };

export const TextEditor = () => {
  // const { onEditorChange, boxTextEditor } = props;

  const [text, setText] = useState("");
  const reactQuillRef = useRef() as any;
  const boxTextEditor = false;

  useEffect(() => {
    let quill = reactQuillRef && reactQuillRef.current;
    if (!quill) return;
    if (quill) {
      const editor = quill.getEditor();
      const unprivilegedEditor = quill.makeUnprivilegedEditor(editor);
      console.log(unprivilegedEditor);
      // onEditorChange(unprivilegedEditor.getText(), text);
    }
  }, [text]);

  const handleChange = (value: React.SetStateAction<string>) => {
    setText(value);
  }

  return (
    <ReactQuill
      ref={reactQuillRef}
      value={text}
      onChange={handleChange}
      theme={"snow"}
      id={boxTextEditor ? "boxTextEditor" : ""}
      modules={TextEditor.modules}
      formats={TextEditor.formats}
    />
  );
};

TextEditor.modules = {
  toolbar: [
    [{ 'header': [6, 5, 4, 3, 2, 1, false] }],
    ['bold', 'italic', 'underline', 'strike', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }, 'clean'],
  ],
  clipboard: {
    matchVisual: false,
  }
}
/*
 * Quill TextEditor formats
 * See https://quilljs.com/docs/formats/
 */
TextEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'code-block',
  'list', 'indent',
  'color', 'background',
  'clean'
]