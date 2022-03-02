import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "antd"
import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { CustomTable } from "../../../components/UI/CustomTable"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { QuestionService } from "../../../services/QuestionService"

const QuestionListPage = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total_count, setTotal] = useState(0)

    useEffect(() => {
        setLoading(true)
        loadResources()
    }, [page])

    const loadResources = async () => {
        const result = await QuestionService.list(page)
        setData(result.data)
        setTotal(result.meta.total)
        setLoading(false)
    }

    return <AdminLayout>
        {data ? <>
            <CustomTable
                title="Questões"
                createButton={{ action: () => router.push("/manager/questions/create") }}
                columns={[
                    { key: '_id', label: 'ID' },
                    { key: 'name', label: 'Nome' },
                    { key: 'discipline.name', label: 'Disciplina' },
                    { key: 'subject.name', label: 'Assunto' },
                ]}
                meta={{
                    page: page,
                    per_page: 10,
                    total_count: total_count
                }}
                onPageChange={setPage}
                data={data}
                isLoading={isLoading}
                actions={row =>
                    <>
                        <Link href={`/manager/questions/${row._id}/update`}>
                            <Button icon={<FontAwesomeIcon icon={faPencilAlt} />} />

                        </Link>
                    </>
                }
            />
        </> : <LoadingComponent />}
    </AdminLayout>
}

export default QuestionListPage