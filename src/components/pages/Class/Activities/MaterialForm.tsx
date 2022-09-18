import { Button, Col, Form, List, Row, Select, Space, Typography } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useApp } from "../../../../context/AppContext"
import { ModalStack } from "../../../../context/ModalStackContext"
import { ClassMaterialService } from "../../../../services/ClassMaterialService"
import { ClassTopicService } from "../../../../services/ClassTopicService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import QuillEditor from "../../../UI/QuillEditor"

interface IMaterialForm {
  classId: string
  onFinish?: () => void
}

export const MaterialForm = (props: IMaterialForm) => {
  const [form] = Form.useForm()
  const [isSubmitting, setSubmitting] = useState(false)

  const [topics, setTopics] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])

  useEffect(() => {
    loadTopics()
  }, [])

  const loadTopics = async () => {
    const result = await ClassTopicService.getFromClasses(props.classId)
    setTopics(result)
  }
  const handleOnFinish = async (data) => {
    setSubmitting(true)
    ClassMaterialService.create(data)
      .then((r) => {
        form.resetFields()
        props.onFinish && props.onFinish()
      })
      .catch((err) => {
        let error = err.response
        if (error.status == 422) {
          form.setFields(transformResponseError(error.data))
        } else if (error.data.message) {
          form.setFields([
            { name: "description", errors: [error.data.message] },
          ])
          toast(err.response.data.message, { type: "error" })
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const openSubjectSelectorModal = () => {
    const Modal = ({ onFinish }) => {
      const [items, setItems] = useState([])
      const { user } = useApp()

      useEffect(() => {
        SubjectService.list().then((result) => {
          setItems(result.data)
        })
      }, [])
      return (
        <>
          <Typography.Title level={4}>Vincular assunto</Typography.Title>

          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => (
              <List.Item
                key={item._id}
                actions={[
                  <a
                    onClick={() => {
                      onFinish(item)
                    }}
                  >
                    Adicionar
                  </a>,
                ]}
              >
                {item.name}
              </List.Item>
            )}
          />
        </>
      )
    }
    ModalStack.open(
      (mId) => (
        <Modal
          onFinish={(item) => {
            if (item && !selectedSubjects.find((v) => v._id == item._id)) {
              setSelectedSubjects([...selectedSubjects, item])
            }
            ModalStack.close(mId)
          }}
        />
      ),
      {
        footer: null,
      }
    )
  }

  return (
    <>
      <Typography.Title level={4}>Adicionar novo material</Typography.Title>
      {/* <Typography.Text type="secondary" style={{ marginBottom: 8 }}>
        Para participar de uma nova turma, insira o código da turma e aperte em
        "Participar"
      </Typography.Text> */}

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
        <Form.Item label="Tópico" name="topicId" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Selecione um tópico"
            optionFilterProp="children"
          >
            {topics.map((v) => (
              <Select.Option value={v._id}>{v.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Descrição"
          name="description"
          rules={[
            { required: true, message: "Você deve preencher este campo!" },
          ]}
        >
          <QuillEditor
            modules={{
              toolbar: [
                //   [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "code"],
                ["clean"],
              ],
            }}
          />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              Assuntos{" "}
              <Button onClick={() => openSubjectSelectorModal()}>
                Vincular assunto
              </Button>
            </Space>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={selectedSubjects}
            renderItem={(item, index) => (
              <List.Item
                key={item._id}
                actions={[
                  <a
                    onClick={() => {
                      setSelectedSubjects(
                        selectedSubjects.filter((v) => v._id != item._id)
                      )
                    }}
                  >
                    remover
                  </a>,
                ]}
              >
                {item.name}
              </List.Item>
            )}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Row gutter={8} justify="end">
            <Col>
              <Button loading={isSubmitting} htmlType="submit" type="primary">
                Adicionar
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}
