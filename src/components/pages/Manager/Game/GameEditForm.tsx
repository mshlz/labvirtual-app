import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { GameService } from "../../../../services/GameService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"

interface IGameFormProps {
    gameId?: string
}

export const GameEditForm = ({ gameId: id }: IGameFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [gameId, setGameId] = useState(id)
    const [disciplines, setDisciplines] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        loadDisciplines()

        if (gameId) loadGame()
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
        if (changes.disciplines) {
            loadSubjects(changes.disciplines)
            form.resetFields(['subject'])
        }
    }

    const loadGame = async () => {
        setIsLoading(true)

        const game = await GameService.get(gameId)

        if (!game || !game._id) {
            toast('Conteúdo não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/games'), 4000)
        }

        if (game.disciplines && typeof game.disciplines[0] !== 'string') {
            game.disciplines = game.disciplines.map(v => v._id)
        }

        await loadSubjects(game.disciplines)

        form.setFieldsValue(game)

        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            if (gameId)
                await GameService.update(gameId, data)
            else {
                const result = await GameService.create(data)
                setGameId(result._id)
            }

            toast(`Jogo ${gameId ? 'atualizado' : 'criado'} com sucesso!`, { type: 'success' })
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
            title={gameId ? "Editar conteúdo" : "Criar novo conteúdo"}
            onBack={() => router.push('/manager/games')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onValuesChange={handleValuesChange}>
                <Form.Item label="Nome do conteúdo" name="name" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Disciplina" name="disciplines">
                    <Select
                        showSearch
                        placeholder="Selecione uma disciplina"
                        optionFilterProp="children"
                        mode="multiple"
                    >
                        {disciplines.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Assunto" name="subjects">
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