import Link from "next/link"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { LessonService } from "../../../services/LessonService"

const LessonListPage = () => {
    const [lessons, setLessons] = useState(null)

    useEffect(() => {
        loadLessons()
    }, [])

    const loadLessons = async () => {
        const lessons = await LessonService.list()
        setLessons(lessons)
    }

    return <AppLeftNavigation>
        {lessons ? <>
            <div className="row">
                <div className="col-md-12">
                    {/* <!-- DATA TABLE --> */}

                    <div className="table-data__tool">
                        <div className="table-data__tool-left">
                            <h3 className="title-5 m-b-35" style={{ textTransform: 'inherit' }}>Conteúdos Teórico</h3>
                        </div>
                        <div className="table-data__tool-right">
                            <Link href="/manager/lessons/create"><button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                Novo Conteúdo</button></Link>

                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        {(!lessons || lessons.length == 0) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <i className="fa fa-exclamation-triangle fa-2x mb-2"></i><span>Sem dados!</span>
                        </div>}

                        {lessons.length > 0 && <table className="table table-data2">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Assunto</th>
                                    <th>Disciplina</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.map(e =>
                                    <tr key={e.id} className="tr-shadow">
                                        <td>{e.id?.slice(-5)}</td>
                                        <td>{e.name}</td>
                                        <td>{e.subject?.name}</td>
                                        <td>{e.discipline?.name}</td>
                                        <td>
                                            <span className="badge badge-success">ATIVO</span>
                                        </td>
                                        <td>
                                            <div className="table-data-feature">
                                                <Link href={`/manager/lessons/${e.id}/update`}>
                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="Detalhes">
                                                        <i className="zmdi zmdi-edit"></i>
                                                    </button>
                                                </Link>

                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> : <LoadingComponent />}
    </AppLeftNavigation>
}

export default LessonListPage