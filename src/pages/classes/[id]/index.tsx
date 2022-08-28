import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormCreateNewPost } from "../../../components/Student/classes/post/FormCreateNewPost"
import { PostCard } from "../../../components/Student/classes/post/PostCard"
import { Button } from "../../../components/UI/Button"
import { AdminLayout } from "../../../layouts/AdminLayout"
import { ClassService } from "../../../services/ClassService"
import { PostService } from "../../../services/PostService"
import { hashToColor } from "../../../utils/hashToColor"

export default () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query
  const [resource, setResource] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!id) return
    loadResource(id)
    loadPosts(id)
  }, [id])

  const loadResource = async (id) => {
    const r = await ClassService.get(id)
    setResource(r)
  }

  const loadPosts = async (id) => {
    const r = await PostService.getFromClass(id)
    setPosts(r.data)
  }

  return (
    resource && (
      <AdminLayout>
        {/* banner */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-small">
              <div
                className="card-body rounded text-white"
                style={{
                  color: "#fff",
                  backgroundColor: hashToColor(`banco de dados`),
                  height: "150px",
                }}
              >
                <h2
                  className="display-4 text-white"
                  style={{ fontSize: "2rem" }}
                >
                  {resource.name}
                </h2>
                <p style={{ fontWeight: 300 }}>Descrição</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* feed column */}
          <div className="col-md-9 col-sm-12">
            {/* input card */}
            <FormCreateNewPost class_uuid={id} postsState={[posts, setPosts]} />

            {posts?.map((post) => (
              <PostCard
                key={post._id}
                _id={post._id}
                author={post.author.name}
                avatar_url={post.author.avatar_url}
                created_at={post.createdAt}
                text={post.text}
                comments_enabled={true}
                comments={post.comments}
              />
            ))}

            {/* <PostCard />
                <PostCard /> */}
          </div>

          {/* next activities card */}
          <div className="col-3">
            <div className="card shadow-sm">
              <div className="card-header">Próximas Atividades</div>
              <div className="card-body">
                <p style={{ fontWeight: 400 }}>Nenhuma atividade!</p>
              </div>
              <div className="d-flex justify-content-end mb-2 mr-2">
                <Button color="link" size="sm">
                  Ver atividades
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  )
}
