import { Form } from "@unform/web"
import Link from "next/link"
import Router from "next/router"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import * as Yup from 'yup'
import { Button } from "../../components/UI/Button"
import { Input } from "../../components/UI/Input"
import { ValidateForm } from "../../plugins/validation/FormValidator"
import { AuthService } from "../../services/AuthService"

const RegisterPage = (props) => {
  const formRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [isTeacher, setIsTeacher] = useState(false)

  const handleSubmit = async (data) => {
    const isValid = await ValidateForm({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
      password_verify: Yup.string().oneOf([Yup.ref('password'), null], "as senhas devem ser iguais"),
    }, data, formRef)

    if (!isValid) {
      return console.error('invalid')
    }

    data.type = isTeacher ? 'teacher' : 'student'

    try {
      setIsLoading(true)
      await AuthService.register(data)
      toast('Registro efetuado com sucesso!', { type: 'success' })
      setTimeout(() => {
        Router.push('/auth')
      }, 1000)
    }
    catch (err) {
      setIsLoading(false)
      let error = err.response.data
      // if (error.status == 422) return formRef.current.setErrors(error.data) // TODO validation array from server
      return setError(error.message)
    }
  }

  return (<div className="page-wrapper ">
    <div className="page-content--bge5">
      <div className="container">
        <div className="register-wrap">
          <div className="login-content">
            <div className="login-logo row m-b-30">
              <button
                type="button"
                onClick={() => setIsTeacher(false)}
                className={"btn " + (!isTeacher ? 'btn-success active' : 'btn-light')}
              >
                Sou Aluno
              </button>
              <Link href="/">
                <img src="/assets/images/logo.png" />
              </Link>
              <button
                type="button"
                onClick={() => setIsTeacher(true)}
                className={"btn " + (isTeacher ? 'btn-success active' : 'btn-light')}
              >
                Sou Professor
              </button>
            </div>
            <div className="login-form">
              <div id="form">
                <Form ref={formRef} onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger mt-2" role="alert">
                    {error}
                  </div>}
                  <div className="row">
                    <div className="col-md-6">
                      <Input name="name" label="Nome" placeholder="Nome completo" />
                    </div>
                    <div className="col-md-6">
                      <Input name="email" label="Email" placeholder="Seu email" />
                    </div>

                    <div className="col-md-6">
                      <Input name="password" label="Senha" placeholder="Sua senha" type="password" />
                    </div>
                    <div className="col-md-6">
                      <Input name="password_verify" label="Confirme sua senha" placeholder="Confirme sua senha" type="password" />
                    </div>
                  </div>
                  <Button color="success" block disabled={isLoading}>
                    {isLoading && <i className="fa fa-spinner fa-spin mr-1"></i>}
                    Registrar
                  </Button>
                  {/* <button className="au-btn--block au-btn--green m-b-20" type="submit">Registrar</button> */}
                  {/* <div className="social-login-content">
                    <div className="social-button">
                      <button className="au-btn--block au-btn--blue m-b-20">registrar com facebook</button>
                      <button className="au-btn--block au-btn--blue2">registrar com twitter</button>
                    </div>
                  </div> */}

                </Form>
                <div className="register-link">
                  <p>
                    Já tem uma conta?&nbsp;<Link href="/auth/login">Faça login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="copyright">
            <p></p>
          </div>
        </div>
      </div>
    </div>

  </div>)
}

export default RegisterPage