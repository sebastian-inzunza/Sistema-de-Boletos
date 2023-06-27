import { saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

const notesList = document.querySelector("#notes");
let saveId = "";

const noteUi = (note) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__fadeInUp">
        <div class="d-flex justify-content-between">
        <h1>${note.title}</h1>
        <div>
        <button class="delete btn btn-danger" data-id=${note._id} >Delete</button>
        <button class="update btn btn-secondary" data-id=${note._id} >Edit</button>

        </div>
        </div>
        <p>${note.description}</p>
    </div>
    `;

    const btnDelete = div.querySelector(".delete");
    btnDelete.addEventListener("click", (e) => {
        deleteNote(btnDelete.dataset.id);
    });

    const btnUpdate = div.querySelector(".update");
    btnUpdate.addEventListener("click", (e) => {
        getNoteById(btnUpdate.dataset.id);
    });
    return div;
};

export const renderNotes = (notes) => {
    notesList.innerHTML = "";
    notes.forEach((element) => notesList.append(noteUi(element)));
};

export const onHandleSubmit = (e) => {
    e.preventDefault();

    if (saveId) {
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;

        updateNote(saveId, titulo, descripcion)
    } else {
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;

        saveNote(titulo, descripcion);
    }
    document.getElementById("titulo").value = ""
    document.getElementById("descripcion").value = ""; 
    saveId = ""
};  


export const appendNote = (note) => {
    notesList.append(noteUi(note));
};

export const fillForm = (note) => {
    saveId = note._id;
    document.getElementById("titulo").value = note.title;
    document.getElementById("descripcion").value = note.description;
};


