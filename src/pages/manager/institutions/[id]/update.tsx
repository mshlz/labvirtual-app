import { Form } from "@unform/web"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../../../components/UI/Button"
import { Input } from "../../../../components/UI/Input"
import { AppLeftNavigation } from "../../../../layouts/AppLeftNavigation"
import { ValidateForm, Yup } from "../../../../plugins/validation/FormValidator"
import { InstitutionService } from "../../../../services/InstitutionService"

interface Institution {
    id: string
    name: string
}

const UpdateInstitutionPage = () => {
    const [institution, setInstitution] = useState({} as Institution)
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadResource()
    }, [router])

    const loadResource = async () => {
        const id = router.query.id as string
        if (!id) return
        const institution = await InstitutionService.get(id)
        setInstitution(institution)

        if (!institution || !institution.id) {
            toast('Instituição não encontrada!', { type: 'error' })
            return setTimeout(() => router.push('/manager/institutions'), 4000)
        }

        formRef.current.setData(institution)
    }

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3)
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                const id = router.query.id as string
                await InstitutionService.update(id, data)
                setIsLoading(false)
                toast("Instituição atualizada com sucesso!", { type: 'success' })
            } catch (error) {
                setIsLoading(false)
                toast(error.response.data.message, { type: 'error' })
            }
        }
    }

    return <AppLeftNavigation>
        {institution ? <>
            <div className="row m-b-20">
                <div className="col-md-12">
                    <div className="title-wrap">
                        <h2 className="title-5 text-center">
                            <i className="fa fa-edit mr-2"></i> Editar instituição
                    </h2>
                        <Link href="/manager/institutions">
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
                                            <Input label="Nome da instituição:" name="name" />
                                        </div>
                                        <div className="col-md-12">
                                            <Input label="Sigla:" name="acronym" />
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
            </div> </> : <></>}
    </AppLeftNavigation >
}

export default UpdateInstitutionPage