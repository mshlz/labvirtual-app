import { Card, Col, Empty, Image, Row, Space, Typography } from "antd"
import router from "next/router"
import { useState, useEffect } from "react"
import { LessonCard } from "../../../components/pages/Content/LessonCard"
import { SubjectCard } from "../../../components/pages/Content/SubjectCard"
import { useApp } from "../../../context/AppContext"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { LessonService } from "../../../services/LessonService"
import { SubjectService } from "../../../services/SubjectService"

const SubjectLessonsPage = () => {
    const subjectId = router.query.subjectId as string
    const { subjects } = useApp()
    const [subject, setSubject] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        if (subjectId) {
            loadSubject(subjectId)
        }
    }, [subjectId])

    const loadSubject = async (subjectId: string) => {
        setIsLoading(true)
        const subject = await SubjectService.get(subjectId)
        setSubject(subject)
        const result = await LessonService.getFromSubjects(subjectId)
        setLessons(result)
        setIsLoading(false)
    }

    return !isLoading && <AdminLayout>
        <Space align="center" size={'middle'} style={{ marginBottom: '2rem' }}>
            <Image width={48} height={48} preview={false} src={subject?.icon} />
            <Typography.Title level={1} style={{ fontSize: '48px', marginBottom: 0 }}>{subject?.name}</Typography.Title>
        </Space>
        <Row gutter={[24, 24]}>
            {(!lessons || lessons.length == 0) &&
                <Col span={24}>
                    <Card>
                        <Empty description="Não há conteúdos cadastrados ainda" />
                    </Card>
                </Col>
            }

            {lessons?.map(lesson =>
                <Col key={lesson._id} span={24}> {/*xs={24} md={24} xl={12}*/}
                    <LessonCard id={lesson._id} name={lesson.name} content={lesson.content} />
                </Col>
            )}
        </Row>
    </AdminLayout>
}

export default SubjectLessonsPage