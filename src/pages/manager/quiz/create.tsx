import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { SearchQuestionBox } from "../../../components/Quiz/SearchQuestion"
import { Button } from "../../../components/UI/Button"
import { Input } from "../../../components/UI/Input"
import Select from "../../../components/UI/Select"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../services/DisciplineService"
import { QuizService } from "../../../services/QuizService"
import { SubjectService } from "../../../services/SubjectService"

const CreateQuizPage = () => {
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disciplines, setDisciplines] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const router = useRouter()

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

    const handleSubmit = async (data) => {
        console.log("DATA", data)
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            discipline: Yup.string().required().uuid('este campo necessita ser preenchido'),
            subject: Yup.string().required().uuid('este campo necessita ser preenchido'),
        }, data, formRef)
        // return
        if (isValid) {
            try {
                setIsLoading(true)
                await QuizService.create(data)
                setIsLoading(false)
                toast("Question??rio criado com sucesso!", { type: 'success' })
                setTimeout(() => {
                    router.push('/manager/quiz')
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
                        <i className="fa fa-plus mr-2"></i> Novo question??rio
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
                                        <h4>Informa????es b??sicas</h4>
                                        <hr />
                                    </div>
                                    <div className="col-md-12">
                                        <Input label="T??tulo do question??rio:" name="name" />
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


                                    <div className="col-12 mt-2">
                                        <h4>Quest??es</h4>
                                        <hr />
                                    </div>
                                    <SearchQuestionBox />
                                    {/* <QuizCreateEditForm /> */}

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
    </AppLeftNavigation >
}

export default CreateQuizPage