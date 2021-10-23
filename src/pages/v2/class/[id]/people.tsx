import { Avatar, Button, Card, Col, Divider, Form, Input, List, Row, Space, Tabs, Tag, Typography } from "antd";
import { MailOutlined } from '@ant-design/icons'
import Modal from "antd/lib/modal/Modal";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { NavigationMenu } from "../../../../components/pages/Class/NavigationMenu";
import { AdminLayout } from "../../../../layouts/AdminLayout";
import { ClassService } from "../../../../services/ClassService";
import { getInitials } from "../../../../utils/getInitials";

const InviteModal = ({ isOpen, type, onCancel }) => {
    const [form] = Form.useForm()
    const [emails, setEmails] = useState([])

    const handleOnFinish = async (data) => {
        const email = data.email

        if (!emails.includes(email))
            setEmails([...emails, email])

        form.resetFields()
    }

    const handleRemove = (email) => {
        console.log(emails.filter(e => e !== email))
    }

    return <Modal
        centered
        // width={300}
        title={`Convidar ${type === 'teacher' ? 'professor' : 'aluno'}`}
        visible={isOpen}
        onOk={() => null/*form.submit()*/}
        // confirmLoading={confirmLoading}
        onCancel={onCancel}
        okText="Convidar"
        cancelText="Cancelar"
    >
        <Space wrap style={{ marginBottom: '12px' }}>
            {emails.map(e =>
                <Tag
                    key={e}
                    closable
                    onClose={() => handleRemove(e)}
                >
                    {e}
                </Tag>
            )}
        </Space>
        <Form
            name="basic"
            layout="vertical"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // initialValues={{  }}
            form={form}
            onFinish={handleOnFinish}
            onFinishFailed={null}
        >
            <Form.Item
                label="Email"
                name="email"
                isList={true}
                rules={[{ required: true, message: 'Você deve preencher este campo!' }, { type: 'email', message: 'Email não válido' }]}
            >
                <Input type="email" prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item >
                <Button onClick={() => form.submit()}>Incluir</Button>
            </Form.Item>
        </Form>
    </Modal>
}

const ClassPeople = () => {
    const router = useRouter()
    const query = router.query
    const id = query.id as string

    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    const [inviteTeacherModal, setInviteTeacher] = useState(false)
    const [inviteStudentModal, setInviteStudent] = useState(false)

    useEffect(() => {
        if (!id) return

        loadResource()
    }, [query])

    const loadResource = async () => {
        const result = await ClassService.getPeople(id)

        setTeachers([result.teacher])
        setStudents(result.students)
    }

    return <AdminLayout>
        <Col lg={20} >
            <Row gutter={[24, 24]} >

                <Col span={24}>
                    <NavigationMenu active="people" classId={id} />
                </Col>

                <Col span={24}>
                    <Card
                    // style={{ backgroundColor: 'transparent' }}
                    >
                        <Col span={24} style={{ marginBottom: '24px' }}>
                            {/* teachers */}
                            <InviteModal
                                isOpen={inviteTeacherModal}
                                type={'teacher'}
                                onCancel={() => setInviteTeacher(false)}
                            />
                            <Typography.Title level={2}>
                                Professores
                                <Space style={{ float: 'right', fontSize: '16px', marginTop: '8px' }}>
                                    <Typography.Text type="secondary" >
                                        {teachers.length} professor{teachers.length === 1 ? '' : 'es'}
                                    </Typography.Text>
                                    <Button hidden={false} onClick={() => setInviteTeacher(true)}>Convidar</Button>
                                </Space>
                            </Typography.Title>
                            <Divider style={{ margin: '12px 0' }} />
                            <List
                                itemLayout="horizontal"
                                dataSource={teachers}
                                renderItem={item => (
                                    <List.Item>
                                        <Space>
                                            <Avatar icon={getInitials(item.name, true)} />
                                            <Typography.Text>{item.name}</Typography.Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Col>

                        <Col span={24}>
                            <InviteModal
                                isOpen={inviteStudentModal}
                                type={'student'}
                                onCancel={() => setInviteStudent(false)}
                            />
                            <Typography.Title level={2}>
                                Alunos
                                <Space style={{ float: 'right', fontSize: '16px', marginTop: '8px' }}>
                                    <Typography.Text type="secondary" >
                                        {students.length} aluno{students.length === 1 ? '' : 's'}
                                    </Typography.Text>
                                    <Button hidden={false} onClick={() => setInviteStudent(true)}>Convidar</Button>
                                </Space>
                            </Typography.Title>

                            <Divider style={{ margin: '12px 0' }} />

                            <List
                                itemLayout="horizontal"
                                dataSource={students}
                                renderItem={item => (
                                    <List.Item>
                                        <Space>
                                            <Avatar icon={getInitials(item.name, true)} />
                                            <Typography.Text>{item.name}</Typography.Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Card>
                </Col>
            </Row>
        </Col >
    </AdminLayout >
}

export default ClassPeople