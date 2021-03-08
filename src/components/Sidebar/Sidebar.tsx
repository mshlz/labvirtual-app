const Sidebar = (props) => {
  return (<>
    {/* <!-- HEADER MOBILE--> */}
    < header className="header-mobile d-block d-lg-none" >
      <div className="header-mobile__bar">
        <div className="container-fluid">
          <div className="header-mobile-inner">
            <a className="logo" href="home.html">
              <img src="/assets/images/logo.png" className="mobile-logo" />
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
    </header >
    {/* <!-- END HEADER MOBILE--> */}

    {/* <!-- MENU SIDEBAR--> */}
    <aside className="menu-sidebar d-none d-lg-block">
      <div className="logo">
        <a href="#">
          <img src="/assets/images/logo.png" />
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
  </>)
}

export { Sidebar }