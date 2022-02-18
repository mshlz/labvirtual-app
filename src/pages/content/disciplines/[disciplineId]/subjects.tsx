import { Card, Col, Empty, Image, Row, Space, Typography } from "antd"
import router from "next/router"
import { useState, useEffect } from "react"
import { Loading } from "../../../../components/Loading/Loading2"
import { SubjectCard } from "../../../../components/pages/Content/SubjectCard"
import { useApp } from "../../../../context/AppContext"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const DisciplineSubjectsPage = () => {
    const disciplineId = router.query.disciplineId
    const { disciplines } = useApp()

    const [discipline, setDiscipline] = useState(null)
    useEffect(() => {
        setDiscipline(disciplines.find(v => v._id == disciplineId))
    })

    return discipline ? <AdminLayout>
        <Space align="center" size={'middle'} style={{ marginBottom: '2rem' }}>
            <Image width={48} height={48} preview={false} src={discipline.icon} />
            <Typography.Title level={1} style={{ fontSize: '48px', marginBottom: 0 }}>{discipline.name}</Typography.Title>
        </Space>

        <Row gutter={[24, 24]}>
            {(!discipline.subjects || discipline.subjects.length == 0) &&
                <Col span={24}>
                    <Card>
                        <Empty description="Não há assuntos cadastrados ainda" />
                    </Card>
                </Col>
            }

            {discipline.subjects?.map(subject =>
                <Col xs={24} md={12} xl={8} xxl={6}>
                    <SubjectCard iconSrc={subject.icon} name={subject.name} id={subject._id} />
                </Col>
            )}
        </Row>
    </AdminLayout> : <Loading />
}

export default DisciplineSubjectsPage