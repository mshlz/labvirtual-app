import { Button, Card, Col, Image, Row, Typography } from "antd"
import Title from "antd/lib/typography/Title"
import { useState } from "react"
import { DisciplineCard } from "../components/pages/Content/DisciplineCard"
import { AdminLayout } from "../layouts/AdminLayout"
const { Meta } = Card

const AntdTest = () => {
  let [modalIsOpen, setModalOpen] = useState(false)
  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <AdminLayout>
      <Typography.Title level={1}>Disciplinas</Typography.Title>

      <Row gutter={[24, 24]}>
        {/* <Col xs={24} md={12} xl={8} xxl={6}>
        <DisciplineCard iconSrc={'https://cdn-icons-png.flaticon.com/128/223/223738.png'} name="Biologia" />
      </Col>
      <Col xs={24} md={12} xl={8} xxl={6}>
        <DisciplineCard iconSrc={'https://cdn-icons-png.flaticon.com/128/184/184671.png'} name="Física" />
      </Col>
      <Col xs={24} md={12} xl={8} xxl={6}>
        <DisciplineCard iconSrc={'https://cdn-icons-png.flaticon.com/128/1739/1739515.png'} name="Matemática" />
      </Col> */}
      </Row>
    </AdminLayout>
  )
}

export default AntdTest
