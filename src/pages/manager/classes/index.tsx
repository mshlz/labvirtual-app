import Link from "next/link"
import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"

const ClassManagerPage = () => {
    return <AppLeftNavigation>
        <div className="row">
            <div className="col-md-12">
                {/* <!-- DATA TABLE --> */}
                <h3 className="title-5 m-b-35" style={{ textTransform: 'inherit' }}>Controle de Turmas</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left">
                        <form>
                            <div className="rs-select2--light rs-select2--md">
                                <select className="js-select2" name="propertya">
                                    <option >Todos Cursos</option>
                                    {/* <!-- deve conter todos os cursos que possuem alguma turma --> */}
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                            <div className="rs-select2--light rs-select2--sm">
                                <select className="js-select2" name="propertyb">
                                    <option >Status</option>
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

                        <Link href="/manager/classes/create"><button className="au-btn au-btn-icon au-btn--green au-btn--small">
                            <i className="zmdi zmdi-plus"></i>CADASTRAR TURMA</button></Link>

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
    </AppLeftNavigation>
}

export default ClassManagerPage