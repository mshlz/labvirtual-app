import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, List, message, Modal, Radio, Result, Row, Select, Space, Spin, Switch, Typography } from "antd"
import parseHtml from 'html-react-parser'
import { useEffect, useState } from "react"
import { RichTextSunEditor } from "../../../../../components/UI/RichTextSunEditor"
import { AdminLayout } from "../../../../../layouts/AdminLayout"
import { QuestionService } from "../../../../../services/QuestionService"

const NewActivity = () => {
    const [hasGrade, setHasGrade] = useState(true)
    const [hasDueDate, setHasDueDate] = useState(false)

    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState(null)

    const [isPreviewOpen, setPreviewOpen] = useState(false)
    const [isPreviewLoading, setPreviewLoading] = useState(false)
    const [previewData, setPreviewData] = useState(null)

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        message.info({icon: <Spin size="small" style={{marginRight: '8px'}}/>, content:"Salvando atividade..."})
    },[])

    const handleSubmit = (data) => {
        console.log(data)
    }

    const handleSearch = async (query) => {
        if (!query || query.trim().length < 1) return
        setIsSearching(true)
        const result = await QuestionService.simpleSearch(query)
        setSearchResult(result.data)
        setIsSearching(false)
    }

    const openPreview = async (id) => {
        setPreviewLoading(true)
        setPreviewOpen(true)

        const q = await QuestionService.get(id)
        setPreviewData(q)

        setPreviewLoading(false)
    }

    return <AdminLayout>
        <Col lg={20} >
            <Row gutter={[24, 24]} >
                <Col span={24}>
                    <Typography.Title level={2}>Nova atividade</Typography.Title>
                </Col>
                <Col span={24}>
                    <Form layout="vertical" initialValues={{ grade: 100 }} onFinish={handleSubmit}>
                        <Row gutter={[24, 24]}>
                            <Col span={18}>
                                <Row gutter={[24, 24]}>
                                    <Col span={24}>
                                        <Card>
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
                                        <Card title={<Typography.Title level={4}>Adicionar Questões</Typography.Title>} >
                                            <Input.Search placeholder="Buscar questões..." allowClear loading={isSearching} enterButton onSearch={handleSearch} />

                                            {searchResult && searchResult.length ?
                                                <Typography.Title level={5} style={{marginTop: '16px'}}>
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
                                                        <Button onClick={() => openPreview(item._id)}>Preview</Button>,
                                                        <Button onClick={() => message.warning("quase lá")} type="primary">Clone</Button>,
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
                                                footer={<Button type="primary">Adicionar</Button>}
                                            >
                                                <Result style={{ display: !isPreviewLoading ? 'none' : 'initial' }} icon={<Spin />} />
                                                <Typography.Title level={3}>{previewData?.name}</Typography.Title>
                                                <Typography.Paragraph>{parseHtml(previewData?.text || '')}</Typography.Paragraph>
                                                <Divider />
                                                <Radio.Group onChange={() => { }} size="large" value={previewData?.alternatives.find(v => v.correct)?._id}>
                                                    <Space direction="vertical">
                                                        {previewData?.alternatives.map(v =>
                                                            <Radio value={v._id} checked={v.correct}>{parseHtml(v.text || '')}</Radio>
                                                            // <Radio value={2}>Option B</Radio>
                                                            // <Radio value={3}>Option C</Radio>
                                                        )}
                                                    </Space>
                                                </Radio.Group>
                                            </Modal>
                                        </Card>
                                    </Col>

                                    <Col span={24}>
                                        <Card title={<Typography.Title level={5}>Quem foi Dom pedro?</Typography.Title>} extra={<Space><Input placeholder="Pontos" /><Button type='dashed'>Remover questão</Button></Space>}>
                                            <Typography.Title level={5}>Quem foi Dom pedro?</Typography.Title>
                                            <Typography.Paragraph>Ant Design, a design language for background applications,Ant Design, a design language for background applications,Ant Design, a design language for background applications,</Typography.Paragraph>
                                            {/* <Divider />
                                            <Radio.Group onChange={()=>{}} value={1} size="large">
                                                <Space direction="vertical">
                                                    <Radio value={1}>Option A</Radio>
                                                    <Radio value={2}>Option B</Radio>
                                                    <Radio value={3}>Option C</Radio>
                                                </Space>
                                            </Radio.Group> */}
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Form.Item>
                                        <Space>
                                            <Button type="primary" size="large" htmlType="submit">Salvar Atividade</Button>
                                            <Button type="default" size="large">Descartar</Button>
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Turma" name="classId">
                                        <Select placeholder="Turma" showSearch />
                                    </Form.Item>
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
                                    <Form.Item label="Tópico" name="topic">
                                        <Select placeholder="Tópico" showSearch />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Col >
    </AdminLayout>
}

export default NewActivity