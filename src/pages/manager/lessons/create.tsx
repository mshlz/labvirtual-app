import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../../components/UI/Button"
import { Input } from "../../../components/UI/Input"
import Select from "../../../components/UI/Select"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../services/DisciplineService"
import { LessonService } from "../../../services/LessonService"
import { SubjectService } from "../../../services/SubjectService"

const CreateLessonPage = () => {
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disciplines, setDisciplines] = useState([])
    const [subjects, setSubjects] = useState([])
    const router = useRouter()

    useEffect(() => {
        loadDependencies()
    }, [])

    const loadDependencies = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines)
    }

    const loadSubjects = async (discipline_id: string) => {
        if (!discipline_id) return
        triggerClearSelect()
        const subjects = await SubjectService.getAllFromDiscipline(discipline_id)
        setSubjects(subjects)
    }
    const triggerClearSelect = () => null

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            discipline: Yup.string().required().uuid('este campo necessita ser preenchido'),
            subject: Yup.string().required().uuid('este campo necessita ser preenchido'),
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                await LessonService.create(data)
                setIsLoading(false)
                toast("Conteúdo criado com sucesso!", { type: 'success' })
                setTimeout(() => {
                    router.push('/manager/lessons')
                }, 2000);
            } catch (error) {
                setIsLoading(false)
                alert(error.response.data.message)
            }
        }
    }

    return <AppLeftNavigation>
        <div className="row m-b-20">
            <div className="col-md-12">
                <div className="title-wrap">
                    <h2 className="title-5 text-center">
                        <i className="fa fa-plus mr-2"></i> Novo conteúdo
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
                                        <Input label="Título do conteúdo:" name="name" />
                                    </div>
                                    <div className="col-md-12">
                                        <Select
                                            label="Disciplina:"
                                            name="discipline"
                                            onChange={e => loadSubjects(e?.value)}
                                            options={disciplines.map(e => ({ label: e.name, value: e.id }))}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <Select
                                            label="Assunto:"
                                            name="subject"
                                            clear={triggerClearSelect}
                                            options={subjects?.map(e => ({ label: e.name, value: e.id }))}
                                        />
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
    </AppLeftNavigation >
}

export default CreateLessonPage