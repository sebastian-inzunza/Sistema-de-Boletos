import { loadBoletos, onSelected  } from "./socket.js"
import { renderBoletos,fillForm} from './ui.js'

// onNewNote(appendNote)
// loadNotes(renderNotes)
// onSelected(fillForm)

loadBoletos(renderBoletos)
onSelected(fillForm)



// const noteForm = document.querySelector("#noteForm")

// noteForm.addEventListener("submit", onHandleSubmit)