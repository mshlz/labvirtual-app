import Link from "next/link"
import { useEffect } from "react"

const Sidebar = (props) => {
  return (<>
    {/* <!-- HEADER MOBILE--> */}
    <header className="header-mobile d-block d-lg-none">
      <div className="header-mobile__bar">
        <div className="container-fluid">
          <div className="header-mobile-inner">
            <Link href="/">
              <a className="logo">
                <img src="/assets/images/logo.png" className="mobile-logo" />
              </a>
            </Link>
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
              <Link href="/"><a><i className="fas fa-tachometer-alt"></i>Início</a></Link>
            </li>
            {/* <li>
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
            </li> */}

            {/* <li className="has-sub">
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
            </li> */}


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
                  <Link href="/manager/classes">Controle de Turmas</Link>
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
        <Link href="/">
          <a><img src="/assets/images/logo.png" /></a>
        </Link>
      </div>
      <div className="menu-sidebar__content js-scrollbar1">
        <nav className="navbar-sidebar">
          <ul className="list-unstyled navbar__list">
            <li className="active">
              <Link href="/">
                <a><i className="fas fa-home"></i>Início</a>
              </Link>
            </li>
            {/* <li>
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
            </li> */}

            <li className="has-sub">
              <a className="js-arrow" href="#">
                <i className="fas fa-cog"></i>Configurações</a>
              <ul className="list-unstyled navbar__sub-list js-sub-list">
                <li className="">
                  <Link href="/profile">Minha Conta</Link>
                </li>
                <li>
                  <a href="#">Alterar Dados</a>
                </li>
                <li>
                  <a href="#">Suporte</a>
                </li>

              </ul>
            </li>

            <li className="has-sub">
              <a className="js-arrow" href="#">
                <i className="fas fa-cog"></i>Gerenciamento</a>
              <ul className="list-unstyled navbar__sub-list js-sub-list">
                <li>
                  <Link href="/manager/institutions">Controle de Instituições</Link>
                </li>
                <li>
                  <Link href="/manager/disciplines">Controle de Disciplinas</Link>
                </li>
                <li>
                  <Link href="/manager/subjects">Controle de Assuntos</Link>
                </li>
                <li className="">
                  <Link href="/manager/lessons">Controle de Conteúdo Teórico</Link>
                </li>
                <li className="">
                  <Link href="/manager/quiz">Controle de Questionários</Link>
                </li>
                <li className="">
                  <Link href="/manager/classes">Controle de Turmas</Link>
                </li>
                {/* <li>
                  <a href="controle-alunos.html">Controle de Alunos</a>
                </li> */}

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