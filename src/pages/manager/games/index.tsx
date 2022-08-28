import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Popconfirm } from "antd"
import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { CustomTable } from "../../../components/UI/CustomTable"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { GameService } from "../../../services/GameService"

const GameListPage = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total_count, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    loadResources()
    console.log("changed ", page)
  }, [page])

  const loadResources = async () => {
    const result = await GameService.list(page)
    setData(result.data)
    setTotal(result.meta.total)
    setLoading(false)
  }

  return (
    <AdminLayout>
      {data ? (
        <>
          <CustomTable
            title="Jogos"
            createButton={{
              action: () => router.push("/manager/games/create"),
            }}
            columns={[
              { key: "_id", label: "ID" },
              { key: "name", label: "Nome" },
              { key: "disciplines.*.name", label: "Disciplina" },
              { key: "subjects.*.name", label: "Assunto" },
            ]}
            meta={{
              page: page,
              per_page: 10,
              total_count: total_count,
            }}
            onPageChange={setPage}
            data={data}
            isLoading={isLoading}
            actions={(row) => (
              <>
                <Link href={`/manager/games/${row._id}/update`}>
                  <Button icon={<FontAwesomeIcon icon={faPencilAlt} />} />
                </Link>
                <Popconfirm
                  title="Você deseja deletar? Essa ação é irreversivel!"
                  onConfirm={() =>
                    GameService.delete(row._id).then(loadResources)
                  }
                >
                  <Button icon={<FontAwesomeIcon icon={faTimes} />} />
                </Popconfirm>
              </>
            )}
          />
        </>
      ) : (
        <LoadingComponent />
      )}
    </AdminLayout>
  )
}

export default GameListPage
