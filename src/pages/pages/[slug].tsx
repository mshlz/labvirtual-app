import { Card, Col, Image, Row, Space, Typography } from "antd"
import router from "next/router"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../components/Loading/Loading"
import { PublicPageLayout } from "../../layouts/PublicPageLayout"
import { HelpPageService } from "../../services/HelpPageService"
import { parseHtml } from "../../utils/parseHtml"

const PublicPageFromSlug = () => {
  const slug = router.query.slug as string

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(null)

  useEffect(() => {
    if (slug && slug != "home") {
      setLoading(true)
      loadPage(slug)
    }
  }, [slug])

  const loadPage = async (slug: string) => {
    const code = slug.split("-").pop()
    const result = await HelpPageService.getByCode(code)
    setPage(result)
    setLoading(false)
  }

  let Component

  if (loading) {
    Component = <LoadingComponent />
  } else if (!page) {
    Component = (
      <>
        <Typography.Title
          level={1}
          style={{ fontSize: "24px", marginBottom: 0 }}
        >
          👈 Utilize o menu lateral de navegação para encontrar a página
          desejada
        </Typography.Title>
      </>
    )
  } else {
    Component = (
      <>
        <Space align="center" size={"middle"} style={{ marginBottom: "2rem" }}>
          {page.section?.icon && (
            <Image
              width={48}
              height={48}
              preview={false}
              src={page.section.icon}
            />
          )}
          <Typography.Title
            level={1}
            style={{ fontSize: "40px", marginBottom: 0 }}
          >
            {page.name}
          </Typography.Title>
        </Space>

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              style={{ borderRadius: "1rem", boxShadow: "2px 2px 5px #d6d6d6" }}
            >
              <Typography.Text>{parseHtml(page.content)}</Typography.Text>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return <PublicPageLayout>{Component}</PublicPageLayout>
}

export default PublicPageFromSlug
