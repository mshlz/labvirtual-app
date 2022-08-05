// Reference: http://suneditor.com/sample/html/customPlugins.html

import { GlossaryService } from "../../services/GlossaryService"

interface Plugin {
  /**
   * @Required
   * @Unique
   * plugin name
   */
  name: string
  /**
   * @Required
   * data display
   */
  display: string
  /**
   * add function - It is called only once when the plugin is first run.
   *
   * This function generates HTML to append and register the event.
   *
   * @arguments (core : core object, targetElement : clicked button element)
   */
  add: (core: any, targetElement?: any) => void
  active?: (element: any) => boolean
  /**
   * @Required
   * @Override dialog
   * This method is called when the plugin button is clicked.
   * Open the modal window here.
   */
  open: () => void
  /**
   * @Override dialog
   * This method is called just before the dialog opens.
   *
   * If "update" argument is true, it is not a new call, but a call to modify an already created element
   */
  on: (updade: any) => void
  /**
   * @Required
   * @Override dialog
   * This method is called when the dialog window is closed.
   *
   * Initialize the properties.
   */
  init: () => void
  /**
   * @Options
   * tooltip in editor button
   */
  title?: string
  /**
   * HTML for icon in editor
   */
  innerHTML?: string
  buttonClass?: string

  [key: string]: any
}

export const GlossaryEntryPlugin: Plugin = {
  name: "glossaryEntry",
  display: "dialog",

  title: "Add referência glossário",
  buttonClass: "",
  innerHTML: "📑",

  add: function (core) {
    // Registering a namespace for caching as a plugin name in the context object
    const context = core.context
    context.glossaryEntry = {
      focusElement: null, // @Override // This element has focus when the dialog is opened.
      targetSelect: null,
      formBody: null, // reference to form body where list / loading icon / empty icon are plotted
    }

    let glossary_dialog = this.createDialog(core)
    context.glossaryEntry.modal = glossary_dialog
    context.glossaryEntry.focusElement =
      glossary_dialog.querySelector("._se_link_url")
    context.glossaryEntry.targetSelect =
      glossary_dialog.querySelector(".se-input-select")
    context.glossaryEntry.formBody = glossary_dialog.querySelector("#formBody")

    glossary_dialog.querySelector("form").onsubmit = (event) =>
      this.fetchGlossaryItems.call(this, core, event) // ? i think i dont need anymore
    glossary_dialog.querySelector("#searchBtn").onclick = (event) =>
      this.fetchGlossaryItems.call(this, core, event) // event listener to search button

    context.dialog.modal.appendChild(glossary_dialog)
  },

  init: function () {},

  on: function (update) {
    if (!update) {
      this.plugins.glossaryEntry.init.call(this)
    }
  },

  open: function () {
    // open.call(core, pluginName, isModify)
    this.plugins.dialog.open.call(
      this,
      "glossaryEntry",
      "glossaryEntry" === this.currentControllerName
    )
  },

  /** create the dialog html structure */
  createDialog: function (core) {
    const lang = core.lang
    const dialog = core.util.createElement("div")

    const formTitle = "Inserir referência do glossário"
    const searchBtnText = "Buscar"

    dialog.className = "se-dialog-content"
    dialog.style.display = "none"

    let html =
      "" +
      `<form class="editor_link">
                <div class="se-dialog-header">
                    <button type="button" data-command="close" class="se-btn se-dialog-close" aria-label="Close" title="${lang.dialogBox.close}">
                        ${core.icons.cancel}
                    </button>
                    <span class="se-modal-title">${formTitle}</span>
                </div>
                <div class="se-dialog-body">
                    <div class="se-dialog-form">
                        <label>Buscar palavra</label>
                        <div class="d-flex">
                            <input class="se-input-form _se_link_url mr-2" type="text" />
                            <button class="btn btn-light border p-1" id="searchBtn">${searchBtnText}</button>
                        </div>
                    </div>
                    <div class="se-dialog-form" id="formBody">

                    </div>
                </div>
                
            </form>`

    // <div class="se-dialog-footer">
    //    <button type="submit" class="se-btn-primary" title="${lang.dialogBox.submitButton}">
    //       <span>${actionText}</span>
    //    </button>
    //  </div>

    dialog.innerHTML = html

    return dialog
  },

  fetchGlossaryItems: function (core, event) {
    event.preventDefault()
    // console.log("this => ", this, "core => ", core, "event => ", event)
    core.context.glossaryEntry.formBody.innerHTML = this.renderLoading()
    const query = core.context.glossaryEntry.focusElement.value

    GlossaryService.simpleSearch({ query })
      .then((data) => {
        core.context.glossaryEntry.formBody.innerHTML = ""
        core.context.glossaryEntry.formBody.appendChild(
          this.generateListComponent(core, data)
        )
      })
      .catch((err) => {
        core.context.glossaryEntry.formBody.innerHTML = this.renderNoResult(
          err.message || "Ops! Ocorreu um erro."
        )
      })
  },

  renderLoading: function () {
    return `<div class="align-items-center d-flex flex-column justify-content-center mt-3">
                    <i class="fa fa-spin fa-spinner mb-1"></i><small>Carregando</small>
                </div>`
  },

  renderNoResult: function (msg) {
    return `<div class="align-items-center d-flex flex-column justify-content-center mt-3">
                    <i class="fa fa-2x fa-warning mb-1 text-muted"></i><small>${
                      msg || "Nenhum resultado encontrado"
                    }</small>
                </div>`
  },

  generateListComponent: function (
    core,
    items: { id: string; name: string }[]
  ) {
    let listHtml = document.createElement("ul")
    listHtml.classList.add("list-group", "list-group-flush")

    items.map((e) => {
      const li = document.createElement("li")
      const a = document.createElement("a")
      a.innerText = e.name
      a.href = "#"
      a.classList.add("list-group-item", "list-group-item-action")
      a.onclick = (event) => {
        event.preventDefault()
        this.insertEntry.call(this, core, e)
      }
      li.appendChild(a)
      listHtml.appendChild(li)
    })

    if (items.length > 0) return listHtml

    let noResult = document.createElement("div")
    noResult.innerHTML = this.renderNoResult()

    return noResult
  },

  insertEntry: function (core, entry: { _id: string; name: string }) {
    core.functions.insertHTML(
      `<span data-origin="glossary-entry-word" id="${entry._id}">${entry.name}</span>`,
      true
    )
    core.plugins.dialog.close.call(core)
    core.focus()
  },
}
