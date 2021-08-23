import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import SunEditor from 'suneditor-react';
import SetOptions from 'suneditor-react/types/SetOptions';
import 'suneditor/dist/css/suneditor.min.css';
import { BASE_URL } from '../../config/env';
import { GlossaryEntryPlugin } from '../../plugins/suneditor/glossary-dialog';
import { LocalStorage } from '../../utils/LocalStorage';

interface Props {
    name: string
    label?: string
    buttons?: SetOptions['buttonList'],
    onSave?: (contents: string) => void
}

const defaultButtons = [
    ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
    ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'glossaryEntry']
]

export default function RichTextEditor({ name, label, buttons = defaultButtons, onSave, ...rest }: Props) {
    const editorRef = useRef(null);
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: editorRef.current,
            getValue: (ref) => {
                return ref.editor.getContents()
            },
            setValue: (ref, value) => {
                ref.editor.setContents(value)
            },
            clearValue: (ref, newValue) =>{
                clearError()
                ref.editor.setContents('')
            }
        });
    }, [fieldName, registerField]);

    return (
        <>
            <div className="form-group">
                {label && <label htmlFor="">{label}</label>}
                <SunEditor
                    lang="pt_br"
                    //@ts-ignore
                    ref={editorRef}
                    name={name}
                    defaultValue={defaultValue}
                    setOptions={{
                        buttonList: buttons,
                        imageUploadUrl: `${BASE_URL}upload`,
                        imageUploadHeader: {
                            Authorization: LocalStorage.get("app-token")
                        },
                        callBackSave: onSave,
                        customPlugins: [GlossaryEntryPlugin]                 
                    }}
                    {...rest}
                />
                {error && <span style={{ fontFamily: 'sans-serif', fontSize: '.9rem', color: '#dc3545' }}>{error}</span>}
            </div>
        </>
    );
};