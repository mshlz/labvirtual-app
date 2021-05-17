import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

const Radio = ({ name, options }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue } = useField(name);

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
        <div className="form-check">
          <label key={option.value} className="form-check-label">
            <input
              ref={elRef => (inputRefs.current[index] = elRef)}
              className="form-check-input"
              type="radio"
              name={fieldName}
              value={option.value}
              defaultChecked={defaultValue === option.value}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}


export { Radio }