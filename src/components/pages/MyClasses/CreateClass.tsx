import { Button, Col, Form, Input, Row, Select, Typography } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ModalStack } from "../../../context/ModalStackContext"
import { ClassService } from "../../../services/ClassService"
import { InstitutionService } from "../../../services/InstitutionService"
import { transformResponseError } from "../../../utils/transformResponseError"

interface FormModalProps {
  onFinish: () => void
}

const CreateInstitution = (props: FormModalProps) => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFinish = () => {
    form.resetFields()
    props.onFinish()
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      const result = await InstitutionService.create(data)

      toast(`Instituição criada com sucesso!`, {
        type: "success",
      })
      handleFinish()
    } catch (err) {
      let error = err.response
      if (error.status == 422) {
        form.setFields(transformResponseError(error.data))
      } else if (error.data.message) {
        form.setFields([{ name: "name", errors: [error.data.message] }])
        toast(err.response.data.message, { type: "error" })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Typography.Title level={4}>Criar nova instituição</Typography.Title>
      <Typography.Text type="secondary" style={{ marginBottom: 8 }}>
        Para criar uma nova instituição, preencha os dados e clique em "Salvar"
      </Typography.Text>

      <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nome da instituição"
          name="name"
          rules={[{ required: true, min: 3 }]}
        >
          <Input />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export const CreateClass = (props: FormModalProps) => {
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [institutions, setInstitutions] = useState([])

  useEffect(() => {
    loadInstitutions()
  }, [])

  const handleFinish = () => {
    form.resetFields()
    props.onFinish()
  }

  const loadInstitutions = async () => {
    const result = await InstitutionService.list(undefined, 1000)
    setInstitutions(result.data)
    return result.data
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      const result = await ClassService.create(data)

      toast(`Turma criada com sucesso!`, {
        type: "success",
      })
      handleFinish()
    } catch (err) {
      let error = err.response
      if (error.status == 422) {
        form.setFields(transformResponseError(error.data))
      } else if (error.data.message) {
        form.setFields([{ name: "name", errors: [error.data.message] }])
        toast(err.response.data.message, { type: "error" })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Typography.Title level={4}>Criar nova turma</Typography.Title>
      <Typography.Text type="secondary" style={{ marginBottom: 8 }}>
        Para criar uma nova turma, preencha os dados e clique em "Salvar"
      </Typography.Text>

      <Form name="basic" form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Nome da turma"
          name="name"
          rules={[{ required: true, min: 3 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Descrição" name="description">
          <Input />
        </Form.Item>
        <Form.Item
          label="Instituição"
          tooltip={
            <Typography.Text style={{ color: "#fff" }}>
              Não encontrou a instituição?{" "}
              <Typography.Link
                style={{ color: "#fff", borderBottom: "1px dashed #fff" }}
                onClick={() =>
                  ModalStack.open(
                    (mId) => (
                      <CreateInstitution
                        onFinish={() => {
                          ModalStack.close(mId)
                          loadInstitutions().then((list) =>
                            form.setFieldsValue({ institution: list.pop()._id })
                          )
                        }}
                      />
                    ),
                    { footer: null }
                  )
                }
              >
                Clique aqui
              </Typography.Link>
            </Typography.Text>
          }
          name="institutionId"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Selecione uma instituição"
            optionFilterProp="children"
          >
            {institutions.map((v) => (
              <Select.Option value={v._id}>{v.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
