import React, { useEffect, useState } from "react"
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, List, message, Modal, Radio, Result, Row, Select, Space, Spin, Switch, Typography } from "antd"
import { QuestionService } from "../../../../services/QuestionService"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"
import { ClassworkService } from '../../../../services/ClassworkService'
import { useForm } from 'antd/lib/form/Form'
import { ClassTopicService } from '../../../../services/ClassTopicService'
import router from 'next/router'
import { delay } from '../../../../utils/delay'
import { parseHtml } from "../../../../utils/parseHtml"

interface IActivityFormProps {
    classId: string
    classworkId?: string
}

export const ActivityEditForm = ({ classworkId, classId }: IActivityFormProps) => {
    const [form] = useForm()
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [topics, setTopics] = useState([])

    const [hasGrade, setHasGrade] = useState(true)
    const [hasDueDate, setHasDueDate] = useState(false)

    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState(null)

    const [isPreviewOpen, setPreviewOpen] = useState(false)
    const [isPreviewLoading, setPreviewLoading] = useState(false)
    const [previewData, setPreviewData] = useState(null)

    const [newQuestions, setNewQuestions] = useState([])
    const [questions, setQuestions] = useState([])


    useEffect(() => {
        classId && loadTopics()

        if (classworkId) {
            loadClasswork()
        }
    }, [])

    const loadTopics = async () => {
        const result = await ClassTopicService.getFromClasses(classId)
        setTopics(result)
    }

    const loadClasswork = async () => {
        setIsFetching(true)
        const result = await ClassworkService.get(classworkId)
        form.setFieldsValue(result)
        setQuestions(result.questions || [])
        setIsFetching(false)
    }

    // todo refactor !!
    const handleSubmit = async (data) => {
        setIsLoading(true)

        const reqData = {
            ...data,
            questions: (data.questions || []).filter(v => !v._new).map(v => ({ questionId: v._id, value: v.value })),
            newQuestions: (data.questions || []).filter(v => v._new).map(v => ({ questionId: v._id, value: v.value })),
            classId
        }

        try {
            const result = classworkId
                ? await ClassworkService.update(classworkId, reqData)
                : await ClassworkService.create(reqData)

            console.log(reqData, result)
            message.success(`Atividade ${classworkId ? 'atualizada' : 'criada'} com sucesso!`)
            await delay(2000)
            router.push(`/v2/class/${classId}/activities`)
        } catch (err) {
            console.error(err)
            message.error(err.message, 10000)
        } finally {
            setIsLoading(false)
        }

    }

    const handleSearch = async (query: string) => {
        if (!query || query.trim().length < 1) return
        setIsSearching(true)
        const skipIds = newQuestions.map(v => v._id).concat(questions.map(v => v.parent))
        const result = await QuestionService.simpleSearch(query, skipIds)
        setSearchResult(result.data)
        setIsSearching(false)
    }

    const openPreviewQuestion = async (id: string) => {
        setPreviewLoading(true)
        setPreviewOpen(true)

        const q = await QuestionService.get(id)
        setPreviewData(q)

        setPreviewLoading(false)
    }

    // todo
    const addNewQuestion = (item) => {
        const formQuestions = form.getFieldValue('questions') || []
        if (!formQuestions.some(v => v._id == item._id)) {
            item['_new'] = true
            item['value'] = 1 // start value 1
            form.setFields([{ name: 'questions', value: [...formQuestions, item] }])
            message.success('Questão adicionada!')
        } else {
            message.info('Esta questão já foi adicionada!')
        }
        setNewQuestions(newQuestions.concat(item))// ??
    }

    const renderQuestion = (item: { _id: string, name: string, text?: string, alternatives?: { correct: boolean, text: string, code: string }[] }) => {
        return item && <>
            <Typography.Title level={4}>{item.name}</Typography.Title>
            <Typography.Paragraph>{parseHtml(item.text || '')}</Typography.Paragraph>
            <Divider />
            {item.alternatives &&
                <Radio.Group onChange={() => { }} size="large" value={item.alternatives.find(v => v.correct)?.code}>
                    <Space direction="vertical">
                        {item.alternatives.map((v, i) =>
                            <Radio key={i} value={v.code} checked={v.correct}>{parseHtml(v.text || '')}</Radio>
                            // <Radio value={2}>Option B</Radio>
                            // <Radio value={3}>Option C</Radio>
                        )}
                    </Space>
                </Radio.Group>
            }
        </>
    }

    const renderSearchQuestion = () => {
        return <Card loading={isFetching} title={<Typography.Title level={4}>Adicionar Questões</Typography.Title>} >
            <Input.Search placeholder="Buscar questões..." allowClear loading={isSearching} enterButton onSearch={handleSearch} />

            {searchResult && searchResult.length ?
                <Typography.Title level={5} style={{ marginTop: '16px' }}>
                    {searchResult.length} resultado{searchResult.length !== 1 ? 's' : ''} para a pesquisa:
                </Typography.Title>
                : <></>
            }

            <List
                loading={isSearching}
                itemLayout="horizontal"
                dataSource={(searchResult || []) as any[]}
                renderItem={item => (
                    <List.Item actions={[
                        <Button onClick={() => openPreviewQuestion(item._id)}>Preview</Button>,
                        <Button onClick={() => addNewQuestion(item)} type="primary">Clone</Button>,
                    ]}>
                        <List.Item.Meta
                            title={<a target="_blank" href={`/manager/questions/${item._id}`}>{item.name}</a>}
                            description={parseHtml((item.text || '').slice(0, 100).concat('...'), { trim: true })}
                        />
                    </List.Item>
                )}
            />

            <Modal
                visible={isPreviewOpen}
                centered
                closable
                onCancel={() => setPreviewOpen(false)}
                footer={
                    <Button
                        type="primary"
                        onClick={() => previewData && (addNewQuestion(previewData), setPreviewOpen(false))}
                    >
                        Adicionar
                    </Button>
                }
            >
                <Result style={{ display: !isPreviewLoading ? 'none' : 'initial' }} icon={<Spin />} />
                {renderQuestion(previewData)}
            </Modal>
        </Card>
    }

    return <Col>
        <Row gutter={[24, 24]} >
            <Col span={24}>
                <Typography.Title level={2}>{classworkId ? 'Editar' : 'Nova'} atividade</Typography.Title>
            </Col>
            <Col span={24}>
                <Form layout="vertical" form={form} initialValues={{ grade: 100 }} onFinish={handleSubmit}>
                    <Row gutter={[24, 24]}>
                        <Col span={18}>
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <Card loading={isFetching}>
                                        <Form.Item label="Nome da atividade" name="name" rules={[{ required: true }]}>
                                            <Input placeholder="Nome da atividade" />
                                        </Form.Item>
                                        <Form.Item label="Descrição" name="description">
                                            <RichTextSunEditor buttons={[
                                                ['fontSize', 'formatBlock'],
                                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                                                ['fontColor', 'hiliteColor', 'align', 'horizontalRule', 'list', 'table'],
                                                ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'glossaryEntry']
                                            ]} />
                                        </Form.Item>
                                    </Card>
                                </Col>

                                <Col span={24}>
                                    {renderSearchQuestion()}
                                </Col>

                                {/* {questions.concat(newQuestions).map((q, idx) => */}
                                <Form.List
                                    name="questions"
                                    rules={[
                                        {
                                            validator: async (_, questions) => {
                                                // if (!questions || questions.length < 2) {
                                                //     return Promise.reject(new Error('Você precisa adicionar ao menos uma questão'));
                                                // }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {errors}
                                            {fields.map((item, idx) =>
                                                <Col span={24} key={item.key}>
                                                    <Card
                                                        title={<Typography.Title level={5}>Questão #{idx + 1}</Typography.Title>}
                                                        extra={
                                                            <Space>
                                                                <Form.Item name={[item.name, 'value']} noStyle>
                                                                    <Input placeholder="Pontos" />
                                                                </Form.Item>
                                                                <Button type='dashed' onClick={() => remove(idx)}>Remover questão</Button>
                                                            </Space>
                                                        }>

                                                        {renderQuestion(form.getFieldValue(['questions', idx]))}
                                                    </Card>
                                                </Col>
                                            )}
                                        </>
                                    )}
                                </Form.List>
                                {/* )} */}
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" size="large" htmlType="submit" loading={isFetching || isLoading}>Salvar Atividade</Button>
                                        <Button type="default" size="large">Descartar</Button>
                                    </Space>
                                </Form.Item>
                                {/* <Form.Item label="Turma" name="classId">
                                    <Select placeholder="Turma" showSearch />
                                </Form.Item> */}
                                {/* <Form.Item label="Alunos">
                                <Select placeholder="Alunos" mode="multiple" showSearch />
                            </Form.Item> */}
                                <Form.Item label="Vale ponto?" >
                                    <Switch checked={hasGrade} onChange={setHasGrade} />
                                </Form.Item>
                                {hasGrade &&
                                    <Form.Item label="Pontos" name="grade">
                                        <InputNumber disabled={!hasGrade} style={{ width: '100%' }} />
                                    </Form.Item>
                                }
                                <Form.Item label="Tem data de entrega?">
                                    <Switch checked={hasDueDate} onChange={setHasDueDate} />
                                </Form.Item>
                                {hasDueDate &&
                                    <Form.Item label="Date de entrega" name="dueDate">
                                        <DatePicker format="DD [de] MMM. YYYY" style={{ width: '100%' }} />
                                        {/* <TimePicker showSecond={false} format="HH:mm" style={{ width: '100%' }} /> */}
                                    </Form.Item>
                                }
                                <Form.Item label="Tópico" name="topicId" rules={[{ required: true }]}>
                                    <Select placeholder="Tópico" showSearch options={topics.map(v => ({ value: v._id, label: v.name }))} />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Col >
}