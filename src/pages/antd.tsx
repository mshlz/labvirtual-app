import {
  Button,
  Calendar,
  Card,
  Col,
  Form,
  Input,
  PageHeader,
  Row,
  Table,
  Tag,
  Typography,
} from "antd"
import { useForm } from "antd/lib/form/Form"
import { useEffect, useState } from "react"
import { ImagePicker } from "../components/UI/ImagePicker"
import { useApp } from "../context/AppContext"
import { AdminLayout } from "../layouts/AdminLayout"
const { Meta } = Card

const data = [
  {
    title: "Atividade 1",
  },
  {
    title: "Atividade 2",
  },
  {
    title: "Atividade 3",
  },
  {
    title: "Atividade 4",
  },
  {
    title: "Atividade 5",
  },
  {
    title: "Atividade 6",
  },
]

const AntdTest = () => {
  const [s, ss] = useState()
  const { user } = useApp()
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      photo: null
    })
  }, [])
  return (
    <AdminLayout>
      <PageHeader title="Perfil" />
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={() => alert()}
        >
          <Form.Item label="Foto" name="photo">
            <ImagePicker />
          </Form.Item>

          <Form.Item label="Nome" name="name">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </AdminLayout>
  )
}

export default AntdTest
