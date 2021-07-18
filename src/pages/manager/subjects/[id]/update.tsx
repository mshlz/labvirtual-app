import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { LoadingWrapper } from "../../../../components/Loading/Loading"
import { Button } from "../../../../components/UI/Button"
import { Input } from "../../../../components/UI/Input"
import Select from "../../../../components/UI/Select"
import { AppLeftNavigation } from "../../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../../services/DisciplineService"
import { SubjectService } from "../../../../services/SubjectService"


const UpdateSubjectPage = () => {
    const [resource, setResource] = useState(null)
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        loadResource()
        loadDisciplines()
    }, [router])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadResource = async () => {
        const id = router.query.id as string
        if (!id) return
        const resource = await SubjectService.get(id)
        setResource(resource)

        if (!resource || !resource.id) {
            toast('Assunto não encontrada!', { type: 'error' })
            return setTimeout(() => router.push('/manager/classes'), 4000)
        }

        formRef.current.setData(resource)
    }

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            discipline: Yup.string().required().uuid('este campo deve ser preenchido')
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                const id = router.query.id as string
                await SubjectService.update(id, data)
                setIsLoading(false)
                toast("Assunto atualizada com sucesso!", { type: 'success' })
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
                            <i className="fa fa-edit mr-2"></i> Editar assunto
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
                                            <Input label="Nome do assunto:" name="name" />
                                        </div>
                                        <div className="col-md-12">
                                            <Select label="Disciplina:" name="discipline" options={disciplines.map(e => ({ label: e.name, value: e.id }))} />
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

export default UpdateSubjectPage