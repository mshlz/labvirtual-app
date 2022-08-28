import { useRouter } from "next/router"
import { VideoEditForm } from "../../../../components/pages/Manager/Video/VideoEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateVideoPage = () => {
  const router = useRouter()
  const videoId = router.query.id as string

  return (
    <AdminLayout>{videoId && <VideoEditForm videoId={videoId} />}</AdminLayout>
  )
}

export default UpdateVideoPage
