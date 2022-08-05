import { useEffect } from "react"
import { ClassCard } from "../../components/Student/home/ClassCard"
import { AdminLayout } from "../../layouts/AdminLayout"
import { UserService } from "../../services/UserService"

const MyClasses = () => {
  useEffect(() => {
    ;(async () => {
      const u = await UserService.getProfile()
    })()
  }, [])

  return (
    <AdminLayout>
      <div className="row">
        <ClassCard id="uuid" name="Disciplina teste" teacher="Professor" />
      </div>
    </AdminLayout>
  )
}

export default MyClasses
