import { useForm } from "antd/lib/form/Form"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { QuestionEditForm } from "../../../../components/pages/Manager/Question/QuestionEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateQuestionPage = () => {
  const router = useRouter()
  const questionId = router.query.id as string

  return (
    <AdminLayout>
      {questionId && <QuestionEditForm questionId={questionId} />}
    </AdminLayout>
  )
}

export default UpdateQuestionPage
