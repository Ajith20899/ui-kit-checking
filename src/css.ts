import { css } from "styled-components";

export const textEditorCss = css<{ fontSize?: string; fontColor?: string }>`
  .quill {
    width: 90%;
    margin: 0px auto;
  }
  .ql-toolbar {
    text-align: center;
  }
  .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    margin-top: -13px;
    right: -18px;
  }
  .ql-snow .ql-editor pre.ql-syntax {
    background-color: #f3f7f7;
    color: #576871;
    overflow: visible;
  }
  .ql-snow
    .ql-picker:not(.ql-color-picker):not(.ql-icon-picker)
    svg
    polygon:nth-child(2) {
    display: none;
  }
  .ql-snow .ql-formats .ql-picker {
    width: max-content;
  }
  line.ql-stroke.ql-thin {
    stroke-width: 1px !important;
  }
  .ql-toolbar .ql-list svg path.ql-stroke.ql-thin {
    display: none;
  }
  .ql-snow .ql-formats:nth-child(2) {
    margin-left: 15px;
  }
  .ql-snow .ql-picker-label {
    outline: none;
  }
  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 25px;
    position: relative;
  }
  .ql-toolbar.ql-snow .ql-formats:nth-child(4),
  .ql-toolbar.ql-snow .ql-formats:nth-child(3) {
    margin-right: 0px;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label::before {
    color: black;
  }
  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border-color: transparent;
    color: #576871;
  }
  .ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: unset;
    z-index: unset;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label {
    width: 90px;
    font-size: 16px;
    color: black;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    font-size: ${({ fontSize }) => fontSize || `15px`};
  }
  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border: unset;
    background-color: #f0f0f0;
    box-shadow: unset;
    color: #576871;
    margin: 3px;
    padding: 2px 10px;
    outline: none;
    border-radius: 4px;
    width: max-content;
    left: 13px;
    text-align: left;
  }
  .ql-container.ql-snow,
  .ql-toolbar.ql-snow {
    border: unset;
  }
  .ql-container {
    font-size: 15px;
  }
  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options span {
    outline: none;
  }
  .ql-editor {
    height: 100%;
  }
  .ql-snow .ql-stroke {
    stroke: #8a8a8a;
    stroke-width: 1.5px;
  }
  .ql-snow .ql-fill,
  .ql-snow .ql-stroke.ql-fill {
    fill: #8a8a8a;
  }
  .ql-snow.ql-toolbar button:hover,
  .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button.ql-active,
  .ql-snow .ql-toolbar button.ql-active,
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-snow .ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-snow .ql-toolbar .ql-picker-item:hover,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: ${({ fontColor }) => fontColor || `black`};
    font-weight: 800;
  }
  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow .ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: ${({ fontColor }) => fontColor || `black`};
    stroke-width: 2;
  }
  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: ${({ fontColor }) => fontColor || `black`};
  }

  // media queries

  @media (max-width: 500px) {
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
      left: 3px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label {
      width: max-content;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label::before {
      content: "N";
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before {
      content: "H1" !important;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before {
      content: "H2" !important;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before {
      content: "H3" !important;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before {
      content: "H4" !important;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before {
      content: "H5" !important;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before {
      content: "H6" !important;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item::before,
    .ql-snow .ql-picker.ql-header .ql-picker-label::before {
      content: "N" !important;
    }
  }
  @media (max-width: 430px) {
    .ql-toolbar.ql-snow .ql-formats {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 373px) {
    .ql-toolbar {
      text-align: left;
    }
  }

  /* box text editor */

  #boxTextEditor .ql-snow.ql-toolbar {
    display: block;
    background: #eaecec;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }

  #boxTextEditor .ql-bubble .ql-editor {
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }

  #boxTextEditor .ql-editor {
    min-height: 18em;
  }

  #boxTextEditor.quill {
    max-width: 600px;
    min-width: 300px;
    height: 300px;
    border: 1px solid lightgrey;
    border-radius: 9px;
    margin-top: 20px;
  }
`;
