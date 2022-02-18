import { Col, Row, Tooltip } from "antd"
import { formatRelative } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { PostService } from "../../../../services/PostService"
import { LoadingWrapper } from "../../../Loading/Loading"
import MuralNewPost from "../Mural/MuralNewPost"
import MuralPost from "../Mural/MuralPost"

interface MuralTabProps {
    classId: string
}

export const MuralTab = (props: MuralTabProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        loadPosts()
    }, [props.classId])

    const loadPosts = async () => {
        const result = await PostService.getFromClass(props.classId)
        setPosts(result.data)
        setIsLoading(false)
    }

    return <LoadingWrapper isLoading={isLoading} fullWidth={true}>
        <Col sm={24} xl={18}>
            <Row gutter={[0, 16]}>
                {/* MuralNewPostForm */}
                <Col span={24}>
                    <MuralNewPost classId={props.classId} addNewPost={data => setPosts([data, ...posts])} />
                </Col>

                {posts?.map(post =>
                    <Col span={24} key={post._id}>
                        <MuralPost
                            _id={post._id}
                            title={post.author.name}
                            content={post.text}
                            date={post.createdAt}
                            avatar_url={'/assets/images/blank-profile.png'}
                            comments={post.comments?.map(comment => ({
                                // actions: [<span key="comment-list-reply-to-0">remove</span>],
                                id: comment._id,
                                author: {
                                    name: comment.author.name,
                                    id: comment.author._id,
                                    avatar: '/assets/images/blank-profile.png'
                                },
                                content: (
                                    comment.text
                                ),
                                datetime: (
                                    <Tooltip title={<p>{(new Date(comment.createdAt)).toISOString()}</p>}>
                                        <span>{formatRelative(new Date(comment.createdAt), new Date(), { locale: ptBR })}</span>
                                    </Tooltip>
                                ),
                            }))}
                            comments_enabled
                        />
                    </Col>
                )}


                {/* SimpleMuralPost */}
                {/* <Col span={24}>
        <SimpleMuralPost
            title={'Mateus publicou uma nova tarefa'}
            // content={'Este é um texto de exemplo asdf'}
            // comments_count={1}
            date={new Date()}
        />
    </Col> */}

                {/* MuralPost */}
                <Col span={24}>
                    {/* <MuralPost
                        id={'---'}
                            title={'Mateus publicou uma nova tarefa'}
                            content={'Este é um texto de exemplo asdf'}
                            date={new Date()}
                            comments={data}
                            comments_enabled
                        /> */}
                </Col>
            </Row>
        </Col>
    </LoadingWrapper>
}