import { Button, Card, Col, Collapse, Row, Space, Tag, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { ReactNode } from "react"
import router from "next/router"
import { parseHtml } from "../../../../utils/parseHtml"
import { UserType } from "../../../../models/User"
import { ClassworkSubmission } from "../../../../models/ClassworkSubmission"

interface IActivityStudentCard {
  classworkSubmission: ClassworkSubmission
  // classId: string
  // id: string
  // title: string
  // description: string
  // createdAt?: Date
  icon?: ReactNode
  loading?: boolean
  key: any
  // userType: UserType
}

export const ActivityStudentCard = (props: IActivityStudentCard) => {
  const Extra = (
    <Typography.Text type={"secondary"}>
      {props.classworkSubmission.status == "NEW"
        ? "Publicado em"
        : "Entregue em"}{" "}
      {new Date(props.classworkSubmission.updatedAt).toLocaleString("pt-BR")}
    </Typography.Text>
  )

  console.log(props.classworkSubmission)

  const getActivityStatus = () => {
    const { status, grade } = props.classworkSubmission
    let text = ""
    if (status == "SUBMITTED") text = "ENTREGUE"
    else if (status == "RETURNED") text = `NOTA: ${grade}`

    return text && <Tag>{text}</Tag>
  }
  return (
    <Collapse.Panel
      {...props}
      header={
        <Space>
          <Avatar icon={props.icon} />
          <Typography.Text>
            {props.classworkSubmission.classwork.name}
          </Typography.Text>
        </Space>
      }
      extra={Extra}
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
              router.push(
                `/v2/class/${props.classworkSubmission.classId}/activity/${props.classworkSubmission._id}`
              )
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
              {"Item postado em "}
              {new Date(props.classworkSubmission.createdAt).toLocaleString(
                "pt-BR"
              )}{" "}
              {`por ${props.classworkSubmission.classwork.author.name}`}
            </Typography.Paragraph>
          </Col>
          <Col span={6}>
            <Typography.Paragraph style={{ textAlign: "right" }}>
              {getActivityStatus()}
            </Typography.Paragraph>
          </Col>
        </Row>
        {/* <Row>
                <Typography.Text>tipo: {props.userType}</Typography.Text>
            </Row> */}
        <Typography.Paragraph>
          {parseHtml(props.classworkSubmission.classwork.description)}
        </Typography.Paragraph>
      </Card>
    </Collapse.Panel>
  )
}
