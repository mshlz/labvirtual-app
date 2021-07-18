import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { LoadingWrapper } from "../../../../components/Loading/Loading"
import { Button } from "../../../../components/UI/Button"
import { Input } from "../../../../components/UI/Input"
import RichTextEditor from "../../../../components/UI/RichTextEditor"
import Select from "../../../../components/UI/Select"
import { AppLeftNavigation } from "../../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../../services/DisciplineService"
import { GlossaryService } from "../../../../services/GlossaryService"
import { SubjectService } from "../../../../services/SubjectService"


const UpdateGlossaryPage = () => {
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


    const loadResource = async () => {
        const id = router.query.id as string
        if (!id) return
        const resource = await GlossaryService.get(id)
        // setTimeout(() => {
        setResource(resource)
        if (!resource || !resource.id) {
            toast('Conteúdo não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/glossary'), 4000)
        }

        formRef.current.setData(resource)

        // }, 1000)



    }

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(1),
            description: Yup.string().required().min(3),
            discipline: Yup.string().required().uuid('este campo necessita ser preenchido'),
            // subject: Yup.string().required().uuid('este campo necessita ser preenchido'),
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                await GlossaryService.update(router.query.id as string, data)
                setIsLoading(false)
                toast("Conteúdo atualizado com sucesso!", { type: 'success' })
            } catch (error) {
                setIsLoading(false)
                toast(error.response.data.message, { type: 'error' })
            }
        }
    }

    return <AppLeftNavigation>
        <LoadingWrapper isLoading={!resource}>
            <div className="row m-b-20">
                <div className="col-md-12">
                    <div className="title-wrap">
                        <h2 className="title-5 text-center">
                            <i className="fa fa-edit mr-2"></i> Editar conteúdo
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
                                            <Input label="Termo:" name="name" />
                                        </div>
                                        <div className="col-md-12">
                                            <RichTextEditor name="description" label="Descrição:" onSave={() => formRef.current.submitForm()} />
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

export default UpdateGlossaryPage