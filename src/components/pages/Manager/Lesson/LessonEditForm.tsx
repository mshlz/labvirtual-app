import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { LessonService } from "../../../../services/LessonService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"

interface ILessonFormProps {
  lessonId?: string
}

export const LessonEditForm = ({ lessonId: id }: ILessonFormProps) => {
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [lessonId, setLessonId] = useState(id)
  const [disciplines, setDisciplines] = useState([])
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    loadDisciplines()

    if (lessonId) loadLesson()
  }, [])

  const loadDisciplines = async () => {
    const disciplines = await DisciplineService.list()
    setDisciplines(disciplines.data)
  }

  const loadSubjects = async (discipline_id: string) => {
    if (!discipline_id) return
    const subjects = await SubjectService.getFromDisciplines(discipline_id)
    setSubjects(subjects)
  }

  const handleValuesChange = (changes) => {
    if (changes.discipline) {
      loadSubjects(changes.discipline)
      form.resetFields(["subject"])
    }
  }

  const loadLesson = async () => {
    setIsLoading(true)

    const lesson = await LessonService.get(lessonId)

    if (!lesson || !lesson._id) {
      toast("Conteúdo não encontrado!", { type: "error" })
      return setTimeout(() => router.push("/manager/lessons"), 4000)
    }

    if (lesson.discipline && typeof lesson.discipline !== "string") {
      lesson.discipline = lesson.discipline._id
    }

    await loadSubjects(lesson.discipline)

    form.setFieldsValue(lesson)

    setIsLoading(false)
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      if (lessonId) await LessonService.update(lessonId, data)
      else {
        const result = await LessonService.create(data)
        setLessonId(result._id)
      }

      toast(`Assunto ${lessonId ? "atualizado" : "criado"} com sucesso!`, {
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
        title={lessonId ? "Editar conteúdo" : "Criar novo conteúdo"}
        onBack={() => router.push("/manager/lessons")}
      />
      <Card title="Informações básicas" loading={isLoading}>
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            label="Nome do conteúdo"
            name="name"
            rules={[{ required: true, min: 3 }]}
          >
            <Input />
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
          <Form.Item
            label="Assunto"
            name="subject"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Selecione um assunto"
              optionFilterProp="children"
            >
              {subjects.map((v) => (
                <Select.Option value={v._id}>{v.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Conteúdo" name="content">
            <RichTextSunEditor onSave={() => form.submit()} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Salvar
          </Button>
        </Form>
      </Card>
    </>
  )
}
