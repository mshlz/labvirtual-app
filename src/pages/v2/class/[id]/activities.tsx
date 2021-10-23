import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Collapse, Divider, Row, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ActivityPanel } from "../../../../components/pages/Class/Activities/ActivityPanel";
import { NewTopicModal } from "../../../../components/pages/Class/Activities/NewTopicModal";
import { NavigationMenu } from "../../../../components/pages/Class/NavigationMenu";
import { AdminLayout } from "../../../../layouts/AdminLayout";
import { ClassTopicService } from "../../../../services/ClassTopicService";



const ClassActivities = () => {
    const router = useRouter()
    const query = router.query
    const id = query.id as string

    const [topics, setTopics] = useState(null)

    const [newTopicModal, setModalOpen] = useState(false)

    useEffect(() => {
        if (!id) return

        loadTopics()
    }, [query])

    const loadTopics = async () => {
        const result = await ClassTopicService.list()

        setTopics(result.data)
    }

    return <AdminLayout>
        <Col lg={20} >
            <Row gutter={[24, 24]} >

                <Col span={24}>
                    <NavigationMenu active="activities" classId={id} />
                </Col>

                <Col span={24}>
                    <NewTopicModal
                        classId={id}
                        isOpen={newTopicModal}
                        handleSuccess={() => (setModalOpen(false), loadTopics())}
                        handleCancel={() => setModalOpen(false)}
                    />
                    <Space>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />}
                            onClick={() => router.push({ pathname: 'activity/new', query: { id } })}
                        >
                            Adicionar atividade
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />}
                            onClick={() => setModalOpen(true)}
                        >
                            Adicionar tópico
                        </Button>
                    </Space>
                </Col>

                {topics?.map(t =>
                    <Col span={24} style={{ marginBottom: '24px' }}>
                        <Typography.Title level={2}>{t.name}</Typography.Title>
                        <Divider style={{ margin: '12px 0' }} />
                        <Collapse
                            defaultActiveKey={[]}
                            onChange={() => { }}
                            bordered={false}
                            ghost={true}
                            accordion={true}
                        >
                            <ActivityPanel
                                // loading={true}
                                key="1"
                                title={"Dummy"}
                                description={"Publicado em 20/08/2020"}
                                icon={"A"}
                            />
                        </Collapse>
                    </Col>
                )}


            </Row>
        </Col >
    </AdminLayout >
}

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

export default ClassActivities