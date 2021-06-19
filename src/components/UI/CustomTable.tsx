import { Form } from "@unform/web"
import React, { PropsWithChildren, ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button } from './Button'
import { Input } from './Input'

type Column = {
    key: string
    label: string
    sortable?: boolean
}

type Entry = {
    [key: string]: string | ReactNode
}

type Metadata = {
    page: number
    per_page: number
    total_count: number
}

type CustomTableProps = PropsWithChildren<{
    title: string
    columns: Column[]
    data: Entry[]
    meta: Metadata
    createButton?: {
        title?: string
        action: () => void
    }
    isLoading?: boolean
    actions?: (row) => ReactNode
    onSearch?: (query: string) => Promise<Entry[]>
    onPageChange?: (newPage: number) => void
}>

export const CustomTable = ({ title, columns, data, meta, createButton, isLoading, actions, onSearch, onPageChange }: CustomTableProps) => {

    const [pages, setPages] = useState([])
    const [hasPrevious, setHasPrevious] = useState(true)
    const [hasNext, setHasNext] = useState(true)

    const changePage = (event, newPage) => {
        event.preventDefault()
        typeof onPageChange == 'function' && onPageChange(newPage)
    }

    useEffect(() => {
        const current = meta.page
        const total_pages = Math.ceil(meta.total_count / meta.per_page)
        const _pages = []


        if (current == 1) {
            setHasPrevious(false)
        }
        else if (!hasPrevious) {
            setHasPrevious(true)
        }

        // last page
        if (current == total_pages) {
            setHasNext(false)
        }
        else if (!hasNext) {
            setHasNext(true)
        }

        // pagination
        if (current == 1) {
            _pages.push(current)
            if (current + 1 <= total_pages) _pages.push(current + 1)
            if (current + 2 <= total_pages) _pages.push(current + 2)
        }
        else if (current == total_pages) {
            if (current - 2 >= 1) _pages.push(current - 2)
            _pages.push(current - 1)
            _pages.push(current)
        }
        else {
            _pages.push(current - 1)
            _pages.push(current)
            if (current + 1 <= total_pages) _pages.push(current + 1)
        }

        setPages(_pages)

        window && (window.scrollTo(0, 0))

    }, [meta])

    useEffect(() => {
        console.log('updateData')
    }, [])

    const handleSearch = (data) => {
        toast("em breve", { type: 'dark' })
        console.log(data)
        typeof onSearch == 'function' && onSearch(data.search)
    }

    return <>
        <div className="card border-0 shadow m-b-10">
            <div className="card-header p-4 align-items-center">
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <h3>{title}</h3>
                    </div>
                    <div>
                        {/* <Button color="light" size='sm' cssClasses="mr-2 border shadow-sm"><i className="fa fa-refresh"></i></Button> */}
                        {createButton &&
                            <Button color="success" size='sm' onClick={createButton.action}><i className="zmdi zmdi-plus"></i> {createButton.title || 'CRIAR NOVO'}</Button>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <Form onSubmit={handleSearch}>
                            <div className="d-flex align-items-center">
                                <Input name="search" inline placeholder="Buscar" size='sm' style={{ width: '350px' }} />
                                <Button color='light' size='sm' cssClasses="border shadow-sm"><i className="fa fa-search"></i> Buscar</Button>
                            </div>
                        </Form>
                    </div>
                    <div></div>
                </div>
            </div>

            <div className="table-responsive" style={{ minHeight: '300px', position: 'relative' }}>
                <table className="table table-data2">
                    <thead className="border-bottom" style={{ backgroundColor: '#eee' }}>
                        <tr>
                            {columns.map((column, idx) =>
                                <th key={`${column.key}-${idx}`}>{column.label}</th>
                            )}
                            {typeof actions == 'function' ? <th></th> : ''}
                        </tr>
                    </thead>
                    <tbody className="position-relative">
                        {/* <div style={{
                            transition: 'all .3 ease', 
                            backgroundColor: '#999999FF',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            color: '#FFFFFF',
                            justifyContent: 'center',
                            // paddingTop: '100px',
                            alignItems: 'center',
                            position: 'absolute',
                            zIndex: 1000,
                            userSelect: 'none',
                            textShadow: '0 0 10px #000'
                        }}
                        >
                            <i className="fa fa-refresh fa-spin fa-2x"></i>
                            Carregando
                        </div> */}

                        {data?.map((e, idx) => (<>
                            <tr key={`row-${idx}`} className="tr-shadow border-bottom">
                                {columns.map((column, i) => {
                                    return <td key={`${column.key}-${idx}-${i}`}>{e[column.key] || 'anything'}</td>
                                })}
                                {typeof actions == 'function'
                                    ? <td>
                                        <div className="table-data-feature">
                                            {actions(e)}
                                        </div>
                                    </td>
                                    : ''}
                            </tr>

                            {/* <tr className="spacer"></tr> */}
                        </>))}
                    </tbody>
                </table>
                {!data || !data.length &&
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '25px' }}>
                        <i className="fa fa-exclamation-triangle fa-2x mb-2"></i><span>Sem dados!</span>
                    </div>
                }
                {isLoading &&
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '25px',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        right: '0',
                        userSelect: 'none',
                        backgroundColor: '#00000096',
                        color: '#BEBEBE'
                    }}>
                        <i className="fa fa-refresh fa-2x fa-spin mb-2"></i><span>Carregando</span>
                    </div>
                }
            </div>

            <div className="card-footer d-flex justify-content-between align-items-center">
                <p className="font-size-13">Mostrando <strong>{(meta.total_count != 0 ? (meta.page - 1) * meta.per_page + 1 : 0) + ' - ' + ((meta.page - 1) * meta.per_page + data?.length) || 0}</strong> de <strong>{meta?.total_count}</strong> resultados.</p>
                <div>
                    <ul className="pagination pagination-sm">
                        <li className={`page-item ${!hasPrevious ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" aria-label="Anterior" onClick={e => changePage(e, meta.page - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Anterior</span>
                            </a>
                        </li>
                        {pages.map(e =>
                            <li key={'pagination-page-' + e} className={`page-item ${e == meta.page ? 'active' : ''}`}><a className="page-link" href="#" onClick={ev => changePage(ev, e)}>{e}</a></li>
                        )}
                        <li className={`page-item ${!hasNext ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" aria-label="Próximo" onClick={e => changePage(e, meta.page + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Próximo</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}
