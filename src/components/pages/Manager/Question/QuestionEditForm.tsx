import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Form, Input, PageHeader, Radio, Select, Typography } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { QuestionService } from "../../../../services/QuestionService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"
import { AlternativeItem } from "./components/AlternativeItem"

interface IQuestionFormProps {
    questionId?: string
}

export const QuestionEditForm = ({ questionId: id }: IQuestionFormProps) => {
    const [form] = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const [questionId, setQuestionId] = useState(id)
    const [questionType, setQuestionType] = useState(null)

    const [disciplines, setDisciplines] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        loadDisciplines()

        if (questionId) loadQuestion()
    }, [])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines.data)
    }

    const loadSubjects = async (disciplineIds: string|string[]) => {
        if (!disciplineIds) return
        const subjects = await SubjectService.getFromDisciplines(disciplineIds)
        setSubjects(subjects)
    }

    const handleValuesChange = (changes) => {
        if (changes.disciplines) {
            loadSubjects(changes.disciplines)
        }
        else if (changes.type) {
            setQuestionType(changes.type)
        }
    }

    const loadQuestion = async () => {
        setIsLoading(true)
        const question = await QuestionService.get(questionId)

        if (!question || !question._id) {
            toast('Questão não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/questions'), 4000)
        }

        await loadSubjects(question.disciplines)
        setQuestionType(question.type)
        form.setFieldsValue(question)

        setIsLoading(false)
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)

            if (questionId)
                await QuestionService.update(questionId, data)
            else {
                const result = await QuestionService.create(data)
                setQuestionId(result._id)
            }

            toast(`Questão ${questionId ? 'atualizada' : 'criada'} com sucesso!`, { type: 'success' })
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
            title={questionId ? "Editar questão" : "Criar nova questão"}
            onBack={() => router.push('/manager/questions')}
        />
        <Card title="Informações básicas" loading={isLoading}>
            <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit} onValuesChange={handleValuesChange}>
                <Form.Item label="Disciplina" name="disciplines" rules={[{ required: true }]}>
                    <Select
                        mode="tags"
                        showSearch
                        placeholder="Selecione uma disciplina"
                        optionFilterProp="children"
                    >
                        {disciplines.map(v => <Select.Option key={v._id} value={v._id}>{v.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Assunto" name="subjects" rules={[{ required: true }]}>
                    <Select
                        mode="tags"
                        allowClear
                        showSearch
                        placeholder="Selecione um assunto"
                        optionFilterProp="children"
                    >
                        {subjects.map(v =>
                            <Select.Option key={v._id} value={v._id}>
                                {v.name}{' '}
                                <Typography.Text type='secondary'>- {disciplines.find(d => d._id === v.discipline)?.name || ''}</Typography.Text>
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Form.Item label="Título da questão" name="name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Texto da questão (opcional)" name="text">
                        <RichTextSunEditor buttons={[
                            ['font', 'fontSize', 'formatBlock'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                            ['link', 'image', 'video', 'showBlocks', 'codeView']
                        ]} />
                    </Form.Item>

                    <Form.Item label="Tipo de alternativa" name="type" rules={[{ required: true }]}>
                        <Radio.Group options={[
                            { label: 'Dissertativa', value: 'DISSERTATIVE' },
                            { label: 'Múltipla escolha', value: 'SINGLE_CHOICE' },
                            { label: 'Múltipla escolha (multi resposta)', value: 'MULTIPLE_CHOICE' }
                        ]} />
                    </Form.Item>

                    {questionType === 'DISSERTATIVE'
                        ? <h5>Questão dissertativa</h5>
                        : <div className="form-group">
                            <h4 className="mb-2">Alternativas</h4>

                            <Form.List
                                name="alternatives"
                                rules={[
                                    {
                                        validator: async (_, alternatives) => {
                                            if (!alternatives || alternatives.length < 2) {
                                                return Promise.reject(new Error('Você precisa adicionar ao menos 2 alternativas'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.length === 0 && <Empty description="Não há alternativas" />}
                                        {fields.map((field, index) => <AlternativeItem key={field.key} index={index} field={field} remove={remove} />)}
                                        
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                icon={<PlusOutlined />}
                                            >
                                                Adicionar outra alternativa
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </div>
                    }

                </Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>Salvar</Button>
            </Form>
        </Card>
    </>
}