import { Form } from "@unform/web"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { AsyncSelect } from "../../../components/UI/AsyncSelect"
import { Button } from "../../../components/UI/Button"
import { Input } from "../../../components/UI/Input"
import Select from "../../../components/UI/Select"
// import AsyncSelect from "../../../components/UI/Select"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../services/DisciplineService"
import { SubjectService } from "../../../services/SubjectService"

const CreateSubjectPage = () => {
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disciplines, setDisciplines] = useState([])
    const router = useRouter()

    useEffect(() => {
        loadDisciplines()
    }, [])

    const loadDisciplines = async (query?: string) => {
        console.log(query)
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            discipline: Yup.string().required().uuid('este campo necessita ser preenchido')
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                await SubjectService.create(data)
                setIsLoading(false)
                toast("Assunto criado com sucesso!", { type: 'success' })
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
                        <i className="fa fa-plus mr-2"></i> Nova assunto
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
                                        <Input label="Nome do assunto:" name="name" />
                                    </div>
                                    <div className="col-md-12">
                                        <Select label="Disciplina:" name="discipline" options={disciplines.map(e => ({ label: e.name, value: e.id }))} />
                                        {/* <AsyncSelect label="Disciplina:" name="discipline" executeSearch={searchDiscipline}/> */}
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

export default CreateSubjectPage