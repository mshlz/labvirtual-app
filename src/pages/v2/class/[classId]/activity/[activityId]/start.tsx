import { Button, Card, Col, Form, Result, Row, Typography } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../../../../components/Loading/Loading"
import { QuestionItem } from "../../../../../../components/QuestionItem/QuestionItem"
import { AdminLayout } from "../../../../../../layouts/AdminLayout"
import { Classwork } from "../../../../../../models/Classwork"
import { ClassworkService } from "../../../../../../services/ClassworkService"

interface QuestionAnswer {
    questionId: string,
    answer: string
}
interface FormData {
    answers: QuestionAnswer[]
}

const StartActivity = () => {
    const router = useRouter()
    const activityId = router.query.activityId as string

    const [form] = useForm()
    const [activity, setActivity] = useState<Classwork | null>(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)


    useEffect(() => {
        loadActivity()
    }, [activityId])

    const loadActivity = async () => {
        if (!activityId) return

        setIsLoading(true)
        const result = await ClassworkService.get(activityId) as Classwork
        setActivity(result)

        form.setFieldsValue({ answers: result.questions.map(v => ({ questionId: v._id, answer: null })) })

        setIsLoading(false)
    }


    const handleSubmit = (formData: FormData) => {
        setIsSubmitting(true)
        const data = {
            classworkId: activityId,
            answers: formData.answers
        }

        console.log(data)

        setTimeout(() => {
            setIsSubmitting(false)
        }, 2000);
    }

    const handleFailed = (event) => {
        setHasErrors(true)
    }

    if (isLoading) {
        return <AdminLayout>
            <LoadingComponent />
        </AdminLayout>
    } else if (!activity) {
        return <AdminLayout>
            <Result
                status={'404'}
                title={'Atividade não encontrada'}
                subTitle={'Clique no botão abaixo para voltar à página anterior'}
                extra={<Button type="primary" onClick={() => router.back()}>Voltar</Button>}
            />
        </AdminLayout>
    }

    return <AdminLayout>
        <Col>
            <Row gutter={[24, 24]} >
                <Col span={24}>
                    <Typography.Title level={2}>{activity.name}</Typography.Title>
                </Col>

                <Col sm={24} xl={16}>
                    <Form layout="vertical" form={form} onFinish={handleSubmit} onFinishFailed={handleFailed} onInput={() => hasErrors && setHasErrors(false)}>
                        <Form.List name="answers">
                            {(fields, { add, remove }, { errors }) => (
                                fields.map((field, index) => (
                                    <QuestionItem key={field.key} fieldName={field.name} question={activity.questions[index]} />
                                ))
                            )}
                        </Form.List>
                    </Form>
                </Col>

                <Col sm={24} xl={8} xxl={4}>
                    <Card>
                        {hasErrors && <Typography.Text type="danger">Ops! Falta responder algumas questões</Typography.Text>}
                        <Typography.Paragraph>Para entregar a atividade, clique no botão abaixo</Typography.Paragraph>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            loading={isSubmitting}
                            block
                        >
                            Enviar atividade
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Col>
    </AdminLayout>
}

export default StartActivity