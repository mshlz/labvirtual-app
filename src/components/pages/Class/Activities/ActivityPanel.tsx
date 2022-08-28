import { Button, Card, Col, Collapse, Row, Space, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { ReactNode } from "react"
import router from "next/router"
import { parseHtml } from "../../../../utils/parseHtml"
import { UserType } from "../../../../models/User"

interface IActivityPanel {
  classId: string
  id: string
  title: string
  description: string
  createdAt?: Date
  icon?: ReactNode
  loading?: boolean
  key: any
  userType: UserType
}

export const ActivityPanel = (props: IActivityPanel) => {
  return (
    <Collapse.Panel
      {...props}
      header={
        <Space>
          <Avatar icon={props.icon} />
          <Typography.Text>{props.title}</Typography.Text>
        </Space>
      }
      extra={
        <Typography.Text type={"secondary"}>
          {new Date(props.createdAt).toLocaleString("pt-BR")}
        </Typography.Text>
      }
      showArrow={false}
      style={{
        borderBottom: "1px solid #ddd",
      }}
    >
      <Card
        loading={props.loading}
        actions={[
          <Button
            style={{ float: "left", marginLeft: "24px" }}
            onClick={() =>
              router.push(`/v2/class/${props.classId}/activity/${props.id}`)
            }
          >
            Ver atividade
          </Button>,
        ]}
        style={{
          boxShadow: "5px 8px 24px 5px rgb(225, 225, 225)",
        }}
      >
        <Row>
          <Col span={18}>
            <Typography.Paragraph type={"secondary"}>
              Item postado em{" "}
              {new Date(props.createdAt).toLocaleString("pt-BR")}
            </Typography.Paragraph>
          </Col>
          <Col span={6}>
            <Typography.Paragraph style={{ textAlign: "right" }}>
              Devolvido
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row>
          <Typography.Text>tipo: {props.userType}</Typography.Text>
        </Row>
        <Typography.Paragraph>
          {parseHtml(props.description || "")}
        </Typography.Paragraph>
      </Card>
    </Collapse.Panel>
  )
}
