import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Space } from "antd"
import { useState, useEffect } from 'react'
import { useForm } from "antd/lib/form/Form"
import { useApp } from "../../../context/AppContext"
import { AuthService } from "../../../services/AuthService"
import router from "next/router"

export const LoginForm = () => {
    const [form] = useForm(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { signed, login } = useApp()

    useEffect(() => {
        if (signed) {
            router.push('/')
        }
    })

    const handleSubmit = async (data) => {
        setError(null)

        try {
            setIsLoading(true)
            const response = await AuthService.login(data)
            login(response.data)
        }
        catch (err) {
            let error = err.response.data
            if (error.status == 422) {
                const errorData = Object.entries(error.errors).map((key, val) => ([{ name: key, errors: val }]))
                form.setFields(errorData as any)
                return
            } else if (error.status == 401) {
                form.setFields([{ name: 'email', errors: [error.message] }])
            }
            console.log(err.response)
            return setError(error.message)
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
            <a href="#">Esqueceu sua senha?</a>
            <a href="#">Criar uma conta!</a>
        </Space>

    </Form>)
}
