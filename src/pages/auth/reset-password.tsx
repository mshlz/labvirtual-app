import { Form } from '@unform/web'
import Link from 'next/link'
import { useRef } from 'react'
import * as Yup from 'yup'
import { Button } from '../../components/UI/Button'
import { Input } from '../../components/UI/Input'
import { ValidateForm } from '../../plugins/validation/FormValidator'

const ResetPasswordPage = (props) => {
  const formRef = useRef(null)

  const handleSubmit = async (data) => {
    const isValid = await ValidateForm({
      email: Yup.string().required().email()
    }, data, formRef)

    if (!isValid) {
      return console.error('invalid')
    }

    console.log('valid')
  }

  return (<div className="page-wrapper">
    <div className="page-content--bge5">
      <div className="container">
        <div className="login-wrap">
          <div className="login-content">
            <h3>Recuperar sua conta</h3>
            <p className="mt-1">Insira o email de sua conta que enviaremos instruções para recuperá-la.</p>
            <div className="login-form mt-2">
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input name="email" placeholder="Email da sua conta" autoComplete="off" />
                <div className="d-flex justify-content-end">
                  <Link href="/auth"><a className="btn btn-light mr-2">Voltar</a></Link>
                  <Button color='success'>Enviar</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default ResetPasswordPage