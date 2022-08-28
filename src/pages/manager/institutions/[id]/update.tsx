import { useRouter } from "next/router"
import { InstitutionEditForm } from "../../../../components/pages/Manager/Institution/InstitutionEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateInstitutionPage = () => {
  const router = useRouter()
  const institutionId = router.query.id as string

  return (
    <AdminLayout>
      <InstitutionEditForm institutionId={institutionId} />
    </AdminLayout>
  )
}

export default UpdateInstitutionPage
