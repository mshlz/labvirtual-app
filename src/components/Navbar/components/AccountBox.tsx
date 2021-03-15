import Link from "next/link"
import { useContext, useState } from "react"
import AppContext, { useApp } from "../../../context/AppContext"
import { Button } from "../../UI/Button"

const AccountBox = (props) => {
  const { user, logout } = useApp()
  const [isOpen, setOpen] = useState(false)

  return <>
    <div className="account-wrap">
      <div className={`account-item clearfix js-item-menu. ${isOpen ? 'show-dropdown' : ''}`} onClick={() => setOpen(!isOpen)}>

        <div className="image">
          <img src="/assets/images/blank-profile.png" alt="John Doe" />
        </div>
        <div className="content">
          <a className="js-acc-btn" href="#">{user?.name}</a>
        </div>

        <div className={`account-dropdown js-dropdown`}>
          <div className="info clearfix">
            <div className="image">
              <a href="#">
                <img src="/assets/images/blank-profile.png" alt="John Doe" />
              </a>
            </div>
            <div className="content">
              <h5 className="name">
                <a href="#">{user?.name}</a>
              </h5>
              <span className="email">{user.email}</span>
            </div>
          </div>

          <div className="account-dropdown__body">
            <div className="account-dropdown__item">
              <Link href="/profile">
                <a><i className="zmdi zmdi-account"></i>Minha Conta</a>
              </Link>
            </div>

            <div className="account-dropdown__item">
              <Link href="/profile">
                <a><i className="zmdi zmdi-settings"></i>Configurações</a>
              </Link>
            </div>
          </div>

          <div className="account-dropdown__footer" >
            <a href="#" onClick={() => logout()}>
              <i className="zmdi zmdi-power"></i>Logout</a >
          </div>
        </div>
      </div>
    </div>
  </>
}

export { AccountBox }