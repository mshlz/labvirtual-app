import { NumberOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Space } from "antd"
import { useForm } from "antd/lib/form/Form"
import Link from "next/link"
import router from "next/router"
import { useEffect, useState } from "react"
import { useApp } from "../../../context/AppContext"
import { AuthService } from "../../../services/AuthService"

interface ICheckTokenCodeFormProps {
  tokenId: string
  onSuccess: (tokenCode: string) => void
}

export const CheckTokenCodeForm = ({
  tokenId,
  onSuccess,
}: ICheckTokenCodeFormProps) => {
  const [form] = useForm(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn } = useApp()

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/")
    }
  }, [])

  const handleSubmit = async (data) => {
    setIsLoading(true)
    const result = await AuthService.checkToken({ tokenId, code: data.code })

    if (result === true) onSuccess(data.code)
    else form.setFields([{ name: "code", errors: ["Código inválido"] }])

    setIsLoading(false)
  }

  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="code"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input
          prefix={<NumberOutlined />}
          placeholder="Código de recuperação"
        />
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
