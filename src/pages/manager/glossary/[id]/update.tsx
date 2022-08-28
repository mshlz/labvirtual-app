import { useRouter } from "next/router"
import { GlossaryEditForm } from "../../../../components/pages/Manager/Glossary/GlossaryEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateGlossaryPage = () => {
  const router = useRouter()
  const glossaryItemId = router.query.id as string

  return (
    <AdminLayout>
      {glossaryItemId && <GlossaryEditForm glossaryItemId={glossaryItemId} />}
    </AdminLayout>
  )
}

export default UpdateGlossaryPage
