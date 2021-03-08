import { Navbar } from "../components/Navbar/Navbar"
import { Sidebar } from "../components/Sidebar/Sidebar"

const AppLeftNavigation = ({ children }) => {
  return (
    <>
      <Sidebar />

      {/* <!-- PAGE CONTAINER--> */}
      <div className="page-container">
        <Navbar />

        {/* <!-- MAIN CONTENT--> */}
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">

              {children}

            </div>
          </div>
        </div>
        {/* <!-- END MAIN CONTENT--> */}

      </div>
      {/* <!-- END PAGE CONTAINER--> */}
    </>)
}

export { AppLeftNavigation }
