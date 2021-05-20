import Link from "next/link"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../../components/Loading/Loading"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"
import { GlossaryService } from "../../../services/GlossaryService"

const GlossaryListPage = () => {
    const [entries, setEntries] = useState(null)

    useEffect(() => {
        loadEntries()
    }, [])

    const loadEntries = async () => {
        const _entries = await GlossaryService.list()
        setEntries(_entries)
    }

    return <AppLeftNavigation>
        {entries ? <>
            <div className="row">
                <div className="col-md-12">
                    {/* <!-- DATA TABLE --> */}

                    <div className="table-data__tool">
                        <div className="table-data__tool-left">
                            <h3 className="title-5 m-b-35" style={{ textTransform: 'inherit' }}>Glossário</h3>
                        </div>
                        <div className="table-data__tool-right">
                            <Link href="/manager/glossary/create"><button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                Novo Item</button></Link>

                        </div>
                    </div>
                    <div className="table-responsive table-responsive-data2">
                        {(!entries || entries.length == 0) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <i className="fa fa-exclamation-triangle fa-2x mb-2"></i><span>Sem dados!</span>
                        </div>}

                        {entries.length > 0 && <table className="table table-data2">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Termo</th>
                                    <th>Assunto</th>
                                    <th>Disciplina</th>
                                    {/* <th>Status</th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map(e =>
                                    <tr key={e.id} className="tr-shadow">
                                        <td>{e.id?.slice(-5)}</td>
                                        <td>{e.name}</td>
                                        <td>{e.subject?.name}</td>
                                        <td>{e.discipline?.name}</td>
                                        {/* <td>
                                            <span className="badge badge-success">ATIVO</span>
                                        </td> */}
                                        <td>
                                            <div className="table-data-feature">
                                                <Link href={`/manager/glossary/${e.id}/update`}>
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

export default GlossaryListPage