import { Card, Image, Space, Typography } from "antd"
import router from "next/router"

interface ISubjectCardProps {
    id: string
    name: string
    iconSrc: string
}

export const SubjectCard = ({ iconSrc, name, id }: ISubjectCardProps) => {
    return <Card
        onClick={() => router.push(`/content/subject/${id}`)}
        style={{ borderRadius: '1rem', boxShadow: '2px 2px 5px #d6d6d6' }}
        hoverable
    >
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Image
                width={64}
                height={64}
                src={iconSrc}
                preview={false}
            />
            <Typography.Title
                level={2}
                style={{ marginBottom: 0, marginLeft: '16px' }}
            >
                {name}
            </Typography.Title>
        </div>
    </Card>
}
