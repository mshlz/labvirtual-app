import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { DisciplineService } from "../../../services/DisciplineService"
import { SubjectService } from "../../../services/SubjectService"

const CreateSubjectPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = useForm()
    const [disciplines, setDisciplines] = useState([])
    const router = useRouter()

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
                await SubjectService.create(data)
                toast("Assunto criado com sucesso!", { type: 'success' })
            } catch (error) {
                alert(error.response.data.message)
            } finally {
                setIsSubmitting(false)
            }
    }

    return <AdminLayout>
        <PageHeader
            title="Criar novo assunto"
            onBack={() => router.push('/manager/subjects')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas">
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Nome do assunto" name="name" rules={[{ required: true, min: 3 }]}>
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
                        {disciplines.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </AdminLayout>
}

export default CreateSubjectPage