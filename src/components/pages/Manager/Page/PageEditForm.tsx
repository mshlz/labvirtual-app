import { Button, Card, Form, Input, PageHeader, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { DisciplineService } from "../../../../services/DisciplineService"
import { PageSectionService } from "../../../../services/PageSectionService"
import { PageService } from "../../../../services/PageService"
import { SubjectService } from "../../../../services/SubjectService"
import { transformResponseError } from "../../../../utils/transformResponseError"
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor"

interface IPageFormProps {
  pageId?: string
}

export const PageEditForm = ({ pageId: id }: IPageFormProps) => {
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [pageId, setPageId] = useState(id)
  const [sections, setSections] = useState([])
  const [disciplines, setDisciplines] = useState([])
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    loadSections()
    loadDisciplines()

    if (pageId) loadPage()
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
    if (changes.disciplines) {
      loadSubjects(changes.disciplines)
      form.resetFields(["subject"])
    }
  }

  const loadSections = async () => {
    const result = await PageSectionService.list()
    setSections(result.data)
  }

  const loadPage = async () => {
    setIsLoading(true)

    const id = router.query.id as string
    if (!id) return

    const page = await PageService.get(id)

    if (!page || !page._id) {
      toast("Página não encontrada!", { type: "error" })
      return setTimeout(() => router.push("/manager/pages"), 4000)
    }

    if (page.section && typeof page.section !== "string") {
      page.section = page.section._id
    }

    if (
      Array.isArray(page.disciplines) &&
      typeof page.disciplines[0] !== "string"
    ) {
      page.disciplines = page.disciplines.map((v) => v._id)
    }

    loadSubjects(page.disciplines)

    form.setFieldsValue(page)
    setIsLoading(false)
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      if (pageId) {
        await PageService.update(pageId, data)
      } else {
        const result = await PageService.create(data)
        setPageId(result._id)
      }
      toast(`Página ${pageId ? "atualizada" : "criada"} com sucesso!`, {
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
        title={pageId ? "Editar página" : "Criar nova página"}
        onBack={() => router.push("/manager/pages")}
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
            label="Nome da página"
            name="name"
            rules={[{ required: true, min: 3 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Seção" name="section" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Selecione uma seção"
              optionFilterProp="children"
            >
              {sections.map((v) => (
                <Select.Option value={v._id}>{v.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Disciplina"
            name="disciplines"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Selecione uma disciplina"
              mode="multiple"
              optionFilterProp="children"
            >
              {disciplines.map((v) => (
                <Select.Option value={v._id}>{v.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Assunto"
            name="subjects"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Selecione um assunto"
              mode="multiple"
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
