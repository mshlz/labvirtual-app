import { Card, Typography } from "antd"
import parseHtml from 'html-react-parser'
import router from "next/router"

interface ILessonCardProps {
    id: string
    name: string
    content: string
    // iconSrc?: string
}

export const LessonCard = ({ name, id, content }: ILessonCardProps) => {
    const renderContent = (content || '').slice(0, 400).concat(content?.length > 400 ? '...' : '')
    
    return <Card
        onClick={() => router.push(`/content/lesson/${id}`)}
        style={{ borderRadius: '1rem', boxShadow: '2px 2px 5px #d6d6d6' }}
        bodyStyle={{ paddingBottom: '16px'}}
        hoverable
    >
        <div >
            {/* <Image
                width={64}
                height={64}
                src={iconSrc}
                preview={false}
            /> */}
            <Typography.Title
                level={2}
                style={{ marginBottom: '8px' }}
            >
                {name}
            </Typography.Title>
            <Typography.Text
                style={{ marginBottom: 0, color: 'gray' }}
                italic
            >
                {parseHtml(renderContent)}
            </Typography.Text>
        </div>
    </Card>
}
