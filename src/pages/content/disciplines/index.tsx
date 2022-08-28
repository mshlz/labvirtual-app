import { Col, Row, Typography } from "antd"
import { DisciplineCard } from "../../../components/pages/Content/DisciplineCard"
import { useApp } from "../../../context/AppContext"
import { AdminLayout } from "../../../layouts/AdminLayout"

const DisciplinesPage = () => {
  const { disciplines } = useApp()

  return (
    <AdminLayout>
      <Typography.Title level={1}>Disciplinas</Typography.Title>

      <Row gutter={[24, 24]}>
        {disciplines.map((discipline) => (
          <Col xs={24} md={12} xl={8} xxl={6}>
            <DisciplineCard
              iconSrc={discipline.icon}
              name={discipline.name}
              id={discipline._id}
            />
          </Col>
        ))}
      </Row>
    </AdminLayout>
  )
}

export default DisciplinesPage
