import router from "next/router"
import { ActivityEditForm } from "../../../../../components/pages/Class/Activities/ActivityEditForm"
import { AdminLayout } from "../../../../../layouts/AdminLayout"

const EditActivity = () => {
    const classId = router.query.classId as string
    const activityId = router.query.activityId as string

    return <AdminLayout>
        {activityId && <ActivityEditForm classId={classId} classworkId={activityId} />}
    </AdminLayout>
}

export default EditActivity