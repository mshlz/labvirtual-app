import { useField } from '@unform/core'
import React, { PropsWithChildren, useEffect, useRef } from 'react'

interface CheckboxProps {
    name: string
    label: string
    [key: string]: string
}

const Checkbox = (props: PropsWithChildren<CheckboxProps>) => {
    const { name, label, children, ...rest } = props
    const inputRef = useRef()
    const { fieldName, defaultValue, registerField } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.checked
            },
            setValue: (ref, value) => {
                ref.current.checked = value
            },
            clearValue: ref => {
                ref.current.checked = false
            },
        })
    }, [fieldName, registerField])

    return (
        <>
            <label htmlFor={name}>
                <input
                    id={name}
                    name={name}
                    ref={inputRef}
                    type="checkbox"
                    {...rest}
                />
                {label}
                {children}
            </label>
        </>
    )
}

export { Checkbox }
