import { useRouter } from "next/router"
import { LessonEditForm } from "../../../../components/pages/Manager/Lesson/LessonEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateLessonPage = () => {
  const router = useRouter()
  const lessonId = router.query.id as string

  return (
    <AdminLayout>
      {lessonId && <LessonEditForm lessonId={lessonId} />}
    </AdminLayout>
  )
}

export default UpdateLessonPage
