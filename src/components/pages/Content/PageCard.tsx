import { Card, Typography } from "antd"
import router from "next/router"
import { parseHtml } from "../../../utils/parseHtml"

interface IPageCardProps {
  id: string
  name: string
  content: string
  // iconSrc?: string
}

export const PageCard = ({ name, id, content }: IPageCardProps) => {
  const renderContent = (content || "")
    .slice(0, 400)
    .concat(content?.length > 400 ? "..." : "")

  return (
    <Card
      onClick={() => router.push(`/content/page/${id}`)}
      style={{ borderRadius: "1rem", boxShadow: "2px 2px 5px #d6d6d6" }}
      bodyStyle={{ paddingBottom: "16px" }}
      hoverable
    >
      <div>
        {/* <Image
                width={64}
                height={64}
                src={iconSrc}
                preview={false}
            /> */}
        <Typography.Title level={2} style={{ marginBottom: "8px" }}>
          {name}
        </Typography.Title>
        <Typography.Text style={{ marginBottom: 0, color: "gray" }} italic>
          {parseHtml(renderContent)}
        </Typography.Text>
      </div>
    </Card>
  )
}
