import { Card, PageHeader,Form, Input, Button } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../../layouts/AdminLayout"
import { DisciplineService } from "../../../../services/DisciplineService"

const UpdateDisciplinePage = () => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadDiscipline()
    }, [router])

    const loadDiscipline = async () => {
        setIsLoading(true)

        const id = router.query.id as string
        if (!id) return

        const discipline = await DisciplineService.get(id)

        if (!discipline || !discipline._id) {
            toast('Disciplina não encontrada!', { type: 'error' })
            return setTimeout(() => router.push('/manager/disciplines'), 4000)
        }

        form.setFieldsValue(discipline)
        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            const id = router.query.id as string
            await DisciplineService.update(id, data)
            toast("Disciplina atualizada com sucesso!", { type: 'success' })
        } catch (error) {
            toast(error.response.data.message, { type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Editar disciplina"
            onBack={() => router.push('/manager/disciplines')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome da disciplina" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout >
}

export default UpdateDisciplinePage