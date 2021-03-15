import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../../components/UI/Button"
import { AppLeftNavigation } from "../../layouts/AppLeftNavigation"
import { UserService } from "../../services/UserService"

interface UserProfile {
    name: string
    email: string
    phone: string
    school: string
    course: string
}

const ProfilePage = () => {
    const [user, setUser] = useState(null as UserProfile)

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => setUser(await UserService.getProfile())

    return <AppLeftNavigation>
        {user ? <>
            <div className="row m-b-20">
                <div className="col-md-12">
                    <div className="title-wrap">
                        <h2 className="title-5 text-center">
                            <i className="fa fa-tasks"></i> Perfil de {user.name}
                        </h2>
                        <Link href="/profile/update"><Button color="success"><i className="fa fa-edit mr-2"></i>Editar Perfil</Button></Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mx-auto d-block text-center">
                                        <img className="rounded-circle img-fluid img-220 mx-auto d-block"
                                            src="/assets/images/blank-profile.png" alt="Foto do Aluno" />
                                        <h5 className="text-sm-center mt-2 mb-1">{user.name}</h5>
                                        {/* <div className="location text-sm-center">
                                            <i className="fa fa-map-marker"></i> semestre
                                        </div> */}
                                    </div>
                                    <hr />
                                    <div className="card-text text-sm-center">
                                        <a href="#">
                                            <i className="fa fa-facebook pr-1"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-twitter pr-1"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-linkedin pr-1"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-pinterest pr-1"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <form className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Nome:</label>
                                                <input type="text" className="form-control"
                                                    placeholder={user.name} readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Celular:</label>
                                                <input type="text" className="form-control"
                                                    placeholder={user.phone} readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input type="text" className="form-control"
                                                    placeholder={user.email} readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Escola:</label>
                                                <input type="text" className="form-control"
                                                    placeholder={user.school} readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Curso:</label>
                                                <input type="text" className="form-control"
                                                    placeholder={user.course} readOnly />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <strong className="card-title text-center">
                                <i className="fa fa-vial"></i> Aula Prática 1</strong>
                        </div>

                        <div className="card-body">
                            <div className="c100 p40 small left green">
                                <span>40%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <span className="">De acerto nas questões objetivas </span>
                            <button className="au-btn au-btn--small au-btn--block au-btn--green m-t-20 "
                                data-toggle="modal" data-target="#modal-aulapratica1">Ver
                                            Discursivas</button>

                        </div>

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <strong className="card-title text-center">
                                <i className="fa fa-vial"></i> Aula Prática 2</strong>
                        </div>

                        <div className="card-body">
                            <div className="c100 p23 small left green">
                                <span>40%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <span className="">De acerto nas questões objetivas </span>
                            <button className="au-btn au-btn--small au-btn--block au-btn--green m-t-20 "
                                data-toggle="modal" data-target="#modal-aulapratica2">Ver
                                            Discursivas</button>

                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <strong className="card-title text-center">
                                <i className="fa fa-vial"></i> Aula Prática 3</strong>
                        </div>

                        <div className="card-body">
                            <div className="c100 p23 small left green">
                                <span>40%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <span className="">De acerto nas questões objetivas </span>
                            <button className="au-btn au-btn--small au-btn--block au-btn--green m-t-20 "
                                data-toggle="modal" data-target="#modal-aulapratica3">Ver
                                            Discursivas</button>

                        </div>

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <strong className="card-title text-center">
                                <i className="fa fa-vial"></i> Aula Prática 4</strong>
                        </div>

                        <div className="card-body">
                            <div className="c100 p23 small left green">
                                <span>0%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <span className="">Atividade não realizada pelo aluno.</span>
                            <button className="au-btn au-btn--small au-btn--block au-btn--green m-t-20 "
                                data-toggle="modal" data-target="#modal-aulapratica4">Ver
                                            Discursivas</button>

                        </div>

                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-12">
                    <div className="table-data__tool">
                        <div className="table-data__tool-left">
                            <div className="rs-select2--light rs-select2--lg">
                                <select className="js-select2" name="property">
                                    <option selected>Atividade</option>
                                    <option value="">Monte as Sequências</option>
                                    <option value="">Quizz RNA e DNA</option>
                                    <option value="">Destrua as Mutações</option>
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                            <button className="au-btn-filter">
                                <i className="zmdi zmdi-filter-list"></i>Filtrar</button>
                        </div>
                    </div>
                    <div className="table-responsive m-b-40">
                        <table className="table table-borderless table-data3">
                            <thead>
                                <tr>
                                    <th>Atividade</th>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Pontuação</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jogo</td>
                                    <td>Monte as sequências</td>
                                    <td>22/03/04 16:00</td>
                                    <td className="denied">23 pontos</td>
                                </tr>
                                <tr>
                                    <td>Jogo</td>
                                    <td>Destrua as pontuações</td>
                                    <td>22/03/04 16:00</td>
                                    <td className="process">100 Pontos</td>
                                </tr>
                                <tr>
                                    <td>Questionário</td>
                                    <td>Quizz RNA e DNA</td>
                                    <td>22/03/04 16:00</td>
                                    <td className="denied"> 32/40</td>
                                </tr>

                                <tr>
                                    <td>Questionário</td>
                                    <td>Quizz RNA e DNA</td>
                                    <td>22/03/04 16:00</td>
                                    <td className="denied"> 32/40</td>
                                </tr>

                                <tr>
                                    <td>Questionário</td>
                                    <td>Quizz RNA e DNA</td>
                                    <td>22/03/04 16:00</td>
                                    <td className="denied"> 32/40</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div></> : <div></div>}
    </AppLeftNavigation>
}

export default ProfilePage