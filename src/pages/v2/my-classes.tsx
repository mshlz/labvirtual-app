import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Result, Row, Space } from "antd"
import Title from "antd/lib/typography/Title"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../components/Loading/Loading"
import { ClassEditForm } from "../../components/pages/Manager/Class/ClassEditForm"
import ClassCard from "../../components/pages/MyClasses/ClassCard"
import { CreateClass } from "../../components/pages/MyClasses/CreateClass"
import { EnrollClass } from "../../components/pages/MyClasses/EnrollClass"
import { useApp } from "../../context/AppContext"
import { ModalStack } from "../../context/ModalStackContext"
import { AdminLayout } from "../../layouts/AdminLayout"
import { ClassService } from "../../services/ClassService"
import CreateClassPage from "../manager/classes/create"

const MyClasses = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [classes, setClasses] = useState([])
  const { user } = useApp()

  useEffect(() => {
    fetchResource()
  }, [])

  const fetchResource = async () => {
    setIsLoading(true)
    const classes = await ClassService.getMyClasses()
    setClasses(classes)
    setIsLoading(false)
  }

  const openEnrollModal = () => {
    ModalStack.open(
      (mId) => (
        <EnrollClass
          onFinish={(hasChange) => {
            ModalStack.close(mId)
            hasChange && fetchResource()
          }}
        />
      ),
      { footer: null }
    )
  }

  const openNewClassModal = () => {
    ModalStack.open(
      (mId) => (
        <CreateClass
          onFinish={() => {
            ModalStack.close(mId)
            fetchResource()
          }}
        />
      ),
      { footer: null }
    )
  }

  return (
    <AdminLayout>
      <Row justify="space-between" style={{ marginBottom: "16px" }}>
        <Col flex={1}>
          <Title level={1}>Minhas turmas</Title>
        </Col>

        <Col>
          <Space>
            {user.type === "TEACHER" ? (
              <Button
                type="primary"
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: "8px" }}
                  />
                }
                onClick={() => openNewClassModal()}
              >
                Criar nova turma
              </Button>
            ) : null}

            {user.type === "STUDENT" ? (
              <Button
                type="primary"
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: "8px" }}
                  />
                }
                onClick={() => openEnrollModal()}
              >
                Participar de nova turma
              </Button>
            ) : null}
          </Space>
        </Col>
      </Row>

      {isLoading ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <Row gutter={[16, 16]}>
          {classes?.length === 0 && (
            <Col span={24}>
              {user.type === "STUDENT" ? (
                <Result
                  status={404}
                  title={"Você não participa de nenhuma turma ainda"}
                  subTitle={
                    "Para ingressar em uma turma, clique no botão abaixo e insira o código da turma."
                  }
                  extra={
                    <Button
                      type="primary"
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: "8px" }}
                        />
                      }
                      onClick={() => openEnrollModal()}
                    >
                      Participar de nova turma
                    </Button>
                  }
                />
              ) : null}

              {user.type === "TEACHER" ? (
                <Result
                  status={404}
                  title={"Você não tem nenhuma turma ainda"}
                  subTitle={
                    "Para criar uma nova turma, clique no botão abaixo."
                  }
                  extra={
                    <Button
                      type="primary"
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: "8px" }}
                        />
                      }
                      onClick={() => openNewClassModal()}
                    >
                      Criar nova turma
                    </Button>
                  }
                />
              ) : null}
            </Col>
          )}
          {classes?.map((c) => (
            <Col xs={24} sm={12} md={8} lg={6}>
              <ClassCard id={c._id} name={c.name} />
            </Col>
          ))}
        </Row>
      )}
    </AdminLayout>
  )
}

export default MyClasses
