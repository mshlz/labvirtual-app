import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { LoadingComponent } from "../../../../components/Loading/Loading"
import { Button } from "../../../../components/UI/Button"
import { AdminLayout } from "../../../../layouts/AdminLayout"
import { LessonService } from "../../../../services/LessonService"
import { parseHtml } from "../../../../utils/parseHtml"
interface ILesson {
  name?: string
  content?: string
}

const PreviewLessonPage = () => {
  const [resource, setResource] = useState<ILesson>(null)
  const router = useRouter()

  useEffect(() => {
    loadResource()
  }, [router])

  const loadResource = async () => {
    const id = router.query.id as string
    if (!id) return
    const resource = await LessonService.get(id)
    setResource(resource)

    if (!resource || !resource._id) {
      toast("Conteúdo não encontrado!", { type: "error" })
      return setTimeout(() => router.push("/manager/lessons"), 4000)
    }
  }

  return (
    <AdminLayout>
      {resource ? (
        <>
          <div className="row m-b-20">
            <div className="col-md-12">
              <div className="title-wrap">
                <h2 className="title-5 text-center">
                  {/* <i className="fa fa-edit mr-2"></i> Editar conteúdo */}
                  <span className="badge badge-light mr-2">
                    <small>PRÉVIA</small>
                  </span>
                  {resource.name ?? "Sem título"}
                </h2>
                <Button color="light" onClick={() => window.close()}>
                  <i className="fa fa-times mr-2"></i>Fechar
                </Button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card m-b-70">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col">
                      <h1>{resource.name}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {parseHtml(resource?.content ?? "")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="row d-none">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Informações</h4>
                </div>
                <div className="card-body">
                  <div className="submenu-jogo">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className="nav-item nav-link active"
                          id="submenu-jogo-materialdeapoio-tab"
                          data-toggle="tab"
                          href="#submenu-jogo-materialdeapoio"
                          role="tab"
                          aria-controls="custom-nav-profile"
                          aria-selected="false"
                        >
                          Material de Apoio
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="submenu-jogo-instrucoes-tab"
                          data-toggle="tab"
                          href="#submenu-jogo-instrucoes"
                          role="tab"
                          aria-controls="custom-nav-home"
                          aria-selected="true"
                        >
                          Instruções
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="submenu-jogo-instrucoeslibras-tab"
                          data-toggle="tab"
                          href="#submenu-jogo-instrucoeslibras"
                          role="tab"
                          aria-controls="custom-nav-profile"
                          aria-selected="false"
                        >
                          Instruções em Libras
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="#submenu-jogo-historico-tab"
                          data-toggle="tab"
                          href="#submenu-jogo-historico"
                          role="tab"
                          aria-controls="custom-nav-contact"
                          aria-selected="false"
                        >
                          Histórico de Pontuações
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content pl-3 pt-2" id="nav-tabContent">
                      <div
                        className="tab-pane fade "
                        id="submenu-jogo-instrucoes"
                        role="tabpanel"
                        aria-labelledby="submenu-jogo-instrucoes-tab"
                      >
                        <p>Instruções</p>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="submenu-jogo-instrucoeslibras"
                        role="tabpanel"
                        aria-labelledby="submenu-jogo-instrucoeslibras-tab"
                      >
                        <p>Video de libras</p>
                      </div>
                      <div
                        className="tab-pane fade show active materialdeapoio"
                        id="submenu-jogo-materialdeapoio"
                        role="tabpanel"
                        aria-labelledby="submenu-jogo-materialdeapoio-tab"
                      >
                        <h4>Algumas Informações</h4>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="submenu-jogo-historico"
                        role="tabpanel"
                        aria-labelledby="#submenu-jogo-historico-tab"
                      >
                        <p>Histórico pontuacoes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </AdminLayout>
  )
}

export default PreviewLessonPage
