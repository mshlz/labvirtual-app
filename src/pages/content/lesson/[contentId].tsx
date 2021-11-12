import { Card, Col, Image, Row, Space, Typography } from "antd"
import parseHtml from 'html-react-parser'
import router from "next/router"
import { useEffect, useState } from "react"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { LessonService } from "../../../services/LessonService"

const LessonPage = () => {
    const contentId = router.query.contentId as string
    const [lesson, setLesson] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (contentId) {
            loadLesson(contentId)
        }
    }, [contentId])

    const loadLesson = async (contentId: string) => {
        setIsLoading(true)
        const result = await LessonService.get(contentId)
        setLesson(result)
        setIsLoading(false)
    }

    return !isLoading && <AdminLayout>
        <Space align="center" size={'middle'} style={{ marginBottom: '2rem' }}>
            <Image width={48} height={48} preview={false} src={lesson.discipline?.icon} />
            <Typography.Title level={1} style={{ fontSize: '48px', marginBottom: 0 }}>{lesson.name}</Typography.Title>
        </Space>
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Card style={{ borderRadius: '1rem', boxShadow: '2px 2px 5px #d6d6d6' }}>
                    <Typography.Text>
                        {parseHtml(lesson.content, {
                            replace: node => {
                                console.log('el', node)
                                if (node.type == 'tag' && node['name'] == 'img') {
                                    node['attribs']['style'] += "max-width:100%;"
                                }
                                return node
                            }
                        })}
                    </Typography.Text>
                </Card>
            </Col>
        </Row>
    </AdminLayout >
}

export default LessonPage