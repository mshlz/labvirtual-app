import React, { useRef, useEffect } from 'react';
import ReactSelect, {
    OptionTypeBase,
    Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
    name: string;
}

export default function Select({ name, label, ...rest }: Props) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return [];
                    }
                    return ref.state.value.map((option: OptionTypeBase) => option.value);
                }
                if (!ref.state.value) {
                    return '';
                }
                return ref.state.value.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    const customStyles = {
        control: provided => ({ ...provided, borderRadius: '2px', boxShadow: 'none', borderColor: '#ced4da' })
    }

    return (
        <>
            <div className="form-group">
                {label && <label htmlFor="">{label}</label>}
                <ReactSelect
                    defaultValue={defaultValue}
                    ref={selectRef}
                    classNamePrefix="react-select"
                    styles={customStyles}
                    {...rest}
                />
                {error && <span style={{ fontFamily: 'sans-serif', fontSize: '.9rem', color: '#dc3545' }}>{error}</span>}
            </div>
        </>
    );
};