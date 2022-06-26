import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { VideoService } from "../../../../services/VideoService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { ImagePicker } from "../../../UI/ImagePicker"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"

interface IVideoFormProps {
    videoId?: string
}

export const VideoEditForm = ({ videoId: id }: IVideoFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [videoId, setVideoId] = useState(id)
    const [disciplines, setDisciplines] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        loadDisciplines()

        if (videoId) loadVideo()
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
            form.resetFields(['subjects'])
        }
    }

    const loadVideo = async () => {
        setIsLoading(true)

        const video = await VideoService.get(videoId)

        if (!video || !video._id) {
            toast('Conteúdo não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/videos'), 4000)
        }

        if (Array.isArray(video.disciplines) && typeof video.disciplines[0] !== 'string') {
            video.disciplines = video.disciplines.map(v => v._id)
        }

        await loadSubjects(video.disciplines)

        form.setFieldsValue(video)

        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            if (videoId)
                await VideoService.update(videoId, data)
            else {
                const result = await VideoService.create(data)
                setVideoId(result._id)
            }

            toast(`Video ${videoId ? 'atualizado' : 'criado'} com sucesso!`, { type: 'success' })
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
            title={videoId ? "Editar conteúdo" : "Criar novo conteúdo"}
            onBack={() => router.push('/manager/videos')}
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