import { AppLeftNavigation } from "../../../layouts/AppLeftNavigation"

const ClassRegisterPage = () => {
    return <AppLeftNavigation>
        <div className="row">
            <div className="col-md-12">
                {/* <!-- DATA TABLE --> */}
                <h3 className="title-5 m-b-35" style={{ textTransform: 'inherit' }}>Cadastrar nova turma</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left">
                        <form action="#">
                            <div className="rs-select2--light rs-select2--md">
                                <select className="js-select2" name="property">
                                    <option>Todos Cursos</option>
                                    {/* <!-- deve conter todos os cursos que possuem alguma turma --> */}
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                            <div className="rs-select2--light rs-select2--sm">
                                <select className="js-select2" name="property">
                                    <option>Status</option>
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

export default ClassRegisterPage