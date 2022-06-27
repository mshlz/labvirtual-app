import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Result, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/Loading/Loading";
import ClassCard from "../../components/pages/MyClasses/ClassCard";
import { EnrollClass } from "../../components/pages/MyClasses/EnrollClass";
import { AdminLayout } from "../../layouts/AdminLayout";
import { ClassService } from "../../services/ClassService";

const MyClasses = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [classes, setClasses] = useState([])

  useEffect(() => {
    fetchResource()
  }, [])

  const fetchResource = async () => {
    setIsLoading(true)
    const classes = await ClassService.getMyClasses()
    setClasses(classes)
    setIsLoading(false)
  }

  return <AdminLayout>
    <Row justify="space-between" style={{ marginBottom: '16px' }}>
      <Col flex={1}>
        <Title
          level={1}
        >
          Minhas turmas
        </Title>
      </Col>

      <Col>
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />}
          onClick={() => setModalIsOpen(true)}
        >
          Participar de nova turma
        </Button>
      </Col>
    </Row>

    <EnrollClass
      isOpen={modalIsOpen}
      onFinish={(hasChange) => {
        setModalIsOpen(false)
        hasChange && fetchResource()
      }}
    />

    {isLoading ? (
      <>
        <LoadingComponent />
      </>
    ) : (
      <Row gutter={[16, 16]}>
        {classes?.length === 0 && (
          <Col span={24}>
            <Result
              status={404}
              title={"Você não participa de nenhuma turma ainda"}
              subTitle={"Para ingressar em uma turma, clique no botão abaixo e insira o código da turma."}
              extra={
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />}
                  onClick={() => setModalIsOpen(true)}
                >
                  Participar de nova turma
                </Button>
              }
            />
          </Col>
        )}
        {classes?.map(c =>
          <Col xs={24} sm={12} md={8} lg={6}>
            <ClassCard
              id={c._id}
              name={c.name}
            />
          </Col>
        )}
      </Row>

    )}
  </AdminLayout >
}

export default MyClasses