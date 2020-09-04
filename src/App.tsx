import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { textEditorCss } from "./css";

type TextEditorT = {
  onEditorChange?: (t: string, h: string) => void;
  boxed: boolean;
  fontSize?: string;
  fontColor?: string;
};

export const TextEditor = (props: TextEditorT) => {
  const { onEditorChange, boxed, fontSize, fontColor } = props;

  const [text, setText] = useState("");
  const reactQuillRef = useRef() as any;

  useEffect(() => {
    let quill = reactQuillRef && reactQuillRef.current;
    if (!quill) return;
    if (quill) {
      const editor = quill.getEditor();
      const unprivilegedEditor = quill.makeUnprivilegedEditor(editor);
      // onEditorChange(unprivilegedEditor.getText(), text);
    }
  }, [text]);

  const handleChange = (value: React.SetStateAction<string>) => {
    setText(value);
  }

  return (
    <TextEditorWrapper fontSize={fontSize} fontColor={fontColor}>
      <ReactQuill
        ref={reactQuillRef}
        value={text}
        onChange={handleChange}
        theme={"snow"}
        id={boxed ? "boxTextEditor" : ""}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
    </TextEditorWrapper>
  );
};

//styles

const TextEditorWrapper = styled.div`
    ${textEditorCss};
`;

TextEditor.modules = {
  toolbar: [
    [{ 'header': [6, 5, 4, 3, 2, 1, false] }],
    ['bold', 'italic', 'underline', 'strike', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
  ],
  clipboard: {
    matchVisual: false,
  }
}

TextEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'code-block',
  'list', 'indent',
]