import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../../layouts/AdminLayout"
import { ClassService } from "../../../../services/ClassService"
import { DisciplineService } from "../../../../services/DisciplineService"


const UpdateClassPage = () => {
    const [form] = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [disciplines, setDisciplines] = useState(null)

    useEffect(() => {
        loadResource()
        loadDisciplines()
    }, [router])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadResource = async () => {
        const id = router.query.id as string
        if (!id) return
        const resource = await ClassService.get(id)

        if (!resource || !resource._id) {
            toast('Turma não encontrada!', { type: 'error' })
            return setTimeout(() => router.push('/manager/classes'), 4000)
        }

        form.setFieldsValue(resource)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            const id = router.query.id as string
            await ClassService.update(id, data)
            toast("Turma atualizada com sucesso!", { type: 'success' })
        } catch (error) {
            toast(error.response.data.message, { type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Editar turma"
            onBack={() => router.push('/manager/classes')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome da turma" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descrição" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Professor" name="teacher">
                    <Input disabled />
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
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout >
}

export default UpdateClassPage