import { Card, Col, Image, Modal, Row, Space, Typography } from "antd"
import htmlParser from 'html-react-parser'
import router from "next/router"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { GlossaryService } from "../../../services/GlossaryService"
import { LessonService } from "../../../services/LessonService"
// import { parseHtml } from "../../../utils/parseHtml"

// TODO THIS MUST BE MOVED TO UTILS (refactor branch)
// TODO ADD GLOBAL MODAL SERVICE
const parseHtml = (value, openGlossaryEntry) => {
    return htmlParser(value, {
        replace: node => {
            if (node.type == 'tag') {
                let current: any = node
                switch (node['name']) {
                    case 'img':
                        current = <Image src={node['attribs']['src']} />
                        break;
                    case 'span':
                        if (node['attribs'] && node['attribs']['data-origin'] == 'glossary-entry-word') {
                            const text = (node['children'] || []).filter(v => typeof v.data == 'string').reduce((v, c) => v += c.data, '')
                            const uuid = node['attribs']['id']
                            current = <Typography.Text style={{ borderBottom: 'dashed 1px #333', cursor: 'pointer' }} onClick={() => openGlossaryEntry(uuid)}>{text}</Typography.Text>
                        }
                        break;
                }
                return current
            }
            return node
        }
    })
}


const LessonPage = () => {
    const contentId = router.query.contentId as string
    const [lesson, setLesson] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [isModalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    useEffect(() => {
        if (contentId) {
            loadLesson(contentId)
        }
    }, [contentId])

    const loadLesson = async (contentId: string) => {
        setIsLoading(true)
        const result = await LessonService.get(contentId)
        setLesson(result)
        setIsLoading(false)
    }

    const openGlossaryEntry = async (id: string) => {

        setModalData(undefined)
        setModalOpen(true)

        const entry = await GlossaryService.get(id)
        if (!entry) {
            return
        }

        setModalData(entry)
    }

    const renderGlossaryModal = () => {
        return <Modal
            title={modalData?.name || 'Carregando...'}
            centered
            visible={isModalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
        >
            {modalData
                ? parseHtml(modalData.description, openGlossaryEntry)
                : <LoadingComponent />}
        </Modal>
    }

    return !isLoading && <AdminLayout>
        <Space align="center" size={'middle'} style={{ marginBottom: '2rem' }}>
            <Image width={48} height={48} preview={false} src={lesson.discipline?.icon} />
            <Typography.Title level={1} style={{ fontSize: '48px', marginBottom: 0 }}>{lesson.name}</Typography.Title>
        </Space>
        {renderGlossaryModal()}
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Card style={{ borderRadius: '1rem', boxShadow: '2px 2px 5px #d6d6d6' }}>
                    <Typography.Text>
                        {parseHtml(lesson.content, openGlossaryEntry)}
                    </Typography.Text>
                </Card>
            </Col>
        </Row>
    </AdminLayout >
}

export default LessonPage