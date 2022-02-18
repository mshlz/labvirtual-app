import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import ClassCard from "../../components/pages/MyClasses/ClassCard";
import { AdminLayout } from "../../layouts/AdminLayout";
import { ClassService } from "../../services/ClassService";

const MyClasses = () => {
  // const router = useRouter()
  // const { id } = router.query
  const [classes, setClasses] = useState(null)

  useEffect(() => {
    fetchResource()
  }, [])

  const fetchResource = async () => {
    const classes = await ClassService.list()
    setClasses(classes.data)
  }

  return <AdminLayout>
    <Title level={1}>Minhas turmas</Title>


    <Row gutter={16}>
      {classes?.map(c =>
        <Col span={6}>
          <ClassCard
            id={c._id}
            name={c.name}
          />
        </Col>
      )}
    </Row>
  </AdminLayout>
}

export default MyClasses