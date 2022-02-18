import { Form } from "@unform/web"
import { useRef } from "react"
import { toast } from "react-toastify"
import { useApp } from "../../../../context/AppContext"
import { ValidateForm, Yup } from "../../../../plugins/validation/FormValidator"
import { PostService } from "../../../../services/PostService"
import { Button } from "../../../UI/Button"
import RichTextEditor from "../../../UI/RichTextEditor"

export interface IFormNewPostProps {
    class_uuid: string
    postsState: any[]
}

export const FormCreateNewPost = ({ postsState: [posts, setPosts], class_uuid }: IFormNewPostProps) => {
    const formRef = useRef(null)
    const { user } = useApp()

    const handleSubmitPost = async (formData) => {
        const data = {
            ...formData,
            class_uuid
        }

        // validate
        const isValid = await ValidateForm(
            {
                text: Yup.string().trim().matches(/<[^>]+>[^<]+/gm, "você precisa escrever alguma coisa").max(5000).required(),
                class_uuid: Yup.string().trim().uuid().required(),
            },
            data,
            formRef
        )

        if (isValid)
            await PostService.create(data)
                .then(result => {
                    formRef.current.reset()

                    setPosts([{ ...result, author: { ...user } }, ...posts])

                    toast('Post criado com sucesso')
                })
                .catch(err => {
                    console.error(err)

                })
    }

    return <div className="card border-0 shadow-sm">
        <div className="card-body rounded text-white">
            <h4 className="display-4 mb-3" style={{ fontSize: '1.5rem', fontWeight: 500 }}>Postar no mural da turma</h4>

            <Form onSubmit={handleSubmitPost} ref={formRef}>
                <RichTextEditor name="text" buttons={[['bold', 'underline', 'italic', 'list', 'removeFormat']]} />
                <Button color="primary" outline cssClasses="float-right">Postar</Button>
            </Form>
        </div>
    </div>
}