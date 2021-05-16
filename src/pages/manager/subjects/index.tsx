import Link from "next/link"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { SubjectService } from "../../../services/SubjectService"

const SubjectListPage = () => {
    const [subjects, setSubjects] = useState(null)

    useEffect(() => {
        loadSubjects()
    }, [])

    const loadSubjects = async () => {
        const subjects = await SubjectService.list()
        setSubjects(subjects)
    }

    return <AppLeftNavigation>
        {subjects ? <>
            <div className="row">
                <div className="col-md-12">
                    {/* <!-- DATA TABLE --> */}

                    <div className="table-data__tool">
                        <div className="table-data__tool-left">
                            <h3 className="title-5 m-b-35" style={{ textTransform: 'inherit' }}>Assuntos</h3>
                        </div>
                        <div className="table-data__tool-right">
                            <Link href="/manager/subjects/create"><button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                Novo Assunto</button></Link>

                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        {(!subjects || subjects.length == 0) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <i className="fa fa-exclamation-triangle fa-2x mb-2"></i><span>Sem dados!</span>
                        </div>}

                        {subjects.length > 0 && <table className="table table-data2">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Disciplina</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map(e =>
                                    <tr key={e.id} className="tr-shadow">
                                        <td>{e.id?.slice(-5)}</td>
                                        <td>{e.name}</td>
                                        <td>{e.discipline?.name}</td>
                                        <td>
                                            <span className="badge badge-success">ATIVO</span>
                                        </td>
                                        <td>
                                            <div className="table-data-feature">
                                                <Link href={`/manager/subjects/${e.id}/update`}>
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

export default SubjectListPage