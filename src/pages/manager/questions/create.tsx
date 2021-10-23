import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Form, Input, PageHeader, Radio, Select, Space, Switch, Tooltip, Typography } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RichTextSunEditor } from "../../../components/UI/RichTextSunEditor"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { DisciplineService } from "../../../services/DisciplineService"
import { QuestionService } from "../../../services/QuestionService"
import { SubjectService } from "../../../services/SubjectService"

const CreateQuestionPage = () => {
    const [form] = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [disciplines, setDisciplines] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [type, setType] = useState(null)
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
        if (changes.disciplines) {
            loadSubjects(changes.disciplines)
        }
        else if (changes.type) {
            setType(changes.type)
        }
    }

    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            await QuestionService.create(data)
            toast("Questão criada com sucesso!", { type: 'success' })
            setTimeout(() => {
                router.push('/manager/questions')
            }, 2000);
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return <AdminLayout>
        <PageHeader
            title="Criar nova questão"
            onBack={() => router.push('/manager/questions')}
        // breadcrumb={{ routes }}
        // subTitle="This is a subtitle"
        />
        <Card title="Informações básicas">
            <Form name="basic" form={form} layout="vertical" onValuesChange={handleValuesChange} onFinish={handleSubmit} onFinishFailed={null}>
                <Form.Item label="Disciplina" name="disciplines" rules={[{ required: true }]}>
                    <Select
                        mode="tags"
                        showSearch
                        placeholder="Selecione uma disciplina"
                        optionFilterProp="children"
                    >
                        {disciplines?.map(v => <Select.Option value={v._id}>{v.name}</Select.Option>)}
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
                        {subjects?.map(v => <Select.Option value={v._id}>{v.name} <Typography.Text type='secondary'>- {disciplines?.find(d => d._id === v.discipline)?.name}</Typography.Text></Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="question">
                    {(...args) => console.log(args)}
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

                    {type === 'dissertative'
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
                                        {fields.map((field, index) => (
                                            <Form.Item key={field.key}>
                                                <Card
                                                    title={`Alternativa #${index + 1}`}
                                                    extra={
                                                        <Space>
                                                            <Tooltip title="Esta alternativa é correta?">
                                                                <Form.Item name={[field.name, "correct"]} valuePropName="checked" noStyle>
                                                                    <Switch checkedChildren="Correta" unCheckedChildren="Incorreta" />
                                                                </Form.Item>
                                                            </Tooltip>

                                                            <Tooltip title="Remover alternativa">
                                                                <Button type="text" shape="circle" icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                                                            </Tooltip>
                                                        </Space>
                                                    }
                                                    style={{ boxShadow: "rgb(229 229 229 / 60%) 5px 8px 24px 5px" }}
                                                >
                                                    <Form.Item name={[field.name, "text"]}>
                                                        <RichTextSunEditor buttons={[
                                                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                                                            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align'],
                                                            ['link', 'image', 'showBlocks', 'codeView']
                                                        ]} />
                                                        {/* <QuillEditor /> */}
                                                    </Form.Item>

                                                </Card>
                                            </Form.Item>
                                        ))}
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
    </AdminLayout >
}

export default CreateQuestionPage