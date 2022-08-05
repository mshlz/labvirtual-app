import { Form, Input, Modal } from "antd"
import { useState } from "react"
import { ClassTopicService } from "../../../../services/ClassTopicService"

interface INewTopicModal {
  classId: string
  isOpen: boolean
  handleCancel: () => void
  handleSuccess: () => void
}

export const NewTopicModal = (props: INewTopicModal) => {
  const [form] = Form.useForm()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleOnFinish = async (data) => {
    setSubmitting(true)

    ClassTopicService.create({
      ...data,
      classId: props.classId,
    })
      .then((r) => {
        form.resetFields()
        typeof props.handleSuccess == "function" && props.handleSuccess()
      })
      .catch((err) => {
        console.error("[Topic Form] Error => ", err)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Modal
      centered
      width={300}
      title="Adicionar novo tópico"
      visible={props.isOpen}
      onOk={() => form.submit()}
      confirmLoading={isSubmitting}
      onCancel={props.handleCancel}
      okText="Adicionar"
      cancelText="Cancelar"
    >
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
          style={{
            marginBottom: 0,
          }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
