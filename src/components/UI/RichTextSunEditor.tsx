import React, { useEffect, useRef } from 'react';
import SunEditor from 'suneditor-react';
import SetOptions from 'suneditor-react/types/SetOptions';
import { BASE_URL } from '../../config/env';
import { GlossaryEntryPlugin } from '../../plugins/suneditor/glossary-dialog';
import { LocalStorage } from '../../utils/LocalStorage';

const defaultButtons = [
  ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
  ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
  ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'glossaryEntry']
];

type Props = {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  buttons?: SetOptions['buttonList'],
  onSave?: (contents: string) => void
  onChange?: (...any: any) => void
};

export const RichTextSunEditor = ({ value, placeholder, initialValue, buttons, onSave, onChange, ...rest }: Props) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!document || !editorRef) return
  }, [])

  
  return (
    <>
      <SunEditor
        lang="pt_br"
        //@ts-ignore
        ref={editorRef}
        placeholder={placeholder}
        defaultValue={initialValue}
        onChange={(event) => onChange(editorRef.current.editor.getContents())}
        setContents={value}
        setOptions={{
          buttonList: buttons || defaultButtons,
          imageUploadUrl: `${BASE_URL}upload`,
          imageUploadHeader: {
            Authorization: LocalStorage.get("app-token")
          },
          callBackSave: onSave,
          customPlugins: [GlossaryEntryPlugin]
        }}
        // height={'500px'}
        {...rest}
      />
    </>
  );
};
