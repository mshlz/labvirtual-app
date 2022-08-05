import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Space } from "antd"
import { useForm } from "antd/lib/form/Form"
import Link from "next/link"
import router from "next/router"
import { useEffect, useState } from "react"
import { useApp } from "../../../context/AppContext"
import { AuthService } from "../../../services/AuthService"
import { transformResponseError } from "../../../utils/transformResponseError"

export const RegisterForm = () => {
  const [form] = useForm(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn, login } = useApp()

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/")
    }
  }, [])

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true)
      await AuthService.register({
        ...data,
        type: "student",
      })

      const loginResult = await AuthService.login({
        email: data.email,
        password: data.password,
      })
      login(loginResult.data)
    } catch (err) {
      let error = err.response
      if (error.status == 422) {
        form.setFields(transformResponseError(error.data))
      } else if (error.status == 401) {
        form.setFields([{ name: "email", errors: [error.data.message] }])
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Nome completo" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
      </Form.Item>
      <Form.Item
        name="password_confirm"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirme a Senha"
        />
      </Form.Item>

      <Form.Item noStyle>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Registrar
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

      <Space style={{ width: "100%", justifyContent: "center" }}>
        <span>Já tem uma conta? </span>
        <Link href="/auth/login">
          <a>Faça login aqui</a>
        </Link>
      </Space>
    </Form>
  )
}
