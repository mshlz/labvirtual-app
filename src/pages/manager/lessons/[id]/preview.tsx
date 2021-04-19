import parseHtml from 'html-react-parser'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { LoadingComponent } from "../../../../components/Loading/Loading"
import { Button } from "../../../../components/UI/Button"
import { AppLeftNavigation } from "../../../../layouts/AppLeftNavigation"
import { LessonService } from "../../../../services/LessonService"
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

        if (!resource || !resource.id) {
            toast('Conteúdo não encontrado!', { type: 'error' })
            return setTimeout(() => router.push('/manager/lessons'), 4000)
        }

    }

    return <AppLeftNavigation>
        {resource ? <>
            <div className="row m-b-20">
                <div className="col-md-12">
                    <div className="title-wrap">
                        <h2 className="title-5 text-center">
                            {/* <i className="fa fa-edit mr-2"></i> Editar conteúdo */}
                            <span className="badge badge-light mr-2"><small>PRÉVIA</small></span>{resource.name ?? 'Sem título'} - {resource.discipline ?? ''}
                        </h2>
                        <Button color="light" onClick={() => router.back()}><i className="fa fa-arrow-left mr-2"></i>Voltar</Button>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card m-b-70">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {parseHtml(resource?.content ?? '')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> </> : <LoadingComponent />}
    </AppLeftNavigation >
}

export default PreviewLessonPage