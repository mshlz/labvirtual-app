import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { CustomTable } from "../../../components/UI/CustomTable"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { InstitutionService } from "../../../services/InstitutionService"

const InstitutionListPage = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total_count, setTotal] = useState(0)

    useEffect(() => {
        setLoading(true)
        loadResources()
        console.log('changed ', page)
    }, [page])

    const loadResources = async () => {
        const result = await InstitutionService.list(page)
        setData(result.data)
        setTotal(result.meta.total)
        setLoading(false)
    }

    return <AppLeftNavigation>
        {data ? <>
            <CustomTable
                title="Instituições"
                createButton={{ action: () => router.push("/manager/institutions/create") }}
                columns={[
                    { key: 'id', label: 'ID' },
                    { key: 'name', label: 'Nome' },
                    { key: 'acronym', label: 'Sigla' },
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
                        <Link href={`/manager/institutions/${row.id}/update`}>
                            <button className="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                <i className="zmdi zmdi-edit"></i>
                            </button>
                        </Link>
                    </>
                }
            />
        </> : <LoadingComponent />}
    </AppLeftNavigation>
}

export default InstitutionListPage