import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface RadioOptionItem {
  label: string
  value: any
}

interface RadioProps {
  name: string
  options: RadioOptionItem[]
  onValueChange?: (value: string) => void
}

const Radio = ({ name, options, onValueChange }: RadioProps) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value' as any,
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      }
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {options.map((option, index) => (
        <div key={option.value} className="form-check">
          <label className="form-check-label">
            <input
              ref={elRef => (inputRefs.current[index] = elRef)}
              className="form-check-input"
              type="radio"
              name={fieldName}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              onChange={e => onValueChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}
      {error && <span style={{ fontFamily: 'sans-serif', fontSize: '.9rem', color: '#dc3545' }}>{error}</span>}
    </div>
  );
}


export { Radio }