import { FileAddOutlined } from "@ant-design/icons"
import { Button, PageHeader, Space, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import React, { PropsWithChildren, ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"

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
    columns: ColumnsType<any> | Column[]
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

export const CustomTable = ({ title, columns, data, meta, actions, createButton, isLoading, onSearch, onPageChange }: CustomTableProps) => {
    const [pages, setPages] = useState([])
    const [hasPrevious, setHasPrevious] = useState(true)
    const [hasNext, setHasNext] = useState(true)

    const changePage = (newPage) => {
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

    // const handleSearch = (data) => {
    //     toast("em breve", { type: 'dark' })
    //     console.log(data)
    //     typeof onSearch == 'function' && onSearch(data.search)
    // }

    // 🚬 this should be refactored
    const getValue = (data, key: string) => {
        const [base, mapKey] = key.split('*.')
        const path = !base ? [] : base.split('.')
        let _data = Array.isArray(data) ? data : Object.assign({}, data)
        path.forEach(k => _data = _data && _data[k])
        if (_data && mapKey && Array.isArray(_data)) {
            _data = _data.map(v => getValue(v, mapKey)).join(', ')
        }

        return _data || ''
    }

    const getColumns = () => {
        let finalColumns = []
        columns.forEach(c => {
            const columnEntry = {
                key: c.key,
                dataIndex: c.key,
                title: c.label ? c.label : undefined,
                render: undefined
            }

            const parts = c.key.split('.')
            if (parts.length > 1) {
                columnEntry.dataIndex = parts.shift()
                columnEntry.render = v => getValue(v, parts.join('.'))
            }

            finalColumns.push(columnEntry)
        })

        if (typeof actions === 'function') {
            finalColumns.push({
                title: 'Ações',
                key: 'actions',
                render: (text, record) => (
                    <Space size="middle">
                        {actions(record)}
                    </Space>
                ),
            })
        }

        return finalColumns as ColumnsType<any>
    }

    return <PageHeader
        // className="site-page-header"
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        // subTitle="This is a subtitle"
        extra={[
            <Button key="1" type="primary" icon={<FileAddOutlined />} onClick={createButton.action}>
                {createButton.title ?? 'Criar novo'}
            </Button>
        ]}

    >

        <Table
            columns={getColumns()}

            dataSource={data}
            // loading={true}
            pagination={{
                current: meta.page,
                pageSize: meta.per_page,
                total: meta.total_count,
                onChange: changePage
            }}
        />
    </PageHeader>
}
