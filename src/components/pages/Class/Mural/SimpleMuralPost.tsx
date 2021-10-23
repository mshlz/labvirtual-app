import { faTasks } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { formatRelative, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ReactNode } from "react"

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
                props.date && formatRelative(typeof props.date === 'string' ? parseISO(props.date) : props.date, Date.now(), { locale: ptBR })
            }
        />

        {props.content && <Typography.Paragraph style={{ marginTop: 16 }}>
            {props.content}
        </Typography.Paragraph>}
    </Card>
}

export default SimpleMuralPost