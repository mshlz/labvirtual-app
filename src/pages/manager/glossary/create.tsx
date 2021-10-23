import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RichTextSunEditor } from "../../../components/UI/RichTextSunEditor"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { DisciplineService } from "../../../services/DisciplineService"
import { GlossaryService } from "../../../services/GlossaryService"
import { SubjectService } from "../../../services/SubjectService"

const CreateGlossaryItemPage = () => {
    const [form] = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [disciplines, setDisciplines] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const router = useRouter()

    useEffect(() => {
        loadDependencies()
    }, [])

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
            await GlossaryService.create(data)
            toast("Item criado com sucesso!", { type: 'success' })
            setTimeout(() => {
                router.push('/manager/glossary')
            }, 2000);
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Criar novo item do glossário"
            onBack={() => router.push('/manager/glossary')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas">
            <Form name="basic" form={form} layout="vertical" onValuesChange={handleValuesChange} onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome do termo" name="name" rules={[{ required: true, min: 1 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descrição" name="description" rules={[{ required: true }]}>
                    <RichTextSunEditor />
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
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout >
}

export default CreateGlossaryItemPage