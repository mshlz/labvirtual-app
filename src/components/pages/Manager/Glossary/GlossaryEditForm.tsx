import { Button, Card, Form, Input, PageHeader, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DisciplineService } from "../../../../services/DisciplineService";
import { GlossaryService } from "../../../../services/GlossaryService";
import { SubjectService } from "../../../../services/SubjectService";
import { transformResponseError } from "../../../../utils/transformResponseError";
import { RichTextSunEditor } from "../../../UI/RichTextSunEditor";

interface IGlossaryFormProps {
  glossaryItemId?: string;
}

export const GlossaryEditForm = ({
  glossaryItemId: id,
}: IGlossaryFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [glossaryItemId, setGlossaryItemId] = useState(id);
  const [disciplines, setDisciplines] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadDependencies();
    if (glossaryItemId) loadGlossaryEntry();
  }, []);

  const loadDependencies = async () => {
    const disciplines = await DisciplineService.list();
    setDisciplines(disciplines.data);
  };

  const loadSubjects = async (disciplineId: string) => {
    if (!disciplineId) return;
    const subjects = await SubjectService.getFromDisciplines(disciplineId);
    setSubjects(subjects);
  };

  const handleValuesChange = (changes) => {
    if (changes.discipline) {
      loadSubjects(changes.discipline);
      form.resetFields(["subject"]);
    }
  };

  const loadGlossaryEntry = async () => {
    setIsLoading(true);
    const glossaryEntry = await GlossaryService.get(glossaryItemId);

    if (!glossaryEntry || !glossaryEntry._id) {
      toast("Conteúdo não encontrada!", { type: "error" });
      return setTimeout(() => router.push("/manager/glossary"), 4000);
    }

    await loadSubjects(
      glossaryEntry.discipline?._id || glossaryEntry.discipline
    );

    form.setFieldsValue(glossaryEntry);
    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      if (glossaryItemId) {
        await GlossaryService.update(glossaryItemId, data);
      } else {
        const result = await GlossaryService.create(data);
        setGlossaryItemId(result._id);
      }
      toast(
        `Conteúdo ${glossaryItemId ? "atualizada" : "criada"} com sucesso!`,
        { type: "success" }
      );
    } catch (err) {
      let error = err.response;
      if (error.status == 422) {
        form.setFields(transformResponseError(error.data));
      } else if (error.data.message) {
        form.setFields([{ name: "name", errors: [error.data.message] }]);
        toast(err.response.data.message, { type: "error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title={
          glossaryItemId
            ? "Editar item do glossário"
            : "Criar nova item para o glossário"
        }
        onBack={() => router.push("/manager/glossary")}
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
            label="Nome do termo"
            name="name"
            rules={[{ required: true, min: 3 }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="description"
            rules={[{ required: true }]}
          >
            <RichTextSunEditor />
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
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {subjects.map((v) => (
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
  );
};
