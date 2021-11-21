import { Button, Card, Form, Input, PageHeader } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { InstitutionService } from "../../../../services/InstitutionService"
import { transformResponseError } from "../../../../utils/transformResponseError"

interface IInsitutionFormProps {
    institutionId?: string
}

export const InstitutionEditForm = ({ institutionId }: IInsitutionFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (institutionId) loadInstitution()
    }, [])

    const loadInstitution = async () => {
        setIsLoading(true)

        const institution = await InstitutionService.get(institutionId)

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

            if (institutionId)
                await InstitutionService.update(institutionId, data)
            else
                await InstitutionService.create(data)

            toast(`Instituição ${institutionId ? 'atualizada' : 'criada'} com sucesso!`, { type: 'success' })
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
            title={institutionId ? "Editar instituição" : "Criar nova instituição"}
            onBack={() => router.push('/manager/institutions')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Nome da instituição" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Sigla" name="acronym" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </>
}