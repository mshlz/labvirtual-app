import { Scope } from "@unform/core"
import { Form } from "@unform/web"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { LoadingWrapper } from "../../components/Loading/Loading"
import { Button } from "../../components/UI/Button"
import { Input } from "../../components/UI/Input"
import { AdminLayout } from "../../layouts/AdminLayout"
import { ValidateForm, Yup } from "../../plugins/validation/FormValidator"
import { UserService } from "../../services/UserService"

const UpdateProfilePage = () => {
    const [user, setUser] = useState(null)
    const formRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => {
        const user = await UserService.getProfile()
        setUser(user)
        formRef.current.setData(user)
    }

    const updateProfile = async (data) => {
        const isValid = await ValidateForm({
            name: Yup.string().required().min(3),
            email: Yup.string().required().email(),
        }, data, formRef)

        if (isValid) {
            try {
                setIsLoading(true)
                await UserService.updateProfile(data)
                setIsLoading(false)
                toast("Perfil atualizado com sucesso!", { type: 'success' })
            } catch (error) {
                setIsLoading(false)
                alert(error.response.data.message)
            }
        }
    }

    return <AdminLayout>
        <LoadingWrapper isLoading={!user}>
            <div className="row m-b-20">
                <div className="col-md-12">
                    <div className="title-wrap">
                        <h2 className="title-5 text-center">
                            <i className="fa fa-tasks"></i> Editar perfil
                    </h2>
                        <Link href="/profile">
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
                                    <Form ref={formRef} onSubmit={updateProfile} className="row">
                                        <div className="col-12">
                                            <h4>Dados pessoais</h4>
                                            <hr />
                                        </div>
                                        <div className="col-md-7">
                                            <Input label="Nome:" name="name" />
                                        </div>

                                        <div className="col-md-5">
                                            <Input label="Celular:" name="phone" />
                                        </div>

                                        <div className="col-md-12">
                                            <Input label="Email:" name="email" />
                                        </div>

                                        <div className="col-md-12">
                                            <Input label="Data de nascimento:" name="birthdate" />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <h4>Informações acadêmicas</h4>
                                            <hr />
                                        </div>

                                        <div className="col-md-6">
                                            <Input label="Escola:" name="school" />
                                        </div>

                                        <div className="col-md-6">
                                            <Input label="Curso:" name="course" />

                                        </div>

                                        <div className="col-12 mt-3">
                                            <h4>Outras Informações</h4>
                                            <hr />
                                        </div>


                                        <Scope path="meta">
                                            <div className="col-md-6">
                                                <Input label="Facebook:" name="facebook" />
                                            </div>
                                            <div className="col-md-6">
                                                <Input label="Twitter:" name="twitter" />
                                            </div>
                                        </Scope>
                                        <div className="col-md-12">
                                            <Button color="success" block disabled={isLoading}>
                                                {isLoading && <i className="fa fa-spinner fa-spin mr-1"></i>}
                                            Salvar
                                            </Button>
                                        </div>
                                        {/* <div className="col-12 w-100 p-0">
                                        <div className="card m-0 ml-0 col-md-9" style={{ position: 'fixed', bottom: 0 }}>
                                            <div className="card-body">
                                                <Button color="success" block={true} > Salvar</Button>
                                            </div>
                                        </div>
                                        <div className=" card" style={{ position: 'fixed', width: 'inherit', border: '1px solid #000' }}>
                                        </div>
                                    </div> */}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    </AdminLayout >
}

export default UpdateProfilePage