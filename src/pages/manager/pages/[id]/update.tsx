import { useRouter } from "next/router"
import { PageEditForm } from "../../../../components/pages/Manager/Page/PageEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdatePagePage = () => {
    const router = useRouter()
    const id = router.query.id as string

    return <AdminLayout>
        {id && <PageEditForm pageId={id} />}
    </AdminLayout>
}

export default UpdatePagePage