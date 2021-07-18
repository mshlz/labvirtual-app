import { Form } from "@unform/web"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { LoadingWrapper } from "../../../../components/Loading/Loading"
import { QuestionItem } from "../../../../components/Quiz/Form/QuestionItem"
import { Button } from "../../../../components/UI/Button"
import Select from "../../../../components/UI/Select"
import { AppLeftNavigation } from "../../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../../services/DisciplineService"
import { QuestionService } from "../../../../services/QuestionService"
import { SubjectService } from "../../../../services/SubjectService"

const UpdateQuestionPage = () => {
    const [resource, setResource] = useState(null)
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disciplines, setDisciplines] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const router = useRouter()

    useEffect(() => {
        loadResource()
    }, [router])

    useEffect(() => {
        loadDependencies()
    }, [])

    const loadResource = async () => {
        const id = router.query.id as string
        if (!id) return
        const resource = await QuestionService.get(id)
        // setTimeout(() => {
        setResource(resource)
        if (!resource || !resource.id) {
            toast('Questão não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/questions'), 4000)
        }

        setupForm()
        // }, 1000)
    }

    const setupForm = () => {
        if (resource)
            formRef.current.setData(resource)
    }

    const loadDependencies = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadSubjects = async (discipline_id: string) => {
        if (!discipline_id) return
        triggerClearSelect()
        const subjects = await SubjectService.getAllFromDiscipline(discipline_id)
        setSubjects(subjects)
    }
    const triggerClearSelect = () => null

    const handleSubmit = async (data) => {
        console.log("DATA", data)
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            type: Yup.string().trim().oneOf(['dissertative', 'single-choice', 'multiple-choice']),
            // discipline: Yup.string().required().uuid('este campo necessita ser preenchido'),
            // subject: Yup.string().required().uuid('este campo necessita ser preenchido'),
        }, data, formRef)
        // return
        if (isValid) {
            try {
                setIsLoading(true)
                await QuestionService.update(router.query.id as string, data)
                setIsLoading(false)
                toast("Questão atualizada com sucesso!", { type: 'success' })
                setTimeout(() => {
                    router.push('/manager/questions')
                }, 2000);
            } catch (error) {
                setIsLoading(false)
                alert(error.response.data.message)
            }
        }
    }

    return <AppLeftNavigation>
        <LoadingWrapper isLoading={!resource}>
            <div className="row m-b-20">
                <div className="col-md-12">
                    <div className="title-wrap">
                        <h2 className="title-5 text-center">
                            <i className="fa fa-plus mr-2"></i> Nova Questão
                    </h2>
                        <Button color="light" onClick={() => router.back()}><i className="fa fa-arrow-left mr-2"></i>Voltar</Button>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card m-b-70">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <Form ref={formRef} onSubmit={handleSubmit} className="row">
                                        <div className="col-12">
                                            <h4>Informações básicas</h4>
                                            <hr />
                                        </div>
                                        <div className="col-md-12">
                                            {disciplines && <Select
                                                label="Disciplina:"
                                                name="discipline"
                                                onChange={e => loadSubjects(e?.value)}
                                                options={disciplines.map(e => ({ label: e.name, value: e.id }))}
                                            />}
                                        </div>
                                        <div className="col-md-12">
                                            {subjects && <Select
                                                label="Assunto:"
                                                name="subject"
                                                clear={triggerClearSelect}
                                                options={subjects?.map(e => ({ label: e.name, value: e.id }))}
                                            />}
                                        </div>
                                        <div className="col-md-12">
                                            <QuestionItem alternatives={resource?.alternatives} questionType={resource?.type} reload={setupForm} edit={true}/>
                                        </div>

                                        <div className="col-md-12 mt-3">
                                            <Button color="success" block isLoading={isLoading}>
                                                Salvar
                                        </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    </AppLeftNavigation >
}

export default UpdateQuestionPage