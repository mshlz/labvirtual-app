import { Card, Col, PageHeader, Row, Table } from "antd"
import { useState } from "react"
import { AdminLayout } from "../../../../layouts/AdminLayout"
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

const MyActivities = () => {
  const [s, ss] = useState()
  return (
    <AdminLayout>
      <PageHeader title={"Minhas atividades"} onBack={() => {}} />

      {/* <Card> */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Table
            // loading={true}
            columns={[
              {
                title: "Atividade",
                render: (v) => v.title,
              },
              {
                title: "Data",
              },
              {
                title: "Nota",
              },
            ]}
            dataSource={data}
            pagination={false}
          />
        </Col>
      </Row>
      {/* </Card> */}
    </AdminLayout>
  )
}

export default MyActivities
