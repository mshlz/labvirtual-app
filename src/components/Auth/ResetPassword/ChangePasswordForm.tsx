import { LockOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Space } from "antd"
import { useForm } from "antd/lib/form/Form"
import Link from "next/link"
import router from "next/router"
import { useEffect, useState } from 'react'
import { useApp } from "../../../context/AppContext"
import { AuthService } from "../../../services/AuthService"
import { transformResponseError } from "../../../utils/transformResponseError"

interface IChangePasswordFormProps {
    tokenId: string
    tokenCode: string
    onFinish: (success: boolean) => void
}

export const ChangePasswordForm = ({ tokenId, tokenCode, onFinish }: IChangePasswordFormProps) => {
    const [form] = useForm(null)
    const [isLoading, setIsLoading] = useState(false)
    const { isLoggedIn } = useApp()

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/')
        }
    }, [])

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true)
            const result = await AuthService.resetPassword({
                ...data,
                tokenId,
                code: tokenCode
            })

            onFinish(result.data)
        }
        catch (err) {
            let error = err.response
            if (error.status == 422) {
                form.setFields(transformResponseError(error.data))
            } else if (error.data.message) {
                form.setFields([{ name: 'password', errors: [error.data.message] }])
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (<Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
    >
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
        >
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
        </Form.Item>
        <Form.Item
            name="password_confirm"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
        >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirmação de Senha" />
        </Form.Item>

        <Form.Item noStyle>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
                Enviar
            </Button>
        </Form.Item>

        <Divider />

        <Space style={{ width: '100%', justifyContent: 'center' }}>
            <span>Já tem uma conta? </span>
            <Link href="/auth/login"><a>Faça login aqui</a></Link>
        </Space>

    </Form>)
}
