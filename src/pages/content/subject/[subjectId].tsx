import { Card, Col, Empty, Image, Row, Space, Typography } from "antd"
import router from "next/router"
import { useEffect, useState } from "react"
import { GameSimCard } from "../../../components/pages/Content/GameSimCard"
import { LessonCard } from "../../../components/pages/Content/LessonCard"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { GameService } from "../../../services/GameService"
import { LessonService } from "../../../services/LessonService"
import { PageService } from "../../../services/PageService"
import { SimulatorService } from "../../../services/SimulatorService"
import { SubjectService } from "../../../services/SubjectService"
import { VideoService } from "../../../services/VideoService"
import lodash from "lodash"
import { PageCard } from "../../../components/pages/Content/PageCard"

const SubjectLessonsPage = () => {
  const subjectId = router.query.subjectId as string
  const [subject, setSubject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lessons, setLessons] = useState([])
  const [simulators, setSimulators] = useState([])
  const [games, setGames] = useState([])
  const [videos, setVideos] = useState([])
  const [dynamicSections, setDynamicSections] = useState<Record<string, any[]>>(
    {}
  )

  useEffect(() => {
    if (subjectId) {
      loadSubject(subjectId)
    }
  }, [subjectId])

  const loadSubject = async (subjectId: string) => {
    setIsLoading(true)
    const [subject, result, result2, result3, result4, result5] =
      await Promise.all([
        SubjectService.get(subjectId),
        LessonService.getFromSubjects(subjectId),
        SimulatorService.getFromSubjects(subjectId),
        GameService.getFromSubjects(subjectId),
        VideoService.getFromSubjects(subjectId),
        PageService.getFromSubjects(subjectId),
      ])
    setSubject(subject)
    setLessons(result)
    setSimulators(result2)
    setGames(result3)
    setVideos(result4)
    setDynamicSections(lodash.groupBy(result5, (v) => v.section.name) as any)

    setIsLoading(false)
  }
  console.log(dynamicSections)

  return (
    !isLoading && (
      <AdminLayout>
        <Space align="center" size={"middle"} style={{ marginBottom: "2rem" }}>
          <Image width={48} height={48} preview={false} src={subject?.icon} />
          <Typography.Title
            level={1}
            style={{ fontSize: "48px", marginBottom: 0 }}
          >
            {subject?.name}
          </Typography.Title>
        </Space>
        <Row gutter={[24, 24]}>
          {lessons.length ? (
            <>
              <Col span={24}>
                <Typography.Title level={2}>Conteúdos</Typography.Title>
              </Col>
              {lessons?.map((lesson) => (
                <Col key={lesson._id} span={24}>
                  {" "}
                  {/*xs={24} md={24} xl={12}*/}
                  <LessonCard
                    id={lesson._id}
                    name={lesson.name}
                    content={lesson.content}
                  />
                </Col>
              ))}
            </>
          ) : (
            <></>
          )}

          {simulators.length ? (
            <>
              <Col span={24}>
                <Typography.Title level={2}>Simuladores</Typography.Title>
              </Col>
              {simulators?.map((sim) => (
                <Col key={sim._id} xs={24} md={12} xl={8}>
                  <GameSimCard
                    id={sim._id}
                    name={sim.name}
                    icon={sim.icon}
                    link={`/content/simulator/${sim._id}`}
                  />
                </Col>
              ))}
            </>
          ) : (
            <></>
          )}

          {games.length ? (
            <>
              <Col span={24}>
                <Typography.Title level={2}>Games</Typography.Title>
              </Col>
              {games.map((game) => (
                <Col key={game._id} xs={24} md={12} xl={8}>
                  <GameSimCard
                    id={game._id}
                    name={game.name}
                    icon={game.icon}
                    link={`/content/game/${game._id}`}
                  />
                </Col>
              ))}
            </>
          ) : (
            <></>
          )}

          {videos.length ? (
            <>
              <Col span={24}>
                <Typography.Title level={2}>Videos</Typography.Title>
              </Col>
              {videos.map((video) => (
                <Col key={video._id} xs={24} md={12} xl={8}>
                  <GameSimCard
                    id={video._id}
                    name={video.name}
                    icon={video.icon}
                    link={`/content/video/${video._id}`}
                  />
                </Col>
              ))}
            </>
          ) : (
            <></>
          )}

          {Object.entries(dynamicSections)
            .filter((k) => k[1].length)
            .map(([sectionName, items]) => (
              <>
                <Col span={24}>
                  <Typography.Title level={2}>{sectionName}</Typography.Title>
                </Col>
                {items.map((item) => (
                  <Col key={item._id} xs={24} md={12} xl={8}>
                    <PageCard
                      id={item._id}
                      name={item.name}
                      content={item.content}
                    />
                  </Col>
                ))}
              </>
            ))}
        </Row>
      </AdminLayout>
    )
  )
}

export default SubjectLessonsPage
