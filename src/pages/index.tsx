import { Calendar, Tag, Typography } from "antd"
import { toast } from "react-toastify"
import { Button } from "../components/UI/Button"
import { useApp } from "../context/AppContext"
import { AdminLayout } from "../layouts/AdminLayout"

const Index = () => {
  const { user } = useApp()
  return (
    <AdminLayout>
      <Typography.Title level={3}>Olá, {user.name}!</Typography.Title>
      <Calendar
        style={{ padding: 16 }}
        headerRender={(c) => (
          <Typography.Title level={3}>
            {c.value.format("dddd, DD [de] MMMM [de] YYYY")}
          </Typography.Title>
        )}
        disabledDate={() => false}
        dateCellRender={(date) => {
          return (
            <>
              <Tag closable color={"processing"}>
                Dia {date.date()}
              </Tag>
            </>
          )
        }}
      />
    </AdminLayout>
  )
}

export default Index
