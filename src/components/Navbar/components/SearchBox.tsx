const SearchBox = (props) => {
  return <>
    <form className="form-header" action="" method="POST">
      <input className="au-input au-input--xl" type="text" name="Procurar" placeholder="Procurar por jogos, questionários ou páginas"
      />
      <button className="au-btn--submit" type="submit">
        <i className="zmdi zmdi-search"></i>
      </button>
    </form>
  </>
}

export { SearchBox }