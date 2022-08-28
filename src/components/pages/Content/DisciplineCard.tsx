import { Card, Image, Typography } from "antd"
import router from "next/router"

interface IDisciplineCardProps {
  id: string
  name: string
  iconSrc: string
}

export const DisciplineCard = ({ iconSrc, name, id }: IDisciplineCardProps) => {
  return (
    <Card
      onClick={() => router.push(`/content/disciplines/${id}/subjects`)}
      style={{ borderRadius: "1rem", boxShadow: "2px 2px 5px #d6d6d6" }}
      hoverable
    >
      <Image width={64} height={64} src={iconSrc} preview={false} />
      <Typography.Title
        level={2}
        style={{ marginBottom: 0, fontWeight: "bold" }}
      >
        {name}
      </Typography.Title>
    </Card>
  )
}
