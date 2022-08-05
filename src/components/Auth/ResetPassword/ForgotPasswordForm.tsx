import { MailOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Space } from "antd"
import { useForm } from "antd/lib/form/Form"
import Link from "next/link"
import router from "next/router"
import { useEffect, useState } from "react"
import { useApp } from "../../../context/AppContext"
import { AuthService } from "../../../services/AuthService"
import { transformResponseError } from "../../../utils/transformResponseError"

interface IForgotPasswordFormProps {
  onSuccess: (tokenId: string) => void
}

export const ForgotPasswordForm = ({ onSuccess }: IForgotPasswordFormProps) => {
  const [form] = useForm(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn } = useApp()

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/")
    }
  }, [])

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true)
      const result = await AuthService.forgotPassword(data)
      onSuccess(result.data.tokenId)
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
        name="email"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item noStyle>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          Enviar
        </Button>
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
