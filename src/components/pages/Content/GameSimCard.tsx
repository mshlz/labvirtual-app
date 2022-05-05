import { Card, Image, Typography } from "antd"
import router from "next/router"
import { parseHtml } from "../../../utils/parseHtml"

interface IGameSimCardProps {
    id: string
    icon: string
    name: string
    link?: string
    // iconSrc?: string
}

export const GameSimCard = ({ name, id, icon, link }: IGameSimCardProps) => {
    return <Card
        onClick={() => router.push(link || '#')}
        style={{ borderRadius: '1rem', boxShadow: '2px 2px 5px #d6d6d6' }}
        bodyStyle={{ paddingBottom: '16px'}}
        hoverable
    >
        <div >
            <Image
                width={100}
                height={100}
                src={icon}
                preview={false}
            />
            <Typography.Title
                level={3}
                style={{ marginBottom: '8px' }}
            >
                {name}
            </Typography.Title>
        </div>
    </Card>
}
