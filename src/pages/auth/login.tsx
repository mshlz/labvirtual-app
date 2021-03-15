import { Form } from '@unform/web'
import Link from 'next/link'
import Router from 'next/router'
import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Button } from '../../components/UI/Button'
import { Checkbox } from '../../components/UI/Checkbox'
import { Input } from '../../components/UI/Input'
import { useApp } from '../../context/AppContext'
import { ValidateForm } from '../../plugins/validation/FormValidator'
import { AuthService } from '../../services/AuthService'

const LoginPage = (props) => {
  const formRef = useRef(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signed, login } = useApp()

  const handleSubmit = async (data) => {
    setError(null)

    const isValid = await ValidateForm({
      email: Yup.string().required().email(),
      password: Yup.string().required()
    }, data, formRef)

    if (!isValid) return

    try {
      setIsLoading(true)

      const res = await AuthService.login(data)
      login(res.data)

    }
    catch (err) {
      setIsLoading(false)
      let error = err.response.data
      // if (error.status == 422) return formRef.current.setErrors(error.data) // TODO validation array from server
      return setError(error.message)
    }
  }

  return (<div className="page-wrapper">
    <div className="page-content--bge5">
      <div className="container">
        <div className="login-wrap">
          <div className="login-content">
            <div className="login-logo">
              <Link href="/">
                <img src="/assets/images/logo.png" />
              </Link>
            </div>
            <div className="login-form">

              <Form ref={formRef} onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger mt-2" role="alert">
                  {error}
                </div>}
                <Input name="email" label="Email" placeholder="Seu email" />
                <Input name="password" label="Senha" placeholder="Sua senha" type="password" />
                <div className="login-checkbox">
                  <Checkbox name="remember" label="Manter conectado" />
                  <label>
                    <Link href="/auth/reset-password">Esqueceu sua senha?</Link>
                  </label>
                </div>
                <Button color="success" block disabled={isLoading}>
                  {isLoading && <i className="fa fa-spinner fa-spin mr-1"></i>}
                  Login
                </Button>

                {/* <div className="social-login-content">
                  <div className="social-button">
                    <Button color='blue' cssClasses="m-b-10" block>Entrar com Facebook</Button>
                    <Button color='blue2' block>Entrar com Twitter</Button>
                  </div>
                </div> */}
              </Form>

              <div className="register-link">
                <p>
                  Não é registrado?&nbsp;
                  <Link href="/auth/register">Crie uma conta aqui!</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default LoginPage