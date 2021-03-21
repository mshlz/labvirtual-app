import { Form } from "@unform/web"
import Link from "next/link"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../../components/UI/Button"
import { Input } from "../../../components/UI/Input"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../plugins/validation/FormValidator"
import { DisciplineService } from "../../../services/DisciplineService"

const CreateDisciplinePage = () => {
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const createDiscipline = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3)
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                await DisciplineService.create(data)
                setIsLoading(false)
                toast("Disciplina criada com sucesso!", { type: 'success' })
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
                        <i className="fa fa-plus mr-2"></i> Nova disciplina
                    </h2>
                    <Link href="/manager/disciplines">
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
                                <Form ref={formRef} onSubmit={createDiscipline} className="row">
                                    <div className="col-12">
                                        <h4>Informações básicas</h4>
                                        <hr />
                                    </div>
                                    <div className="col-md-12">
                                        <Input label="Nome da disciplina:" name="name" />
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

export default CreateDisciplinePage