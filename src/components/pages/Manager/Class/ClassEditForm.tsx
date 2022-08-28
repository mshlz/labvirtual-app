import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ClassService } from "../../../../services/ClassService"
import { DisciplineService } from "../../../../services/DisciplineService"
import { UserService } from "../../../../services/UserService"
import { transformResponseError } from "../../../../utils/transformResponseError"

interface IClassFormProps {
  classId?: string
}

export const ClassEditForm = ({ classId: id }: IClassFormProps) => {
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [classId, setClassId] = useState(id)
  const [disciplines, setDisciplines] = useState([])
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    loadDisciplines()
    loadTeachers()

    if (classId) loadClass()
  }, [])

  const loadDisciplines = async () => {
    const result = await DisciplineService.list()
    setDisciplines(result.data)
  }
  const loadTeachers = async () => {
    const result = await UserService.listTeachers()
    setTeachers(result)
  }

  const loadClass = async () => {
    setIsLoading(true)

    const klass = await ClassService.get(classId)

    if (!klass || !klass._id) {
      toast("Turma não encontrado!", { type: "error" })
      return setTimeout(() => router.push("/manager/classes"), 4000)
    }

    form.setFieldsValue(klass)
    setIsLoading(false)
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      if (classId) {
        await ClassService.update(classId, data)
      } else {
        const result = await ClassService.create(data)
        setClassId(result._id)
      }

      toast(`Turma ${classId ? "atualizado" : "criado"} com sucesso!`, {
        type: "success",
      })
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
      <PageHeader
        title={classId ? "Editar turma" : "Criar novo turma"}
        onBack={() => router.push("/manager/classes")}
      />
      <Card title="Informações básicas" loading={isLoading}>
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
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
          <Form.Item label="Professor" name="teacher">
            <Select
              showSearch
              placeholder="Selecione um professor"
              optionFilterProp="children"
            >
              {teachers.map((v) => (
                <Select.Option value={v._id}>{v.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Disciplina"
            name="discipline"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Selecione uma disciplina"
              optionFilterProp="children"
            >
              {disciplines.map((v) => (
                <Select.Option value={v._id}>{v.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Salvar
          </Button>
        </Form>
      </Card>
    </>
  )
}
