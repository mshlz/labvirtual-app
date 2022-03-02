import { Card, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { ReactNode } from "react"
import { relativeDate } from "../../../../utils/date"

interface ISimpleMuralPost {
    title: string
    content?: ReactNode | string
    icon?: ReactNode | string
    date?: Date | string
    comments_count?: number
}

const SimpleMuralPost = (props: ISimpleMuralPost) => {

    return <Card
        actions={props.comments_count > 0 && [
                <Typography.Link style={{ textAlign: 'left', paddingLeft: '24px' }}>{props.comments_count} comentário{props.comments_count !== 1 && 's'}</Typography.Link>
            ]}
    >
        <Card.Meta
            className="meta-no-mb-title"
            avatar={
                <Avatar size={'large'} style={{ backgroundColor: 'blueviolet' }} icon={props.icon ?? <></>} />
            }
            title={
                <Typography.Text>{props.title}</Typography.Text>
            }
            description={
                props.date && relativeDate(props.date)
            }
        />

        {props.content && <Typography.Paragraph style={{ marginTop: 16 }}>
            {props.content}
        </Typography.Paragraph>}
    </Card>
}

export default SimpleMuralPost