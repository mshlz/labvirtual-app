import { Scope } from '@unform/core'
import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { QuestionItem } from './Form/QuestionItem'

export const QuizCreateEditForm = () => {
    const [questions, setQuestions] = useState([{ _id: "teste" }] as Array<any>)

    const addQuestion = (event) => {
        event.preventDefault()

        setQuestions([...questions, { id: Math.trunc(Math.random() * 10000) }])
    }

    const removeQuestion = (index) => {
        setQuestions(questions.filter((e, i) => e._id != index))
    }

    return <>
        <div className="col-12">
            {questions.length === 0 && <div className="alert alert-info text-center"><i className="fa fa-info-circle mr-2"></i>Não há questões</div>}
            {questions.map((question, idx) => (
                <Scope path={`questions[${idx}]`}>
                    <div key={question.id} className="col-md-12 mb-3 pt-3 pb-3 border-bottom shadow">
                        <h3 className="d-flex justify-content-between mb-1"><strong>Questão # {idx + 1}</strong> <Button type="button" size="sm" outline color="danger" onClick={() => removeQuestion(question._id)} title="Remover questão">Remover</Button></h3>
                        <QuestionItem />
                    </div>
                </Scope>
            ))}
        </div>
        <div className="col-md-12 text-center mt-2">
            <p className="font-italic font-weight-light mb-1">Clique no botão para adicionar uma nova questão</p>
            <Button onClick={addQuestion} color="success" outline>+ Nova Questão</Button>
        </div>
    </>
}