import { Card, Col, Empty, Image, Row, Space, Typography } from "antd"
import router from "next/router"
import { useEffect, useState } from "react"
import { GameSimCard } from "../../../components/pages/Content/GameSimCard"
import { LessonCard } from "../../../components/pages/Content/LessonCard"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { GameService } from "../../../services/GameService"
import { LessonService } from "../../../services/LessonService"
import { SimulatorService } from "../../../services/SimulatorService"
import { SubjectService } from "../../../services/SubjectService"
import { VideoService } from "../../../services/VideoService"

const SubjectLessonsPage = () => {
    const subjectId = router.query.subjectId as string
    const [subject, setSubject] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [lessons, setLessons] = useState([])
    const [simulators, setSimulators] = useState([])
    const [games, setGames] = useState([])
    const [videos, setVideos] = useState([])

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
        const result2 = await SimulatorService.getFromSubjects(subjectId)
        setSimulators(result2)
        const result3 = await GameService.getFromSubjects(subjectId)
        setGames(result3)
        const result4 = await VideoService.getFromSubjects(subjectId)
        setVideos(result4)

        setIsLoading(false)
    }

    const loadSimulators = async () => {
        const result = await SimulatorService.getFromSubjects(subjectId)
        setSimulators(result)
    }

    const loadGames = async () => {
        const result = await GameService.getFromSubjects(subjectId)
        setGames(result)
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

            <Col span={24}>
                <Typography.Title level={2}>Simuladores</Typography.Title>
            </Col>
            {simulators?.map(sim =>
                <Col key={sim._id} xs={24} md={12} xl={8}>
                    <GameSimCard id={sim._id} name={sim.name} icon={sim.icon} link={`/content/simulator/${sim._id}`} />
                </Col>
            )}

            <Col span={24}>
                <Typography.Title level={2}>Games</Typography.Title>
            </Col>
            {games.map(game =>
                <Col key={game._id} xs={24} md={12} xl={8}>
                    <GameSimCard id={game._id} name={game.name} icon={game.icon} link={`/content/game/${game._id}`} />
                </Col>
            )}

            <Col span={24}>
                <Typography.Title level={2}>Videos</Typography.Title>
            </Col>
            {videos.map(video =>
                <Col key={video._id} xs={24} md={12} xl={8}>
                    <GameSimCard id={video._id} name={video.name} icon={video.icon} link={`/content/video/${video._id}`} />
                </Col>
            )}


        </Row>
    </AdminLayout>
}

export default SubjectLessonsPage