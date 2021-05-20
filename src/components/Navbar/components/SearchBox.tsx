import { toast } from "react-toastify"

const SearchBox = (props) => {
  return <>
    <form className="form-header" action="" method="POST" onSubmit={event => (event.preventDefault(), toast('Não está implementado ainda!', { type: 'error' }))}>
      <input className="au-input au-input--xl" type="text" name="Procurar" placeholder="Procurar por jogos, questionários ou páginas"
      />
      <button className="au-btn--submit" type="submit">
        <i className="zmdi zmdi-search"></i>
      </button>
    </form>
  </>
}

export { SearchBox }