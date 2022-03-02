import { Card, Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "../../../../components/Loading/Loading";
import ActivitiesTab from "../../../../components/pages/Class/Tabs/ActivitiesTab";
import { MuralTab } from "../../../../components/pages/Class/Tabs/MuralTab";
import { PeopleTab } from "../../../../components/pages/Class/Tabs/PeopleTab";
import { AdminLayout } from "../../../../layouts/AdminLayout";
import { ClassService } from "../../../../services/ClassService";

const TabKeysArray = ['mural', 'activities', 'people'] as const
type TabKeys = typeof TabKeysArray[number]

const ClassMural = () => {
    const router = useRouter()
    const query = router.query
    const classId = router.query.classId as string

    const [klass, setKlass] = useState(null)
    const [activeTab, setActiveTab] = useState<TabKeys>('mural')

    useEffect(() => {
        loadResource()
    }, [query])

    useEffect(() => {
        const tab = window.location.hash.slice(1) as TabKeys
        if (TabKeysArray.includes(tab)) {
            setActiveTab(tab)
        }
    }, [router.pathname])

    const loadResource = async () => {
        if (!classId) return

        const result = await ClassService.get(classId)
        setKlass(result)
    }

    const changeTab = (key: TabKeys) => {
        window.location.hash = key
        setActiveTab(key)
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
    return <LoadingWrapper isLoading={!klass} fullWidth={true}>
        <AdminLayout>
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
                            activeTabKey={activeTab}
                            tabList={[
                                { key: 'mural', tab: "Mural" },
                                { key: 'activities', tab: "Atividades" },
                                { key: 'people', tab: "Pessoas" },
                            ]}
                            onTabChange={changeTab}
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
    </LoadingWrapper>
}

export default ClassMural