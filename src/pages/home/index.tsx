import { useEffect } from "react"
import { AdminLayout } from "../../layouts/AdminLayout"
import { UserService } from "../../services/UserService"

const HomePage = () => {

    useEffect(() => {
        (async () => {
            const u = await UserService.getProfile()
        })()
    }, [])

    return <AdminLayout>
        <div className="row">
            <div className="col-md-12">
                {/* <!-- DATA TABLE --> */}
                <h3 className="title-5 m-b-35">Controle de Turmas</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left">
                        <form>
                            <div className="rs-select2--light rs-select2--md">
                                <select className="js-select2" name="property">
                                    <option selected={true}>Todos Cursos</option>
                                    {/* <!-- deve conter todos os cursos que possuem alguma turma --> */}
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                            <div className="rs-select2--light rs-select2--sm">
                                <select className="js-select2" name="property">
                                    <option selected={true}>Status</option>
                                    <option value="">Ativo</option>
                                    <option value="">Desativo</option>
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>

                            <button type="submit" className="au-btn-filter">
                                <i className="zmdi zmdi-filter-list"></i>Filtrar</button>
                        </form>
                    </div>


                    <div className="table-data__tool-right">

                        <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                            <i className="zmdi zmdi-plus"></i>CADASTRAR TURMA</button>

                    </div>
                </div>
                <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Ano</th>
                                <th>Semestre</th>
                                <th>Cód. Turma</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tr-shadow">

                                <td>Técnico em Informática</td>
                                <td>2016/1</td>
                                <td>
                                    <span className="block-email">2 Semestre</span>
                                </td>
                                <td className="desc">2020032</td>
                                <td style={{ color: 'green' }}>ATIVO</td>

                                <td>
                                    <div className="table-data-feature">
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                            <i className="zmdi zmdi-delete"></i>
                                        </button>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Detalhes">
                                            <i className="zmdi zmdi-more"></i>
                                        </button>

                                    </div>
                                </td>
                            </tr>

                            <tr className="tr-shadow">

                                <td>Técnico em Informática</td>
                                <td>2016/1</td>
                                <td>
                                    <span className="block-email">2 Semestre</span>
                                </td>
                                <td className="desc">2020032</td>
                                <td style={{ color: 'green' }}>ATIVO</td>

                                <td>
                                    <div className="table-data-feature">
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                            <i className="zmdi zmdi-delete"></i>
                                        </button>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Detalhes">
                                            <i className="zmdi zmdi-more"></i>

                                        </button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
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
    </AdminLayout>
}

export default HomePage