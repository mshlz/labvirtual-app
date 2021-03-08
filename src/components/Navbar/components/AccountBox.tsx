const AccountBox = (props) => {
  return <>
    <div className="account-wrap">
      <div className="account-item clearfix js-item-menu">

        <div className="image">
          <img src="/assets/images/blank-profile.png" alt="John Doe" />
        </div>
        <div className="content">
          <a className="js-acc-btn" href="#">Usuário</a>
        </div>

        <div className="account-dropdown js-dropdown">
          <div className="info clearfix">
            <div className="image">
              <a href="#">
                <img src="/assets/images/blank-profile.png" alt="John Doe" />
              </a>
            </div>
            <div className="content">
              <h5 className="name">
                <a href="#">Usuário</a>
              </h5>
              <span className="email">AAA</span>
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
  </>
}

export { AccountBox }