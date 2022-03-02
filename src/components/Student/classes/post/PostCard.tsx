import { Form } from "@unform/web"
import React, { useRef, useState } from "react"
import { useApp } from "../../../../context/AppContext"
import { Button } from "../../../UI/Button"
import { Input } from "../../../UI/Input"
import { CommentItem } from "./CommentItem"
import parseHtml from 'html-react-parser'
import { formatRelative, parseISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR/index.js"
import { CommentService } from "../../../../services/CommentService"
import { ValidateForm, Yup } from "../../../../plugins/validation/FormValidator"
import { toast } from "react-toastify"


export interface IPostItem {
    _id: string
    author: string
    avatar_url?: string
    created_at: string
    text: string
    comments?: any[]
    comments_enabled?: boolean
}

export const PostCard = (props: IPostItem) => {
    const { user } = useApp()
    const formRef = useRef(null)
    const [comments, setComments] = useState(props.comments)

    const handleSubmitComment = async (formData) => {
        const data = {
            ...formData,
            post_uuid: props._id
        }

        // validate
        const isValid = await ValidateForm(
            {
                text: Yup.string().trim().max(1000).required(),
                post_uuid: Yup.string().trim().uuid().required(),
            },
            data,
            formRef
        )

        if (isValid)
            await CommentService.create(data)
                .then(result => {
                    formRef.current.reset()

                    setComments([...comments, { ...result, author: { ...user } }])

                    toast('Comentário criado com sucesso')
                })
                .catch(err => {
                    console.error(err)

                })
    }

    return <div className="card border-0 shadow-small">
        <div className="card-body">
            {/* card header */}
            <div className="d-flex align-items-center">
                <div className="rounded-circle mr-3" style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                    <img src={props.avatar_url || '/assets/images/blank-profile.png'} alt={props.author} />
                </div>
                <div>
                    <h5 style={{ color: '#3c4043', fontWeight: 600 }}>{props.author}</h5>
                    <small><time >{formatRelative(parseISO(props.created_at), Date.now(), { locale: ptBR })}</time></small>
                </div>
            </div>

            {/* card content */}
            <div className="mt-2" style={{ fontSize: '.9rem' }}>
                {parseHtml(props.text)}

            </div>

            {/* comment area */}
            {props.comments?.length > 0 && <hr />}

            {/* <Button size="sm" color="light">Ver todos comentários</Button> */}
            {/* <CommentItem
                id='sadfadfs'
                author="João Vítor"
                created_at={new Date()}
                text="bom dia pessoial"
            /> */}
            {comments?.map(comment =>
                <CommentItem
                    id={comment._id}
                    author={comment.author.name}
                    created_at={comment.createdAt}
                    text={comment.text}
                />
            )}

        </div>
        {/* comment form */}
        {props.comments_enabled && user &&
            <div className="card-footer bg-white d-flex align-items-center p-3">
                <div className="rounded-circle mr-3" style={{ width: '32px', height: '32px', overflow: 'hidden' }}>
                    <img src={user['avatar_url'] || '/assets/images/blank-profile.png'} alt={user.name} />
                </div>
                <Form onSubmit={handleSubmitComment} ref={formRef} className="d-flex align-items-center" style={{ flex: 1 }}>
                    <Input name="text" inline="mb-0 w-100" cssClasses="rounded-pill d-inline" placeholder="Digite seu comentário..." />
                    <Button color="light" cssClasses="rounded-pill border-0" title="Postar" style={{ position: 'absolute', right: '20px', backgroundColor: 'transparent' }}><i className="fa fa-send text-muted"></i></Button>
                </Form>
            </div>
        }
    </div>

}