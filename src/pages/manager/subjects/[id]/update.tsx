import { useRouter } from "next/router"
import { SubjectEditForm } from "../../../../components/pages/Manager/Subject/SubjectEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateSubjectPage = () => {
  const router = useRouter()
  const subjectId = router.query.id as string

  return (
    <AdminLayout>
      {subjectId && <SubjectEditForm subjectId={subjectId} />}
    </AdminLayout>
  )
}

export default UpdateSubjectPage
