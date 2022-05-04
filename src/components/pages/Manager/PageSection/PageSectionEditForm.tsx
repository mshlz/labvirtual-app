import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { PageSectionService } from "../../../../services/PageSectionService"
import { transformResponseError } from "../../../../utils/transformResponseError"

interface IPageSectionFormProps {
    pageSectionId?: string
}

export const PageSectionEditForm = ({ pageSectionId: id }: IPageSectionFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [sectionId, setSectionId] = useState(id)

    useEffect(() => {
        if (sectionId) loadPageSection()
    }, [])

    const loadPageSection = async () => {
        setIsLoading(true)

        const id = router.query.id as string
        if (!id) return

        const section = await PageSectionService.get(id)

        if (!section || !section._id) {
            toast('Seção não encontrada!', { type: 'error' })
            return setTimeout(() => router.push('/manager/page-sections'), 4000)
        }

        form.setFieldsValue(section)
        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            if (sectionId) {
                await PageSectionService.update(sectionId, data)
            }
            else {
                const result = await PageSectionService.create(data)
                setSectionId(result._id)
            }

            toast(`Seção ${sectionId ? 'atualizada' : 'criada'} com sucesso!`, { type: 'success' })
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
            title={sectionId ? "Editar seção" : "Criar nova seção"}
            onBack={() => router.push('/manager/page-sections')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Nome da seção" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descrição" name="description">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </>
}