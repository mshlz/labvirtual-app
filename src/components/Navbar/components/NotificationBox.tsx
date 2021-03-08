const NotificationBox = (props) => {
  return <>
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
  </>
}

export { NotificationBox }