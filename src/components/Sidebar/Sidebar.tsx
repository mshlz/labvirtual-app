import Link from "next/link"
import { Routes } from "./Routes"

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
          {Routes.map((e,i) => {
              if (e.children) {
                return <li key={'sbm-i-' + i} className="has-sub">
                  <a className="js-arrow" href="#">
                    <i className="fas fa-cog"></i>{e.title}</a>
                  <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                    {e.children.map((child, j) => {
                      return <li key={'sb-i-' + i + '-j-' + j} className="">
                        <Link href={`${e.base || ''}${child.path}`}>{child.title}</Link>
                      </li>
                    })}
                  </ul>
                </li>
              } else {
                return <li key={'sbm-i-' + i} className={false ? "active" : ""}>
                  <Link href={e.path}>
                    <a><i className={e.icon}></i>{e.title}</a>
                  </Link>
                </li>
              }
            })}
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
            {Routes.map((e,i) => {
              if (e.children) {
                return <li key={'sb-i-' + i} className="has-sub">
                  <a className="js-arrow" href="#">
                    <i className="fas fa-cog"></i>{e.title}</a>
                  <ul className="list-unstyled navbar__sub-list js-sub-list">
                    {e.children.map((child, j) => {
                      return <li key={'sb-i-' + i + '-j-' + j} className="">
                        <Link href={`${e.base || ''}${child.path}`}>{child.title}</Link>
                      </li>
                    })}
                  </ul>
                </li>
              } else {
                return <li key={'sb-i-' + i} className={false ? "active" : ""}>
                  <Link href={e.path}>
                    <a><i className={e.icon}></i>{e.title}</a>
                  </Link>
                </li>
              }
            })}
          </ul>
        </nav>
      </div>
    </aside>
    {/* <!-- END MENU SIDEBAR--> */}
  </>)
}

export { Sidebar }
