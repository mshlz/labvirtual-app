import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { transformResponseError } from "../../../../utils/transformResponseError"

interface IDisciplineFormProps {
    disciplineId?: string
}

export const DisciplineEditForm = ({ disciplineId }: IDisciplineFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (disciplineId) loadDiscipline()
    }, [])

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

            if (disciplineId)
                await DisciplineService.update(disciplineId, data)
            else
                await DisciplineService.create(data)

            toast(`Disciplina ${disciplineId ? 'atualizada' : 'criada'} com sucesso!`, { type: 'success' })
        } catch (err) {
            let error = err.response
            if (error.status == 422) {
                form.setFields(transformResponseError(error.data))
            } else if (error.data.message) {
                form.setFields([{ name: 'name', errors: [error.data.message] }])
                toast(err.response.data.message, { type: 'error' })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return <>
        <PageHeader
            title={disciplineId ? "Editar disciplina" : "Criar nova disciplina"}
            onBack={() => router.push('/manager/disciplines')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Nome da disciplina" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </>
}