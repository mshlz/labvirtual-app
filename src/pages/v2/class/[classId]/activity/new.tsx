import { message, Spin } from "antd"
import router from "next/router"
import { useEffect } from "react"
import { ActivityEditForm } from "../../../../../components/pages/Class/Activities/ActivityEditForm"
import { AdminLayout } from "../../../../../layouts/AdminLayout"

const NewActivity = () => {
    const classId = router.query.classId as string
    useEffect(() => {
        message.info({icon: <Spin size="small" style={{marginRight: '8px'}}/>, content:"Salvando atividade..."})
    },[])


    return <AdminLayout>
        <ActivityEditForm classId={classId} />
    </AdminLayout>
}

export default NewActivity