import { useRouter } from "next/router"
import { HelpSectionEditForm } from "../../../../components/pages/Manager/HelpSection/HelpSectionEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdatePageSectionPage = () => {
  const router = useRouter()
  const sectionId = router.query.id as string

  return (
    <AdminLayout>
      {sectionId && <HelpSectionEditForm pageSectionId={sectionId} />}
    </AdminLayout>
  )
}

export default UpdatePageSectionPage
