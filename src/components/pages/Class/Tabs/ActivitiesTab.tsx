import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Collapse, Divider, Row, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClassTopicService } from "../../../../services/ClassTopicService";
import { ClassworkService } from "../../../../services/ClassworkService";
import { LoadingComponent, LoadingWrapper } from "../../../Loading/Loading";
import { Loading } from "../../../Loading/Loading2";
import { ActivityPanel } from "../Activities/ActivityPanel";
import { NewTopicModal } from "../Activities/NewTopicModal";


interface ActivitiesTabProps {
    classId: string
}

export const ActivitiesTab = (props: ActivitiesTabProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    const [topics, setTopics] = useState([])
    const [activities, setActivities] = useState<any>([])

    const [newTopicModal, setModalOpen] = useState(false)

    useEffect(() => {
        (async () => {
            await loadActivities()
            await loadTopics()
            setIsLoading(false)
        })()
    }, [props.classId])

    const loadTopics = async () => {
        const result = await ClassTopicService.list()

        setTopics(result.data)
    }

    const loadActivities = async () => {
        const result = await ClassworkService.getFromClass(props.classId)
        console.log('activities', result)
        setActivities(result)
    }

    const renderTopicAtivities = topic => {
        const topicActivities = activities.filter(v => v.topic === topic._id)

        if (topicActivities.length === 0)
            return <Typography.Title level={5}>Não ha items</Typography.Title>

        return topicActivities.map(v =>
            <ActivityPanel
                key={v._id}
                classId={props.classId}
                id={v._id}
                title={v.name}
                description={v.description}
                createdAt={v.createdAt}
                icon={"A"}
            />
        )
    }

    return <LoadingWrapper isLoading={isLoading} fullWidth={true}>
        <Col span={24}>
            <Row gutter={[24, 24]} >

                <Col span={24}>
                    <NewTopicModal
                        classId={props.classId}
                        isOpen={newTopicModal}
                        handleSuccess={() => (setModalOpen(false), loadTopics())}
                        handleCancel={() => setModalOpen(false)}
                    />
                    <Space>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />}
                            onClick={() => router.push({ pathname: '/v2/class/[classId]/activity/new', query: { classId: props.classId } })}
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

                {topics.map(topic =>
                    <Col span={24} style={{ marginBottom: '24px' }}>
                        <Typography.Title level={2}>{topic.name}</Typography.Title>
                        <Divider style={{ margin: '12px 0' }} />
                        <Collapse
                            defaultActiveKey={[]}
                            onChange={() => { }}
                            bordered={false}
                            ghost={true}
                            accordion={true}
                        >
                            {renderTopicAtivities(topic)}
                        </Collapse>
                    </Col>
                )}


            </Row>
        </Col >
    </LoadingWrapper>
}

export default ActivitiesTab