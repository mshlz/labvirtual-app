import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Comment, Form, List, Popconfirm, Tooltip, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import TextArea from "antd/lib/input/TextArea"
import { formatRelative, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import parseHtml from 'html-react-parser'
import { ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useApp } from "../../../../context/AppContext"
import { CommentService } from "../../../../services/CommentService"


const Editor = ({ onFinish, isSubmitting }) => {
    const [form] = Form.useForm()

    const handleOnFinish = (data) => {
        form.resetFields()
        onFinish(data)
    }

    return <Form form={form} onFinish={handleOnFinish} >
        <Form.Item
            name="text"
            rules={[{ required: true, message: "Você precisa escrever alguma coisa" }]}
            extra={
                <Button
                    htmlType="submit"
                    loading={isSubmitting}
                    icon={<FontAwesomeIcon size={'sm'} icon={faPaperPlane} />}
                    style={{
                        float: "left",
                        marginTop: 10
                    }}
                >
                    <span style={{ paddingLeft: 10 }}>Adicionar comentário</span>
                </Button>
            }
            style={{
                marginBottom: 0
            }}
        >
            <TextArea rows={1} placeholder={'Inserir um comentário'} />
        </Form.Item>
    </Form>

}

interface ICommentItem {
    _id: string
    actions?: ReactNode[]
    author: {
        _id: string
        name: string
        avatar: string
    }
    content: ReactNode | string
    datetime: ReactNode | string
}


interface IMuralPost {
    _id: string
    title: string
    content?: string
    icon?: ReactNode | string
    avatar_url?: string
    date?: Date | string
    comments_enabled?: boolean
    comments?: ICommentItem[]
}

const MuralPost = (props: IMuralPost) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [comments, setComments] = useState<ICommentItem[]>(null)
    const { user } = useApp()

    useEffect(() => {
        setComments(props.comments || null)
    }, [])


    const handleCommentSubmit = async (data) => {
        if (!props._id) return

        setIsSubmitting(true)

        const formData = {
            ...data,
            postId: props._id
        }

        await CommentService.create(formData)
            .then(result => {
                // formRef.current.reset()

                setComments([...comments, {
                    author: {
                        _id: user._id,
                        name: user.name,
                        avatar: user.avatar_url || '/assets/images/blank-profile.png',
                    },
                    content: result.text,
                    datetime: <Tooltip title={<p>{(new Date(result.createdAt)).toISOString()}</p>}>
                        <span>{formatRelative(new Date(result.createdAt), new Date(), { locale: ptBR })}</span>
                    </Tooltip>,
                    _id: result._id,
                }])
                toast('Comentário criado com sucesso')
            })
            .catch(err => {
                console.error(err)

            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    const handleRemoveComment = async (id: string) => {
        await CommentService.delete(id)
            .then(result => {
                result && setComments(comments.filter(comment => comment._id != id))
            })
    }

    return <Card
        actions={props.comments_enabled && [
            <div style={{ padding: '0 24px' }}>
                <Comment
                    avatar={
                        <Avatar src={'/assets/images/blank-profile.png'} />
                    }
                    content={
                        <Editor
                            onFinish={handleCommentSubmit}
                            isSubmitting={isSubmitting}
                        />
                    }
                />
            </div>
        ]}
    >
        <Card.Meta
            className="meta-no-mb-title"
            avatar={
                <Avatar size={'large'} style={{ backgroundColor: 'blueviolet' }} icon={props.icon ?? <></>} src={props.avatar_url ?? <></>} />
            }
            title={
                <Typography.Text>{props.title}</Typography.Text>
            }
            description={
                props.date && formatRelative(typeof props.date === 'string' ? parseISO(props.date) : props.date, Date.now(), { locale: ptBR })
            }
        />

        {props.content && <Typography.Paragraph style={{ marginTop: 16 }}>
            <div className="post-content">
                {parseHtml(props.content)}
            </div>
        </Typography.Paragraph>}


        {comments?.length > 0 && <List
            header={`${comments.length} comentário${comments.length > 1 ? 's' : ''}`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
                <li key={item._id}>
                    <Comment
                        actions={user._id === item.author._id ? [<Popconfirm title="Você tem certeza？Essa ação é irreversível" okText="Sim" cancelText="Não" onConfirm={() => handleRemoveComment(item._id)}><Button size='small' type="text" style={{ fontSize: '12px' }}>Remover</Button></Popconfirm>] : []}
                        author={item.author.name}
                        avatar={item.author.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    />
                </li>
            )}
            style={{
                marginBottom: '-24px'
            }}
        />}
    </Card>
}



export default MuralPost