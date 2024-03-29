import { MailOutlined } from "@ant-design/icons"
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  List,
  Row,
  Space,
  Tag,
  Typography,
} from "antd"
import Modal from "antd/lib/modal/Modal"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ClassService } from "../../../../services/ClassService"
import { getInitials } from "../../../../utils/getInitials"
import { LoadingWrapper } from "../../../Loading/Loading"

const InviteModal = ({ isOpen, type, onCancel }) => {
  const [form] = Form.useForm()
  const [emails, setEmails] = useState([])

  const handleOnFinish = async (data) => {
    const email = data.email

    if (!emails.includes(email)) setEmails([...emails, email])

    form.resetFields()
  }

  const handleRemove = (email) => {
    console.log(emails.filter((e) => e !== email))
  }

  return (
    <Modal
      centered
      // width={300}
      title={`Convidar ${type === "teacher" ? "professor" : "aluno"}`}
      visible={isOpen}
      onOk={() => null /*form.submit()*/}
      // confirmLoading={confirmLoading}
      onCancel={onCancel}
      okText="Convidar"
      cancelText="Cancelar"
    >
      <Space wrap style={{ marginBottom: "12px" }}>
        {emails.map((e) => (
          <Tag key={e} closable onClose={() => handleRemove(e)}>
            {e}
          </Tag>
        ))}
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
          rules={[
            { required: true, message: "Você deve preencher este campo!" },
            { type: "email", message: "Email não válido" },
          ]}
        >
          <Input type="email" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button onClick={() => form.submit()}>Incluir</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

interface PeopleTabProps {
  classId: string
}

export const PeopleTab = (props: PeopleTabProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])

  const [inviteTeacherModal, setInviteTeacher] = useState(false)
  const [inviteStudentModal, setInviteStudent] = useState(false)

  useEffect(() => {
    loadResource()
  }, [props.classId])

  const loadResource = async () => {
    const result = await ClassService.getPeople(props.classId)

    setTeachers([result.teacher])
    setStudents(result.students)
    setIsLoading(false)
  }

  return (
    <LoadingWrapper isLoading={isLoading} fullWidth={true}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
            // style={{ backgroundColor: 'transparent' }}
            >
              <Col span={24} style={{ marginBottom: "24px" }}>
                {/* teachers */}
                <InviteModal
                  isOpen={inviteTeacherModal}
                  type={"teacher"}
                  onCancel={() => setInviteTeacher(false)}
                />
                <Typography.Title level={2}>
                  Professores
                  <Space
                    style={{
                      float: "right",
                      fontSize: "16px",
                      marginTop: "8px",
                    }}
                  >
                    <Typography.Text type="secondary">
                      {teachers.length} professor
                      {teachers.length === 1 ? "" : "es"}
                    </Typography.Text>
                    <Button
                      hidden={false}
                      onClick={() => setInviteTeacher(true)}
                    >
                      Convidar
                    </Button>
                  </Space>
                </Typography.Title>
                <Divider style={{ margin: "12px 0" }} />
                <List
                  itemLayout="horizontal"
                  dataSource={teachers}
                  renderItem={(item) => (
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
                  type={"student"}
                  onCancel={() => setInviteStudent(false)}
                />
                <Typography.Title level={2}>
                  Alunos
                  <Space
                    style={{
                      float: "right",
                      fontSize: "16px",
                      marginTop: "8px",
                    }}
                  >
                    <Typography.Text type="secondary">
                      {students.length} aluno{students.length === 1 ? "" : "s"}
                    </Typography.Text>
                    <Button
                      hidden={false}
                      onClick={() => setInviteStudent(true)}
                    >
                      Convidar
                    </Button>
                  </Space>
                </Typography.Title>

                <Divider style={{ margin: "12px 0" }} />

                <List
                  itemLayout="horizontal"
                  dataSource={students}
                  renderItem={(item) => (
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
      </Col>
    </LoadingWrapper>
  )
}
