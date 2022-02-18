import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Space } from "antd"
import { useState, useEffect } from 'react'
import { useForm } from "antd/lib/form/Form"
import { useApp } from "../../../context/AppContext"
import { AuthService } from "../../../services/AuthService"
import router from "next/router"
import Link from "next/link"
import { transformResponseError } from "../../../utils/transformResponseError"

export const LoginForm = () => {
    const [form] = useForm(null)
    const [isLoading, setIsLoading] = useState(false)
    const { isLoggedIn, login } = useApp()

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/')
        }
    })

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await AuthService.login(data)
            login(response.data)
        }
        catch (err) {
            let error = err.response
            if (error.status == 422) {
                form.setFields(transformResponseError(error.data))
            } else if (error.status == 401) {
                form.setFields([{ name: 'email', errors: [error.data.message] }])
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
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
        >
            <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
            <Input.Password
                prefix={<LockOutlined />}
                placeholder="Senha"
            />
        </Form.Item>
        {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

            
        </Form.Item> */}

        <Form.Item noStyle>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
                Entrar
            </Button>


            {/* <Divider children={<Typography.Text type="secondary" style={{ fontSize: '14px' }}>OU</Typography.Text>} />

            <Button
                type="default"
                // shape="round"
                icon={<FontAwesomeIcon icon={faGoogle} style={{ marginRight: '9px' }} />}
                block
            >
                Entrar com Google
            </Button> */}

        </Form.Item>

        <Divider />

        <Space split={'•'} style={{ width: '100%', justifyContent: 'center' }}>
            <Link href="/auth/reset-password"><a>Esqueceu sua senha?</a></Link>
            <Link href="/auth/register"><a>Criar uma conta!</a></Link>
        </Space>

    </Form>)
}
