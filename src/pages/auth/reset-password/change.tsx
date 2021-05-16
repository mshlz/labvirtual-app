import { Form } from '@unform/web'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { Button } from '../../../components/UI/Button'
import { Input } from '../../../components/UI/Input'
import { ValidateForm } from '../../../plugins/validation/FormValidator'
import { AuthService } from '../../../services/AuthService'
import { delay } from '../../../utils/delay'

const ResetPasswordPage = (props) => {
    const formRef = useRef(null)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        
    }, [])

    const handleSubmit = async (data) => {
        const isValid = await ValidateForm({
            password: Yup.string().min(6).required()
        }, data, formRef)

        if (!isValid) {
            return console.error('invalid')
        }

        try {
            setIsLoading(true)
            await delay(1000)

            const result = await AuthService.resetPassword({ ...data, token: router.query.token })

            setShowForm(false)
        }
        catch (error) {
            toast("Erro: " + error.message, { type: 'error' })
        }
        finally {
            setIsLoading(false)
        }

    }

    return (<div className="page-wrapper">
        <div className="page-content--bge5">
            <div className="container">
                <div className="login-wrap">

                    {showForm ?
                        (<div className="login-content">
                            <h3>Recuperar sua conta</h3>
                            <p className="mt-1">Insira a nova senha de sua conta.</p>
                            <div className="login-form mt-2">
                                <Form ref={formRef} onSubmit={handleSubmit}>
                                    <Input name="password" placeholder="Nova senha" autoComplete="off" />
                                    <div className="d-flex justify-content-end">
                                        <Button color='success' isLoading={isLoading}>Enviar</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>)

                        :

                        (<div className="login-content">
                            <h3>Senha alterada com sucesso</h3>
                            <p className="mt-1">Um email foi enviado com instruções para recuperar sua conta.</p>
                            <div className="login-form mt-2">
                                <div className="d-flex justify-content-end">
                                    <Link href="/auth"><a className="btn btn-success mr-2">OK</a></Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </div>)
}

export default ResetPasswordPage