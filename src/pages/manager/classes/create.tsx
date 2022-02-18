import { PageHeader, Card, Form, Input, Select, Button } from "antd"
import { useForm } from "antd/lib/form/Form"
import router from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { ValidateForm, Yup } from "../../../plugins/validation/FormValidator"
import { ClassService } from "../../../services/ClassService"
import { DisciplineService } from "../../../services/DisciplineService"

const CreateClassPage = () => {
    const [form] = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [disciplines, setDisciplines] = useState(null)

    useEffect(() => {
        loadDisciplines()
    }, [])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            await ClassService.create(data)
            toast("Turma criada com sucesso!", { type: 'success' })
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Criar nova turma"
            onBack={() => router.push('/manager/classes')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas">
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome da turma" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descrição" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Professor" name="teacher">
                    <Input disabled/>
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
    </AdminLayout>
}

export default CreateClassPage