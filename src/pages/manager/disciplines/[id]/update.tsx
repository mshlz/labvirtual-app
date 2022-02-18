import { useRouter } from "next/router"
import { DisciplineEditForm } from "../../../../components/pages/Manager/Discipline/DisciplineEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateDisciplinePage = () => {
    const router = useRouter()
    const disciplineId = router.query.id as string

    return <AdminLayout>
        {disciplineId && <DisciplineEditForm disciplineId={disciplineId} />}
    </AdminLayout>
}

export default UpdateDisciplinePage