import { Card, Col, Image, Row, Space, Typography } from "antd"
import router from "next/router"
import { useEffect, useState } from "react"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { GameService } from "../../../services/GameService"
import { parseHtml } from "../../../utils/parseHtml"

const GamePage = () => {
  const contentId = router.query.contentId as string
  const [game, setGame] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (contentId) {
      loadResource(contentId)
    }
  }, [contentId])

  const loadResource = async (contentId: string) => {
    setIsLoading(true)
    const result = await GameService.get(contentId)
    setGame(result)
    setIsLoading(false)
  }

  return (
    !isLoading && (
      <AdminLayout>
        <Space align="center" size={"middle"} style={{ marginBottom: "2rem" }}>
          <Image width={48} height={48} preview={false} src={game.icon} />
          <Typography.Title
            level={1}
            style={{ fontSize: "48px", marginBottom: 0 }}
          >
            {game.name}
          </Typography.Title>
        </Space>

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              style={{ borderRadius: "1rem", boxShadow: "2px 2px 5px #d6d6d6" }}
            >
              <Typography.Text>{parseHtml(game.content)}</Typography.Text>
            </Card>
          </Col>
        </Row>
      </AdminLayout>
    )
  )
}

export default GamePage
