import { Button, Card, Divider, Typography } from "antd"
import Meta from "antd/lib/card/Meta"
import Title from "antd/lib/typography/Title"
import Link from "next/link"

interface IClassCardProps {
  id: string
  name: string
}

const ClassCard = (props: IClassCardProps) => {
  return (
    <Card
      // loading={true}
      hoverable
      actions={[
        <Link href={`/v2/class/${props.id}`}>
          <Button style={{ float: "left", marginLeft: "24px" }}>
            Ver turma
          </Button>
        </Link>,
      ]}
    >
      <Meta
        title={
          <Title level={3} style={{ marginBottom: 0 }}>
            {props.name}
          </Title>
        }
        // description="seção 1"
      />
      <Divider />
      <Typography>Nenhuma atividade</Typography>
    </Card>
  )
}

export default ClassCard
