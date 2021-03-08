import { Form } from '@unform/web'
import Link from 'next/link'
import { useRef } from 'react'
import * as Yup from 'yup'
import { Button } from '../../components/UI/Button'
import { Checkbox } from '../../components/UI/Checkbox'
import { Input } from '../../components/UI/Input'
import { ValidateForm } from '../../plugins/validation/FormValidator'

const LoginPage = (props) => {
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    const isValid = await ValidateForm({
      email: Yup.string().required().email(),
      password: Yup.string().required()
    }, data, formRef)

    if (!isValid) return

    console.log('valid')
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
                <Input name="email" label="Email" placeholder="seu@email.com" />
                <Input name="password" label="Senha" placeholder="••••••" type="password" />
                <div className="login-checkbox">
                  <Checkbox name="remember" label="Manter conectado" />
                  <label>
                    <Link href="/auth/reset-password">Esqueceu sua senha?</Link>
                  </label>
                </div>
                <Button color="success" block>Login</Button>

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