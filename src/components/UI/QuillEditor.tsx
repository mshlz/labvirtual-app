import React, { useEffect } from 'react';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'code'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: OnChangeHandler;
  modules?: any
};

const QuillEditor = ({ value, onChange, placeholder, modules, ...rest }: Props) => {
  useEffect(() => {
    if (!document) return
  }, [])

  return (
    <>
      <ReactQuill
        {...rest}
        theme="snow"
        value={value || ''}
        modules={modules ?? defaultModules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default QuillEditor;