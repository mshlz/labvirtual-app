import { useField } from "@unform/core"
import React, { PropsWithChildren, useEffect, useRef } from "react"

interface SwitchProps {
  name: string
  label: string
  [key: string]: string
}

const Switch = (props: PropsWithChildren<SwitchProps>) => {
  const { name, label, children, ...rest } = props
  const inputRef = useRef()
  const { fieldName, defaultValue, registerField } = useField(name)
  const uid =
    Math.trunc(Math.random() * 100000).toString(36) +
    Math.trunc(Math.random() * 100000).toString(36)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.checked
      },
      setValue: (ref, value) => {
        ref.current.checked = value
      },
      clearValue: (ref) => {
        ref.current.checked = false
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      <div className="custom-control custom-switch">
        <input
          ref={inputRef}
          type="checkbox"
          className="custom-control-input"
          id={`switch-${uid}`}
          {...rest}
        />
        {label && (
          <label className="custom-control-label" htmlFor={`switch-${uid}`}>
            {label}
          </label>
        )}
      </div>
    </>
  )
}

export { Switch }
