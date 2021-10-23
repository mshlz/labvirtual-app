import { Scope, useField } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'
import { ActionMeta } from 'react-select'
import AsyncSelect from 'react-select/async'
import { QuestionService } from '../../services/QuestionService'

export const SearchQuestionBox = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const selectRef = useRef()

    const executeSearch = async (input) => {
        const result = await QuestionService.list() as any
        return result?.data.map(e => ({ label: `${e.name}`, value: e._id })) //
    }

    const handleOnChange = (value: { label: string, value: string }, action: ActionMeta<object>) => {
        // console.log("Changed ==> ", value, action, selectRef)

        if (action.action === 'select-option') {
            if (!selectedQuestions.some(e => e._id == value.value)) {
                setSelectedQuestions([...selectedQuestions, { id: value.value, name: value.label }])
            }
        }
    }

    const removeQuestion = (id) => {
        setSelectedQuestions(selectedQuestions.filter(e => e._id != id))
    }

    const customStyles = { control: provided => ({ ...provided, borderRadius: '2px', boxShadow: 'none', borderColor: '#ced4da' }) }

    return <>
        <div className="col-12 mb-3">
            <AsyncSelect
                ref={selectRef}
                // cacheOptions
                defaultOptions
                loadOptions={executeSearch}
                loadingMessage={e => 'Buscando...'}
                noOptionsMessage={e => 'Nenhum resultado!'}
                placeholder={'Buscar questões...'}
                styles={customStyles}
                onChange={handleOnChange}
            />

            <Scope path="ref_questions">
                <ul className="list-group mt-3">
                { selectedQuestions.length > 0 ? selectedQuestions.length > 1 ? `${selectedQuestions.length} questões` : '1 questão' : 'Nenhuma questão adicionada'}
                    {selectedQuestions.map((question, idx) =>
                        <UQuestionItem
                            key={question._id}
                            idx={idx}
                            id={question._id}
                            name={question.name}
                            removeQuestion={removeQuestion}
                        />
                    )}
                </ul>
            </Scope>
        </div>
    </>
}

interface _QuestionListItemProps {
    idx: number
    id: string
    name: string
    removeQuestion: (id: string) => void
    [key: string]: any
}

const UQuestionItem = (props: _QuestionListItemProps) => {
    const { id, name, idx, removeQuestion } = props
    const inputRef = useRef()
    const { fieldName, registerField } = useField(idx.toString())

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
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <input type="hidden" value={id} ref={inputRef} />

                {name}

                <button
                    className="btn btn-sm btn-danger"
                    onClick={e => { e.preventDefault(); removeQuestion(id) }}
                >
                    <i className="fa fa-times mr-2"></i>Remover
                        </button>
            </li>
        </>
    )
}
