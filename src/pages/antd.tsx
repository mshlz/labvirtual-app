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
      <Table
        scroll={{ x: true }}
        columns={[
          {
            fixed: true,
            title: "Aluno",
            sorter: (a, b) => a.n > b.n ? 1 : 0,
            showSorterTooltip: true,
            render: (v) => v.n,
          },
          {
            title: "Atividade X",
            render: (v) => v.x,
          },
          {
            title: "Atividade y",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
        ]}
        dataSource={[
          {
            n: "Mateus Holzschuh",
            x: "XXXXXXXXXXXXXXX",
          },{
            n: "P Holzschuh",
            x: "YYYYYYYYYYYYYYY",
          },
        ]}
      />
    </AdminLayout>
  )
}

export default AntdTest
