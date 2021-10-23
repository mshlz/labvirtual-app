import { Button, Card, Col, Row, Tooltip, Typography } from "antd";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MuralNewPost from "../../../../components/pages/Class/Mural/MuralNewPost";
import MuralPost from "../../../../components/pages/Class/Mural/MuralPost";
import SimpleMuralPost from "../../../../components/pages/Class/Mural/SimpleMuralPost";
import { NavigationMenu } from "../../../../components/pages/Class/NavigationMenu";
import { AdminLayout } from "../../../../layouts/AdminLayout";
import { ClassService } from "../../../../services/ClassService";
import { PostService } from "../../../../services/PostService";



const ClassMural = () => {
    const router = useRouter()
    const query = router.query
    const { id } = query as { id: string }

    const [klass, setKlass] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        if (!id) return

        loadResource()
        loadPosts()
    }, [query])

    const loadResource = async () => {
        const result = await ClassService.get(id)
        console.log(result)
        setKlass(result)
    }

    const loadPosts = async () => {
        const result = await PostService.getFromClass(id)
        setPosts(result.data)
    }

    return <AdminLayout>
        <Col lg={20} >
            <Row gutter={[24, 24]} >
                <Col span={24}>
                    <Card
                        style={{
                            // backgroundColor: 'steelblue'
                            height: 150
                        }}
                    >
                        <Card.Meta
                            title={<Typography.Title level={2} style={{ marginBottom: 0 }}>Turma {klass?.name}</Typography.Title>}
                            description={klass?.section ? <Typography.Title level={4} type={'secondary'}>Seção {klass.section.name}</Typography.Title> : null}
                        />
                    </Card>
                </Col>

                <Col span={24}>
                    <NavigationMenu active="mural" classId={id}/>
                </Col>


                <Col span={18}>
                    <Row gutter={[0, 16]}>
                        {/* MuralNewPostForm */}
                        <Col span={24}>
                            <MuralNewPost classId={id} addNewPost={data => setPosts([data,...posts])} />
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
                        <Col span={24}>
                            <SimpleMuralPost
                                title={'Mateus publicou uma nova tarefa'}
                                // content={'Este é um texto de exemplo asdf'}
                                // comments_count={1}
                                date={new Date()}
                            />
                        </Col>

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

                <Col span={6}>
                    <Card
                        title="Atividades"
                        actions={[
                            <Button type="link">Ver atividades</Button>
                        ]}
                    >
                        Nenhuma atividade
                    </Card>
                </Col>



            </Row>
        </Col >
    </AdminLayout >
}

export default ClassMural