import Document, { Head, Html, Main, NextScript } from 'next/document'

class LabAppDocument extends Document {
    render() {
        return <>
            <Html>
                <Head>
                    <link href="/assets/css/font-face.css" rel="stylesheet" media="all" />
                    <link href="/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all" />

                    <link href="/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all" />

                    <link href="/vendor/animsition/animsition.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/wow/animate.css" rel="stylesheet" media="all" />
                    <link href="/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/slick/slick.css" rel="stylesheet" media="all" />
                    <link href="/vendor/select2/select2.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all" />

                    <link href="/assets/css/main.css" rel="stylesheet" media="all" />

                </Head>
                <body>
                    {/* <!-- HEADER MOBILE--> */}
                    <header className="header-mobile d-block d-lg-none">
                        <div className="header-mobile__bar">
                            <div className="container-fluid">
                                <div className="header-mobile-inner">
                                    <a className="logo" href="home.html">
                                        <img src="../images/icon/logo.png" className="mobile-logo" />
                                    </a>
                                    <button className="hamburger hamburger--slider" type="button">
                                        <span className="hamburger-box">
                                            <span className="hamburger-inner"></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <nav className="navbar-mobile">
                            <div className="container-fluid">
                                <ul className="navbar-mobile__list list-unstyled">
                                    <li>
                                        <a href="home.html">
                                            <i className="fas fa-tachometer-alt"></i>Início</a>
                                    </li>
                                    <li>
                                        <a href="jogos.html">
                                            <i className="fas fa-gamepad"></i>Jogos</a>
                                    </li>
                                    <li>
                                        <a href="questionarios.html">
                                            <i className="fas fa-tasks"></i>Questionários</a>
                                    </li>

                                    <li>
                                        <a href="conteudo-teorico.html">
                                            <i className="fas fa-align-justify"></i>Conteúdo Teórico</a>
                                    </li>
                                    <li>
                                        <a href="aulas-praticas.html">
                                            <i className="fas fa-vials"></i>Aulas Práticas</a>
                                    </li>
                                    <li>
                                        <a href="forum.html">
                                            <i className="fa fa-comment"></i>Fórum</a>
                                    </li>

                                    <li className="has-sub">
                                        <a className="js-arrow" href="#">
                                            <i className="fas fa-plus"></i>Extras</a>
                                        <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                            <li className="">
                                                <a href="portifolio.html">Portfólio</a>
                                            </li>
                                            <li>
                                                <a href="trofeus.html">Troféus</a>

                                            </li>
                                        </ul>
                                    </li>


                                    <li className="has-sub">
                                        <a className="js-arrow" href="#">
                                            <i className="fas fa-cog"></i>Configurações</a>
                                        <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                            <li className="">
                                                <a href="minhaconta.html">Minha Conta</a>
                                            </li>
                                            <li>
                                                <a href="alterardados.html">Alterar Dados</a>
                                            </li>
                                            <li>
                                                <a href="suporte.html">Suporte</a>
                                            </li>

                                        </ul>
                                    </li>

                                    <li className="has-sub">
                                        <a className="js-arrow" href="#">
                                            <i className="fas fa-cog"></i>Gerenciamento</a>
                                        <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                            <li className="">
                                                <a href="controle-turmas.html">Controle de Turmas</a>
                                            </li>
                                            <li>
                                                <a href="controle-alunos.html">Controle de Alunos</a>
                                            </li>

                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </header>
                    {/* <!-- END HEADER MOBILE--> */}

                    {/* <!-- MENU SIDEBAR--> */}
                    <aside className="menu-sidebar d-none d-lg-block">
                        <div className="logo">
                            <a href="#">
                                <img src="../images/icon/logo.png" />
                            </a>
                        </div>
                        <div className="menu-sidebar__content js-scrollbar1">
                            <nav className="navbar-sidebar">
                                <ul className="list-unstyled navbar__list">
                                    <li className="active">
                                        <a href="#">
                                            <i className="fas fa-tachometer-alt"></i>Início</a>
                                    </li>
                                    <li>
                                        <a href="jogos.html">
                                            <i className="fas fa-gamepad"></i>Jogos</a>
                                    </li>
                                    <li>
                                        <a href="questionarios.html">
                                            <i className="fas fa-tasks"></i>Questionários</a>
                                    </li>

                                    <li>
                                        <a href="conteudo-teorico.html">
                                            <i className="fas fa-align-justify"></i>Conteúdo Teórico</a>
                                    </li>
                                    <li>
                                        <a href="aulas-praticas.html">
                                            <i className="fas fa-vials"></i>Aulas Práticas</a>
                                    </li>

                                    <li>
                                        <a href="forum.html">
                                            <i className="fas fa-comment"></i>Fórum</a>

                                    </li>

                                    <li className="has-sub">
                                        <a className="js-arrow" href="#">
                                            <i className="fas fa-plus"></i>Extras</a>
                                        <ul className="list-unstyled navbar__sub-list js-sub-list">
                                            <li className="">
                                                <a href="portifolio.html">Portfólio</a>
                                            </li>
                                            <li>
                                                <a href="trofeus.html">Troféus</a>

                                            </li>
                                        </ul>
                                    </li>

                                    <li className="has-sub">
                                        <a className="js-arrow" href="#">
                                            <i className="fas fa-cog"></i>Configurações</a>
                                        <ul className="list-unstyled navbar__sub-list js-sub-list">
                                            <li className="">
                                                <a href="minhaconta.html">Minha Conta</a>
                                            </li>
                                            <li>
                                                <a href="alterardados.html">Alterar Dados</a>
                                            </li>
                                            <li>
                                                <a href="suporte.html">Suporte</a>
                                            </li>

                                        </ul>
                                    </li>

                                    <li className="has-sub">
                                        <a className="js-arrow" href="#">
                                            <i className="fas fa-cog"></i>Gerenciamento</a>
                                        <ul className="list-unstyled navbar__sub-list js-sub-list">
                                            <li className="">
                                                <a href="controle-turmas.html">Controle de Turmas</a>
                                            </li>
                                            <li>
                                                <a href="controle-alunos.html">Controle de Alunos</a>
                                            </li>

                                        </ul>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </aside>
                    {/* <!-- END MENU SIDEBAR--> */}

                    {/* <!-- PAGE CONTAINER--> */}
                    <div className="page-container">
                        {/* <!-- HEADER DESKTOP--> */}
                        <header className="header-desktop">
                            <div className="section__content section__content--p30">
                                <div className="container-fluid">
                                    <div className="header-wrap">
                                        <form className="form-header" action="" method="POST">
                                            <input className="au-input au-input--xl" type="text" name="Procurar" placeholder="Procurar por jogos, questionários ou páginas"
                                            />
                                            <button className="au-btn--submit" type="submit">
                                                <i className="zmdi zmdi-search"></i>
                                            </button>
                                        </form>
                                        <div className="header-button">
                                            <div className="noti-wrap">
                                                <div className="noti__item js-item-menu">
                                                    <i className="zmdi zmdi-notifications"></i>
                                                    <span className="quantity">3</span>

                                                    <div className="notifi-dropdown js-dropdown">
                                                        <div className="notifi__title">
                                                            <p id="">Você tem 3 notificações</p>
                                                        </div>
                                                        <div className="notifi__item">
                                                            <div className="bg-c1 img-cir img-40">
                                                                <i className="zmdi zmdi-email-open"></i>
                                                            </div>
                                                            <div className="content">
                                                                <p>Você recebeu uma mensagem de Aline Leal</p>
                                                                <span className="date">April 12, 2018 06:50</span>
                                                            </div>
                                                        </div>
                                                        <div className="notifi__item">
                                                            <div className="bg-c2 img-cir img-40">
                                                                <i className="zmdi zmdi-account-box"></i>
                                                            </div>
                                                            <div className="content">
                                                                <p>Um jogo foi liberado e solicitado por Aline Leal</p>
                                                                <span className="date">April 12, 2018 06:50</span>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="account-wrap">
                                                <div className="account-item clearfix js-item-menu">
                                                    <div className="image">
                                                        <img src="../images/blank-profile.png" id="profile" alt="John Doe" />
                                                    </div>
                                                    <div className="content">
                                                        <a className="js-acc-btn" href="../#" id="alunoNome"></a>
                                                    </div>
                                                    <div className="account-dropdown js-dropdown">
                                                        <div className="info clearfix">
                                                            <div className="image">
                                                                <a href="../#">
                                                                    <img src="../images/blank-profile.png" id="profile1" alt="John Doe" />
                                                                </a>
                                                            </div>
                                                            <div className="content">
                                                                <h5 className="name">
                                                                    <a href="../#" id="alunoNome1"></a>
                                                                </h5>
                                                                <span className="email" id="semestre"></span>
                                                            </div>
                                                        </div>
                                                        <div className="account-dropdown__body">
                                                            <div className="account-dropdown__item">
                                                                <a href="../#">
                                                                    <i className="zmdi zmdi-account"></i>Minha Conta</a>
                                                            </div>
                                                            <div className="account-dropdown__item">
                                                                <a href="../#">
                                                                    <i className="zmdi zmdi-settings"></i>Configurações</a>
                                                            </div>

                                                        </div>
                                                        <div className="account-dropdown__footer">
                                                            <a href="../#">
                                                                <i className="zmdi zmdi-power"></i>Logout</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {/* <!-- HEADER DESKTOP--> */}

                        {/* <!-- MAIN CONTENT--> */}
                        <div className="main-content">
                            <div className="section__content section__content--p30">
                                <div className="container-fluid"></div>

                                <Main />
                            </div>
                        </div>
                        {/* <!-- END MAIN CONTENT--> */}
                    </div>
                    {/* <!-- END PAGE CONTAINER--> */}

                    <NextScript />
                    <script src="/vendor/jquery-3.2.1.min.js"></script>
                    <script src="/vendor/bootstrap-4.1/popper.min.js"></script>
                    <script src="/vendor/bootstrap-4.1/bootstrap.min.js"></script>
                    <script src="/vendor/slick/slick.min.js"></script>
                    <script src="/vendor/wow/wow.min.js"></script>
                    <script src="/vendor/animsition/animsition.min.js"></script>
                    <script src="/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
                    <script src="/vendor/counter-up/jquery.waypoints.min.js"></script>
                    <script src="/vendor/counter-up/jquery.counterup.min.js"></script>
                    <script src="/vendor/circle-progress/circle-progress.min.js"></script>
                    <script src="/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
                    <script src="/vendor/chartjs/Chart.bundle.min.js"></script>
                    <script src="/vendor/select2/select2.min.js"></script>
                </body>
            </Html>
        </>
    }
}

export default LabAppDocument