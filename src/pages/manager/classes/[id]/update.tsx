import { useRouter } from "next/router"
import { ClassEditForm } from "../../../../components/pages/Manager/Class/ClassEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateClassPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  return <AdminLayout>{id && <ClassEditForm classId={id} />}</AdminLayout>
}

export default UpdateClassPage
