import Link from "next/link"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { DisciplineService } from "../../../services/DisciplineService"

const DisciplineListPage = () => {
    const [disciplines, setDisciplines] = useState(null)

    useEffect(() => {
        loadDisciplines()
    }, [])

    const loadDisciplines = async () => {
        const disciplines = await DisciplineService.list()
        setDisciplines(disciplines)
    }

    return <AppLeftNavigation>
        {disciplines ? <>
            <div className="row">
                <div className="col-md-12">
                    {/* <!-- DATA TABLE --> */}

                    <div className="table-data__tool">
                        <div className="table-data__tool-left">
                            <h3 className="title-5 m-b-35" style={{ textTransform: 'inherit' }}>Disciplinas</h3>
                        </div>
                        <div className="table-data__tool-right">
                            <Link href="/manager/disciplines/create"><button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                Nova Disciplina</button></Link>

                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        {(!disciplines || disciplines.length == 0) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <i className="fa fa-exclamation-triangle fa-2x mb-2"></i><span>Sem dados!</span>
                        </div>}

                        {disciplines.length > 0 && <table className="table table-data2">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Disciplina</th>
                                    <th>{'' /*Número de Professores*/}</th>
                                    <th>{'' /*Número de Alunos*/}</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {disciplines.map(e =>
                                    <tr key={e.id} className="tr-shadow">
                                        <td>{e.id?.slice(-5)}</td>
                                        <td>{e.name}</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>
                                            <span className="badge badge-success">ATIVO</span>
                                        </td>
                                        <td>
                                            <div className="table-data-feature">
                                                <Link href={`/manager/disciplines/${e.id}/update`}>
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

export default DisciplineListPage