import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { ImagePicker } from "../../../UI/ImagePicker"

interface ISubjectFormProps {
    subjectId?: string
}

export const SubjectEditForm = ({ subjectId }: ISubjectFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        loadDisciplines()
        
        if (subjectId) loadSubject()
    }, [])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadSubject = async () => {
        setIsLoading(true)

        const subject = await SubjectService.get(subjectId)

        if (!subject || !subject._id) {
            toast('Assunto não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/subjects'), 4000)
        }

        form.setFieldsValue(subject)
        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            if (subjectId)
                await SubjectService.update(subjectId, data)
            else
                await SubjectService.create(data)

            toast(`Assunto ${subjectId ? 'atualizado' : 'criado'} com sucesso!`, { type: 'success' })
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
            title={subjectId ? "Editar assunto" : "Criar novo assunto"}
            onBack={() => router.push('/manager/subjects')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Nome do assunto" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Icone" name="icon">
                    <ImagePicker />
                </Form.Item>
                <Form.Item label="Disciplina" name="discipline" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        placeholder="Selecione uma disciplina"
                        optionFilterProp="children"
                    >
                        {disciplines.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </>
}