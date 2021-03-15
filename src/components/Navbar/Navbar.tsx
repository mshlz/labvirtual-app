import { useEffect } from "react"
import { useScript } from "../../utils/useScript"
import { AccountBox } from "./components/AccountBox"
import { NotificationBox } from "./components/NotificationBox"
import { SearchBox } from "./components/SearchBox"

const Navbar = (props) => {

  return (<>
    {/* <!-- HEADER DESKTOP--> */}
    <header className="header-desktop">
      <div className="section__content section__content--p30">
        <div className="container-fluid">
          <div className="header-wrap">
            <SearchBox />

            <div className="header-button">
              <NotificationBox />
              <AccountBox />
            </div>

          </div>
        </div>
      </div>
    </header>
    {/* <!-- HEADER DESKTOP--> */}
  </>)
}

export { Navbar }