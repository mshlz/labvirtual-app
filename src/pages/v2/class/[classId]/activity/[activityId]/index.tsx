import { Button, Card, Col, Divider, Result, Row, Typography } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../../../../components/Loading/Loading"
import { AdminLayout } from "../../../../../../layouts/AdminLayout"
import { Classwork } from "../../../../../../models/Classwork"
import { ClassworkService } from "../../../../../../services/ClassworkService"
import { relativeDate } from "../../../../../../utils/date"
import { parseHtml } from "../../../../../../utils/parseHtml"


const ViewActivity = () => {
    const router = useRouter()
    const activityId = router.query.activityId as string

    const [isLoading, setIsLoading] = useState(true)
    const [activity, setActivity] = useState<Classwork | null>()

    useEffect(() => {
        loadActivity()
    }, [activityId])

    const loadActivity = async () => {
        if (!activityId) return

        setIsLoading(true)

        const result = await ClassworkService.get(activityId)
        setActivity(result)
        setIsLoading(false)
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
                    <Card>
                        {/* header */}
                        <Row>
                            <Col>
                                <Typography.Text>Publicado por: {activity.author?.name}</Typography.Text>
                                <Divider type="vertical" />
                                <Typography.Text title={activity.updatedAt} type="secondary">{relativeDate(activity.updatedAt)}</Typography.Text>
                            </Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: '16px' }}>
                            <Col>{!activity.value && <Typography.Text type="secondary">Pontuação: {activity.value || 0} pontos</Typography.Text>}</Col>
                            <Col>{activity.dueDate && <Typography.Text type="secondary">Data de entrega: {activity.dueDate}</Typography.Text>}</Col>
                        </Row>

                        {/* description */}
                        <Row>
                            <Col>
                                <Typography.Text>
                                    {parseHtml(activity.description)}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col sm={24} xl={8} xxl={4}>
                    <Card>
                        <Typography.Paragraph>Para iniciar a atividade, clique no botão abaixo</Typography.Paragraph>
                        {/* TODO we should migrate how this redirect */}
                        <Link href={`${router.asPath}/start`} >
                            <Button type="primary" block>Iniciar atividade</Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </Col>
    </AdminLayout>
}

export default ViewActivity