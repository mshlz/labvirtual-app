import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { SimulatorService } from "../../../../services/SimulatorService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { ImagePicker } from "../../../UI/ImagePicker"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"

interface ISimulatorFormProps {
    simulatorId?: string
}

export const SimulatorEditForm = ({ simulatorId: id }: ISimulatorFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [simulatorId, setSimulatorId] = useState(id)
    const [disciplines, setDisciplines] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        loadDisciplines()

        if (simulatorId) loadSimulator()
    }, [])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadSubjects = async (disciplines: string) => {
        if (!disciplines) return
        const subjects = await SubjectService.getFromDisciplines(disciplines)
        setSubjects(subjects)
    }

    const handleValuesChange = (changes) => {
        if (changes.discipline) {
            loadSubjects(changes.discipline)
            form.resetFields(['subject'])
        }
    }

    const loadSimulator = async () => {
        setIsLoading(true)

        const simulator = await SimulatorService.get(simulatorId)

        if (!simulator || !simulator._id) {
            toast('Conteúdo não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/simulators'), 4000)
        }

        if (Array.isArray(simulator.disciplines) && typeof simulator.disciplines[0] !== 'string') {
            simulator.disciplines = simulator.disciplines.map(v => v._id)
        }

        await loadSubjects(simulator.disciplines)

        form.setFieldsValue(simulator)

        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            if (simulatorId)
                await SimulatorService.update(simulatorId, data)
            else {
                const result = await SimulatorService.create(data)
                setSimulatorId(result._id)
            }

            toast(`Simulador ${simulatorId ? 'atualizado' : 'criado'} com sucesso!`, { type: 'success' })
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
            title={simulatorId ? "Editar conteúdo" : "Criar novo conteúdo"}
            onBack={() => router.push('/manager/simulators')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onValuesChange={handleValuesChange}>
                <Form.Item label="Icone" name="icon">
                    <ImagePicker />
                </Form.Item>
                <Form.Item label="Nome do conteúdo" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Disciplina" name="disciplines" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        placeholder="Selecione uma disciplina"
                        optionFilterProp="children"
                        mode="multiple"
                    >
                        {disciplines.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Assunto" name="subjects" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        placeholder="Selecione um assunto"
                        optionFilterProp="children"
                        mode="multiple"
                    >
                        {subjects.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Conteúdo" name="content">
                    <RichTextSunEditor onSave={() => form.submit()} />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </>
}