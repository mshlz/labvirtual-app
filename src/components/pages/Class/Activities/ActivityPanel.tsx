import { Button, Card, Col, Collapse, Row, Space, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { ReactNode } from "react"

interface IActivityPanel {
    title: string
    description: string
    icon?: ReactNode
    loading?: boolean
    key: any
}

export const ActivityPanel = (props: IActivityPanel) => {
    return <Collapse.Panel
        {...props}
        header={
            <Space>
                <Avatar icon={props.icon} />
                <Typography.Text>{props.title}</Typography.Text>
            </Space>
        }
        extra={<Typography.Text type={'secondary'}>{props.description}</Typography.Text>}
        showArrow={false}
        style={{
            borderBottom: '1px solid #ddd'
        }}
    >
        <Card
            loading={props.loading}
            actions={[
                <Button style={{ float: 'left', marginLeft: '24px' }}>Ver atividade</Button>
            ]}
            style={{
                boxShadow: "5px 8px 24px 5px rgb(225, 225, 225)"
            }}
        >
            <Row>
                <Col span={18}>
                    <Typography.Paragraph type={'secondary'}>Item postado em 22/02/2021</Typography.Paragraph>
                </Col>
                <Col span={6}>
                    <Typography.Paragraph style={{ textAlign: 'right' }}>Devolvido</Typography.Paragraph>
                </Col>

            </Row>
            <Typography.Paragraph>
                Instruções

                asdfasdf
            </Typography.Paragraph>
        </Card>
    </Collapse.Panel>
}