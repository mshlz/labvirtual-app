import { Card, Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NavigationMenu } from "../../../../components/pages/Class/NavigationMenu";
import ActivitiesTab from "../../../../components/pages/Class/Tabs/ActivitiesTab";
import { MuralTab } from "../../../../components/pages/Class/Tabs/MuralTab";
import { PeopleTab } from "../../../../components/pages/Class/Tabs/PeopleTab";
import { AdminLayout } from "../../../../layouts/AdminLayout";
import { ClassService } from "../../../../services/ClassService";


type TabKeys = 'mural' | 'activities' | 'people'
const ClassMural = () => {
    const router = useRouter()
    const query = router.query
    const { classId } = query as { classId: string }

    const [klass, setKlass] = useState(null)
    const [activeTab, setActiveTab] = useState<TabKeys>('mural')

    useEffect(() => {
        loadResource()
    }, [query])

    const loadResource = async () => {
        const result = await ClassService.get(classId)
        console.log(result)
        setKlass(result)
    }

    const renderTab = () => {
        switch (activeTab) {
            case 'activities':
                return <ActivitiesTab classId={classId} />
            case 'people':
                return <PeopleTab classId={classId} />
            case 'mural':
                return <MuralTab classId={classId} />
        }
    }
    return <AdminLayout>
        <Col md={24} lg={20} xxl={20}>
            <Row gutter={[24, 24]} >
                <Col span={24}>
                    <Card
                        style={{
                            // backgroundColor: 'steelblue'
                            // height: 150
                        }}
                        title={
                            <Typography.Title level={2} style={{ marginBottom: '48px' }}>Turma {klass?.name}</Typography.Title>
                        }
                        tabList={[
                            { key: 'mural', tab: "Mural" },
                            { key: 'activities', tab: "Atividades" },
                            { key: 'people', tab: "Pessoas" },
                        ]}
                        onTabChange={(key: TabKeys) => setActiveTab(key)}
                        bodyStyle={{ padding: 0 }}
                    />
                </Col>

                {renderTab()}

                {/* <Col span={6}>
                    <Card
                        hidden={true}
                        title="Atividades"
                        actions={[
                            <Button type="link">Ver atividades</Button>
                        ]}
                    >
                        Nenhuma atividade
                    </Card>
                </Col> */}



            </Row>
        </Col >
    </AdminLayout >
}

export default ClassMural