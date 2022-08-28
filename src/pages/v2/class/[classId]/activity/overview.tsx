import { message, Spin, Table } from "antd"
import router from "next/router"
import { useEffect } from "react"
import { ActivityEditForm } from "../../../../../components/pages/Class/Activities/ActivityEditForm"
import { AdminLayout } from "../../../../../layouts/AdminLayout"

const ActivityOverview = () => {
  const classId = router.query.classId as string
  useEffect(() => {
   
  }, [])

  return (
    <AdminLayout>
      <Table
        scroll={{ x: true }}
        columns={[
          {
            fixed: true,
            title: "Aluno",
            sorter: (a, b) => (a.n > b.n ? 1 : 0),
            showSorterTooltip: true,
            render: (v) => v.n,
          },
          {
            title: "Atividade X",
            render: (v) => v.x,
          },
          {
            title: "Atividade y",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
          {
            title: "Atividade z",
            render: (v) => v.x,
          },
        ]}
        dataSource={[
          {
            n: "Mateus Holzschuh",
            x: "XXXXXXXXXXXXXXX",
          },
          {
            n: "P Holzschuh",
            x: "YYYYYYYYYYYYYYY",
          },
        ]}
      />
    </AdminLayout>
  )
}

export default ActivityOverview
