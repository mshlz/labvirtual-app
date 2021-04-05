import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

interface Props {
    name: string
    label?: string
}

export default function RichTextEditor({ name, label, ...rest }: Props) {
    const editorRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: editorRef.current,
            getValue: (ref) => {
                return ref.editor.getContents()
            },
            setValue: (ref, value) => {
                ref.editor.setContents(value)
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
                        buttonList: [
                            ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                            ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
                        ]
                    }}
                    {...rest}
                />
                {error && <span style={{ fontFamily: 'sans-serif', fontSize: '.9rem', color: '#dc3545' }}>{error}</span>}
            </div>
        </>
    );
};