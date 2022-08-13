import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  List,
  PageHeader,
  Row,
  Tag,
  Typography,
} from "antd"
import Title from "antd/lib/typography/Title"
import { useState } from "react"
import { LoadingComponent } from "../components/Loading/Loading"
import { DisciplineCard } from "../components/pages/Content/DisciplineCard"
import { QuestionItem } from "../components/QuestionItem/QuestionItem"
import { AdminLayout } from "../layouts/AdminLayout"
const { Meta } = Card

const data = [
  {
    title: "Aluno Fulano Cliclano 1",
  },
  {
    title: "Aluno Fulano Cliclano 2",
  },
  {
    title: "Aluno Fulano Cliclano 3",
  },
  {
    title: "Aluno Fulano Cliclano 4",
  },
  {
    title: "Aluno Fulano Cliclano 5",
  },
  {
    title: "Aluno Fulano Cliclano 6",
  },
]

interface UserListProps<T> {
  data: T[]
  selectedIndex?: number
  onItemClick?: (item: T, index: number) => void
}

function UserList<T = any>(props: UserListProps<T>) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={(item, i) => (
        <List.Item
          onClick={() => props.onItemClick && props.onItemClick(item, i)}
          style={{
            padding: "16px",
            cursor: "pointer",
            background: i === props.selectedIndex ? "#e3e3e3" : undefined,
          }}
        >
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={item.title}
            description={
              Math.random() > 0.5 ? (
                <Tag color={"green"}>Entregue</Tag>
              ) : (
                <Tag color={"red"}>Atrasado</Tag>
              )
            }
          />
        </List.Item>
      )}
    />
  )
}

const AntdTest = () => {
  const [s, ss] = useState()
  return (
    <AdminLayout>
      <PageHeader title={"Devv"} onBack={() => {}} />

      {/* <Card> */}
      <Row gutter={[24, 24]}>
        <Col
          span={6}
          style={{
            background: "#fff",
            height: "450px",
            padding: 0,
            overflowY: "auto",
          }}
        >
          <UserList
            data={data}
            selectedIndex={s}
            onItemClick={(it, i) => ss(i)}
          />
        </Col>

        <Col span={18} style={{ height: "450px", overflowY: "scroll" }}>
          {false ? (
            <>
              <QuestionItem
                question={{
                  _id: "u",
                  alternatives: [],
                  name: "titulo da questão",
                  text: "jkhlahjsfdhhasfdjkl",
                  type: "DISSERTATIVE",
                }}
                comment={{
                  text: "blabla",
                  authorId: "a",
                  author: {
                    name: "mateus",
                    birthdate: new Date().toDateString(),
                  },
                  createdAt: new Date(),
                }}
                fieldName="ssssss"
                grade={10}
              />
              <QuestionItem
                question={{
                  _id: "ux",
                  alternatives: [
                    { code: "xx", text: "xx" },
                    { code: "xx2", text: "xx2" },
                    { code: "xx3", text: "xx3", correct: true },
                  ],
                  name: "titulo da questão",
                  text: "",
                  type: "SINGLE_CHOICE",
                }}
                comment={{
                  text: "blabla",
                  authorId: "a",
                  author: {
                    name: "mateus",
                    birthdate: new Date().toDateString(),
                  },
                  createdAt: new Date(),
                }}
                fieldName="ssssss2s"
                grade={10}
              />
            </>
          ) : (
            <LoadingComponent />
          )}
        </Col>
      </Row>
      {/* </Card> */}
    </AdminLayout>
  )
}

export default AntdTest
