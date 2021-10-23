import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../../layouts/AdminLayout"
import { InstitutionService } from "../../../../services/InstitutionService"

const UpdateInstitutionPage = () => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadResource()
    }, [router])

    const loadResource = async () => {
        setIsLoading(true)

        const id = router.query.id as string
        if (!id) return

        const institution = await InstitutionService.get(id)

        if (!institution || !institution._id) {
            toast('Instituição não encontrada!', { type: 'error' })
            return setTimeout(() => router.push('/manager/institutions'), 4000)
        }

        form.setFieldsValue(institution)
        setIsLoading(false)
    }

    const handleSubmit = async (data) => {

        try {
            setIsSubmitting(true)
            const id = router.query.id as string
            await InstitutionService.update(id, data)
            toast("Instituição atualizada com sucesso!", { type: 'success' })
        } catch (error) {
            toast(error.response.data.message, { type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Editar instituição"
            onBack={() => router.push('/manager/institutions')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas" loading={isLoading}>
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
    </AdminLayout >
}

export default UpdateInstitutionPage