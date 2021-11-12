import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RichTextSunEditor } from "../../../../components/UI/RichTextSunEditor"
import { AdminLayout } from "../../../../layouts/AdminLayout"
import { DisciplineService } from "../../../../services/DisciplineService"
import { LessonService } from "../../../../services/LessonService"
import { SubjectService } from "../../../../services/SubjectService"


const UpdateLessonPage = () => {
    const [disciplines, setDisciplines] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadResource()
        loadDependencies()
    }, [router])


    const loadResource = async () => {
        setIsLoading(true)
        const id = router.query.id as string
        if (!id) return
        const resource = await LessonService.get(id)

        if (!resource || !resource._id) {
            toast('Conteúdo não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/lessons'), 4000)
        }

        resource.discipline = resource.discipline._id
        await loadSubjects(resource.discipline)

        form.setFieldsValue(resource)
        setIsLoading(false)
    }

    const loadDependencies = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadSubjects = async (discipline_id: string) => {
        if (!discipline_id) return
        const subjects = await SubjectService.getFromDisciplines(discipline_id)
        setSubjects(subjects)
    }

    const handleValuesChange = (changes) => {
        if (changes.discipline) {
            loadSubjects(changes.discipline)
            form.resetFields(['subject'])
        }

    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            await LessonService.update(router.query.id as string, data)
            toast("Conteúdo atualizado com sucesso!", { type: 'success' })
        } catch (error) {
            toast(error.response.data.message, { type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Editar conteúdo"
            onBack={() => router.push('/manager/lessons')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onValuesChange={handleValuesChange} onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome do conteúdo" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Disciplina" name="discipline" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        placeholder="Selecione uma disciplina"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {disciplines?.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Assunto" name="subject" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        placeholder="Selecione um assunto"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {subjects?.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Conteúdo" name="content">
                    <RichTextSunEditor onSave={() => form.submit()} />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout >
}

export default UpdateLessonPage