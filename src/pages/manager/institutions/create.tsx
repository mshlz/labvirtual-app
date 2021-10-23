import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import router from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { InstitutionService } from "../../../services/InstitutionService"

const CreateInstitutionPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = useForm()

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            await InstitutionService.create(data)
            toast("Instituição criada com sucesso!", { type: 'success' })
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }


    return <AdminLayout>
        <PageHeader
            title="Criar nova instituição"
            onBack={() => router.push('/manager/institutions')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas">
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome da instituição" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Sigla" name="acronym" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout>
}

export default CreateInstitutionPage