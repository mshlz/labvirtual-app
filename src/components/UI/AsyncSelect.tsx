import React, { useRef, useEffect } from "react"
import ReactAsyncSelect, { Props as AProps } from "react-select/async"
import { useField } from "@unform/core"
import { OptionTypeBase } from "react-select"

interface Props extends AProps<any, any> {
  name: string
  label?: string
  executeSearch: (query: string) => Promise<{ label: string; value: string }[]>
}

export function AsyncSelect({
  name,
  label,
  executeSearch,
  options,
  ...rest
}: Props) {
  const selectRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "state.value" as any,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ""
        }
        return ref.state.value.value
      },
      setValue: (ref, value) => {
        if (value === undefined) value = ""
        selectRef.current.select.setValue(
          options.find((option) => option.value == value)
        )
      },
    })
  }, [fieldName, registerField, rest.isMulti])

  // useEffect(() => { selectRef?.current?.select?.clearValue() }, [clear])

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "2px",
      boxShadow: "none",
      borderColor: "#ced4da",
    }),
  }

  return (
    <>
      <div className="form-group">
        {label && <label htmlFor="">{label}</label>}
        {/* <ReactSelect
                    ref={selectRef}
                    classNamePrefix="react-select"
                    styles={customStyles}
                    options={options}
                    {...rest}
                /> */}

        <ReactAsyncSelect
          ref={selectRef}
          // cacheOptions
          defaultOptions
          loadOptions={executeSearch}
          loadingMessage={(e) => "Buscando..."}
          noOptionsMessage={(e) => "Nenhum resultado!"}
          placeholder={"Buscar questões..."}
          styles={customStyles}
        />
        {error && (
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: ".9rem",
              color: "#dc3545",
            }}
          >
            {error}
          </span>
        )}
      </div>
    </>
  )
}
