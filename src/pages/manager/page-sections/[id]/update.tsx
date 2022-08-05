import { useRouter } from "next/router"
import { PageSectionEditForm } from "../../../../components/pages/Manager/PageSection/PageSectionEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdatePageSectionPage = () => {
  const router = useRouter()
  const sectionId = router.query.id as string

  return (
    <AdminLayout>
      {sectionId && <PageSectionEditForm pageSectionId={sectionId} />}
    </AdminLayout>
  )
}

export default UpdatePageSectionPage
