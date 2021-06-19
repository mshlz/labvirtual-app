import { Scope } from '@unform/core'
import React, { useEffect, useState } from 'react'
import { Button } from '../../UI/Button'
import { Input } from '../../UI/Input'
import { Radio } from '../../UI/Radio'
import RichTextEditor from '../../UI/RichTextEditor'
import { Switch } from '../../UI/Switch'

export const QuestionItem = ({ alternatives, reload, edit = false }: { [k: string]: any }) => {
    const [type, setType] = useState(null)
    const [m_alternatives, setAlternatives] = useState([])

    if (edit) {
        useEffect(() => {
            setAlternatives(alternatives || [])
            if (typeof reload == 'function') setTimeout(() => reload(), 100)
        }, [alternatives])
    }

    const addAlternative = (event) => {
        event.preventDefault()

        setAlternatives([...m_alternatives, { id: Date.now() }])
    }

    const removeAlternative = (index) => {
        console.log(m_alternatives, index)
        setAlternatives(m_alternatives.filter((e, i) => e.id != index))
        console.log(m_alternatives)
    }

    return <>
        <Input label="Título da questão" name="name" />

        <RichTextEditor label="Texto da questão (opcional)" name="text" buttons={[
            ['font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
            ['link', 'image', 'video', 'showBlocks', 'codeView']
        ]} />

        <div className="form-group">
            <p>Tipo de alternativa</p>
            <div className="ml-2 -flex justify-content-between">
                <Radio
                    name="type"
                    options={[
                        { label: 'Dissertativa', value: 'dissertative' },
                        { label: 'Múltipla escolha', value: 'single-choice' },
                        { label: 'Múltipla escolha (multi resposta)', value: 'multiple-choice' }
                    ]}
                    onValueChange={setType}
                />
            </div>
        </div>

        { type === 'dissertative'
            ? <h5>Questão dissertativa</h5>
            : <div className="form-group">
                <h4 className="mb-2">Alternativas</h4>

                <ul className="list-group">
                    {m_alternatives.length === 0 && <div className="alert alert-sm alert-secondary text-center"><i className="fa fa-info-circle mr-2"></i>Não há alternativas ainda</div>}

                    {m_alternatives?.map((alternative, idx) => (
                        <Scope path={`alternatives[${idx}]`}>
                            <li key={alternative.id} className="list-group-item shadow-sm">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex">
                                        Alternativa #{idx + 1}
                                        <span className="ml-2 mr-2">•</span>
                                        <Switch name="correct" label="Alternativa correta" />
                                    </div>
                                    <Button onClick={() => removeAlternative(alternative.id)} color="danger" outline size="sm" type="button" title="Remover alternativa"><i className="fa fa-times"></i></Button>
                                </div>

                                <RichTextEditor
                                    name="text"
                                    buttons={[
                                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                                        ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align'],
                                        ['link', 'image', 'showBlocks', 'codeView']
                                    ]}
                                />
                            </li>
                        </Scope>
                    ))}
                </ul>

                <div className="mt-2">
                    <Button onClick={addAlternative} color="success" outline size="sm">+ adicionar alternativa</Button>
                </div>
            </div>
        }
    </>
}