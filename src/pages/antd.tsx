import {
  Calendar,
  Card,
  Col,
  PageHeader,
  Row,
  Table,
  Tag,
  Typography,
} from "antd"
import { useState } from "react"
import { AdminLayout } from "../layouts/AdminLayout"
const { Meta } = Card

const data = [
  {
    title: "Atividade 1",
  },
  {
    title: "Atividade 2",
  },
  {
    title: "Atividade 3",
  },
  {
    title: "Atividade 4",
  },
  {
    title: "Atividade 5",
  },
  {
    title: "Atividade 6",
  },
]

const AntdTest = () => {
  const [s, ss] = useState()
  return (
    <AdminLayout>
      <Calendar
        style={{ padding: 16 }}
        headerRender={(c) => (
          <Typography.Title level={3}>
            {c.value.format("dddd, DD [de] MMMM [de] YYYY")}
          </Typography.Title>
        )}
        disabledDate={() => false}
        dateCellRender={(date) => {
          return (
            <>
              <Tag closable color={"processing"}>
                Dia {date.date()}
              </Tag>
              <Tag closable color={"error"}>
                Dia {date.date()}
              </Tag>
              <Tag closable color={"success"}>
                Dia {date.date()}
              </Tag>
            </>
          )
        }}
      />
    </AdminLayout>
  )
}

export default AntdTest
