import { Button, Col, Form, Input, Modal, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ClassTopicService } from "../../../../services/ClassTopicService"
import { transformResponseError } from "../../../../utils/transformResponseError"

interface ITopicForm {
  topicId?: string
  classId: string
  onFinish?: () => void
}

export const TopicForm = (props: ITopicForm) => {
  const [form] = Form.useForm()
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (props.topicId) {
      fetchResource()
    }
  }, [props.topicId])

  const fetchResource = async () => {
    const topic = await ClassTopicService.get(props.topicId)
    form.setFieldsValue(topic)
  }

  const handleOnFinish = async (data) => {
    setSubmitting(true)
    ;(!props.topicId
      ? ClassTopicService.create({
          ...data,
          classId: props.classId,
        })
      : ClassTopicService.update(props.topicId, data)
    )
      .then((r) => {
        form.resetFields()
        props.onFinish && props.onFinish()
      })
      .catch((err) => {
        let error = err.response
        if (error.status == 422) {
          form.setFields(transformResponseError(error.data))
        } else if (error.data.message) {
          form.setFields([{ name: "name", errors: [error.data.message] }])
          toast(err.response.data.message, { type: "error" })
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Typography.Title level={4}>Criar novo tópico</Typography.Title>
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
        <Form.Item
          label="Nome do tópico"
          name="name"
          rules={[
            { required: true, message: "Você deve preencher este campo!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Row gutter={8} justify="end">
            <Col>
              <Button loading={isSubmitting} htmlType="submit" type="primary">
                {props.topicId ? "Alterar" : "Criar"}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}
