import { Form } from "@unform/web"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../../components/UI/Button"
import { Input } from "../../../components/UI/Input"
import Select from "../../../components/UI/Select"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../plugins/validation/FormValidator"
import { ClassService } from "../../../services/ClassService"
import { DisciplineService } from "../../../services/DisciplineService"

const CreateClassPage = () => {
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disciplines, setDisciplines] = useState(null)

    useEffect(() => {
        loadDisciplines()
    }, [])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines)
    }

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            discipline: Yup.string().required().uuid('este campo necessita ser preenchido')
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                await ClassService.create(data)
                setIsLoading(false)
                toast("Turma criada com sucesso!", { type: 'success' })
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
                        <i className="fa fa-plus mr-2"></i> Nova turma
                    </h2>
                    <Link href="/manager/classes">
                        <Button color="light"><i className="fa fa-arrow-left mr-2"></i>Voltar</Button>
                    </Link>
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
                                        <Input label="Nome da turma:" name="name" />
                                    </div>
                                    <div className="col-md-12">
                                        {disciplines && <Select label="Disciplina:" name="discipline" options={disciplines.map(e => ({ label: e.name, value: e.id }))} />}
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

export default CreateClassPage