import { useRouter } from "next/router"
import { HelpPageEditForm } from "../../../../components/pages/Manager/HelpPage/HelpPageEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdatePagePage = () => {
  const router = useRouter()
  const id = router.query.id as string

  return <AdminLayout>{id && <HelpPageEditForm pageId={id} />}</AdminLayout>
}

export default UpdatePagePage
