import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { ImagePicker } from "../../components/UI/ImagePicker"
import { useApp } from "../../context/AppContext"
import { AdminLayout } from "../../layouts/AdminLayout"

const ProfilePage = () => {
  const router = useRouter()
  const { user } = useApp()
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      photo: null,
    })
  }, [])

  return (
    <AdminLayout>
      <PageHeader title="Perfil" onBack={() => router.push("/")} />
      <Card>
        <Form form={form} layout="vertical" onFinish={() => alert()}>
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

export default ProfilePage
