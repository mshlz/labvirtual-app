import React from "react"
import { QuestionEditForm } from '../../../components/pages/Manager/Question/QuestionEditForm'
import { AdminLayout } from "../../../layouts/AdminLayout"

const CreateQuestionPage = () => {
    return <AdminLayout>
        <QuestionEditForm />
    </AdminLayout >
}

export default CreateQuestionPage