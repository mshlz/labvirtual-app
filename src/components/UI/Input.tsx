import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

interface InputProps {
    name: string
    label?: string
    size?: 'sm' | 'lg'
    autocomplete?: boolean
    inline?: string | boolean
    cssClasses?: string
    [key: string]: any
}

const Input = (props: InputProps) => {
    const { name, label, autocomplete, inline, size, cssClasses, ...rest } = props
    const inputRef = useRef()
    const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                if (value === undefined) value = ''
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <>
            <div className={"form-group ".concat(inline ? typeof inline == 'string' ? 'mb-0 ' + inline : 'mb-0'  : '')}>
                {label && <label htmlFor={name}>{label}</label>}
                <input
                    id={name}
                    name={name}
                    ref={inputRef}
                    // type="email"
                    // placeholder="Email"
                    className={`form-control ${error ? 'is-invalid' : ''} ${size ? 'form-control-' + size : ''} ${cssClasses}`}
                    onChange={clearError}
                    autoComplete={autocomplete ? 'on' : 'off'}
                    {...rest}
                />
                {error && <span style={{ fontFamily: 'sans-serif', fontSize: '.9rem', color: '#dc3545' }}>{error}</span>}
            </div>
        </>
    )
}

export { Input }
