import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "antd"
import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { CustomTable } from "../../../components/UI/CustomTable"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { PageService } from "../../../services/PageService"

const PageListPage = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total_count, setTotal] = useState(0)

    useEffect(() => {
        setLoading(true)
        loadResources()
    }, [page])

    const loadResources = async () => {
        const result = await PageService.list(page)
        setData(result.data)
        setTotal(result.meta.total)
        setLoading(false)
    }

    return <AdminLayout>
        {data ? <>
            <CustomTable
                title="Páginas"
                createButton={{ action: () => router.push("/manager/pages/create") }}
                columns={[
                    { key: '_id', label: 'ID' },
                    { key: 'name', label: 'Nome' },
                    { key: 'section.name', label: 'Seção' },
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
                        <Link href={`/manager/pages/${row._id}/update`}>
                            <Button icon={<FontAwesomeIcon icon={faPencilAlt} />} />

                        </Link>
                    </>
                }
            />
        </> : <LoadingComponent />}
    </AdminLayout>
}

export default PageListPage