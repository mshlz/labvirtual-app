import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import router from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { DisciplineService } from "../../../services/DisciplineService"

const CreateDisciplinePage = () => {
    const [form] = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            await DisciplineService.create(data)
            toast("Disciplina criada com sucesso!", { type: 'success' })
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Criar nova disciplina"
            onBack={() => router.push('/manager/disciplines')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas">
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome da disciplina" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout>
}

export default CreateDisciplinePage