import {
  getBoletoById,
  updateBoleto,
  updateBoletoFalse,
  insertFolio,
} from "./socket.js";
const boletosList = document.querySelector("#boletos");
const prueba = document.getElementById("comprarBoletos");
let boletosLocal;

let saveId = "";

export const renderBoletos = (boletos) => {
  boletosList.innerHTML = "";
  boletos.forEach((element) => boletosList.append(boletotoUi(element)));
};

const boletotoUi = (boleto) => {
  const button = document.createElement("button");
  button.innerHTML = `
   <button data-id=${boleto._id} class="bg-yellow-500 m-2 md:px-16 md:w-40 w-12 md:px-10 py-2 rounded-md hover:bg-yellow-700 seleccionar" >${boleto.numero}</button>

    `;
  // <button data-id=${boleto._id} class="bg-yellow-500 m-2 md:px-16 md:px-10  py-2 rounded-md hover:bg-yellow-700 seleccionar" >${boleto.numero}</button>

  const btnSelect = button.querySelector(".seleccionar");
  btnSelect.disabled = boleto.activo;
  if (boleto.activo) {
    btnSelect.classList.add("bg-gray-950");
    btnSelect.classList.add("text-black");
    btnSelect.classList.remove("hover:bg-yellow-700");
  }
  btnSelect.addEventListener("click", (e) => {
    // boletosComprar(boleto.data.numero)

    updateBoleto(btnSelect.dataset.id);
    boletosComprar(boleto.numero, btnSelect.dataset.id);
    prueba.classList.remove("hidden");

    boletosLocal = JSON.stringify(boletosCar);
    sessionStorage.setItem("misBoletos", boletosLocal);
    // getBoletoById(btnSelect.dataset.id);
  });

  return button;
};

export let boletosCar = [];
const boletosComprar = (numero, id) => {
  const data = {
    numero: numero,
    id: id,
  };
  boletosCar.push(data);

  // const comprar = document.getElementById("comprar");
  // comprar.classList.remove("hidden")
  // warning.classList.remove("hidden");

  const misBoletos = document.getElementById("misBoletos");
  const button = document.createElement("button");
  button.innerHTML = `
    <button data-id=${id} class="bg-custom-bol text-white py-2 md:px-10 w-32 m-1 rounded-md text-center prueba ">${numero}</button>
    `;

  boletosCar.forEach(() => misBoletos.append(button));

  const btnSelect = button.querySelector(".prueba");
  btnSelect.addEventListener("click", (e) => {
    updateBoletoFalse(btnSelect.dataset.id);
    btnSelect.remove();
    deleteData(id);
    const arregloActualizadoString = JSON.stringify(boletosCar);

    // Guardar el arreglo actualizado en el sessionStorage
    sessionStorage.setItem("misBoletos", arregloActualizadoString);

    if (boletosCar.length === 0) {
      prueba.classList.add("hidden");
    }
  });
};

const deleteData = (id) => {
  const indice = boletosCar.findIndex(function (objeto) {
    return objeto.id === id;
  });

  if (indice !== -1) {
    // Eliminar el objeto del arreglo usando splice()
    boletosCar.splice(indice, 1);
  }
};

const comprar = document.getElementById("comprar");
comprar.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  const modalBoletos = document.getElementById("modalBoletos");

  const p = document.createElement("p");

  p.innerHTML = `<p class=" md:text-2xl text-center text-lg text-white my-3 font-bold">Haz seleccionado un total de ${
    boletosCar.length
  } ${boletosCar.length === 1 ? "boleto." : "boletos."}</p>`;
  modalBoletos.append(p);
});

window.onload = function () {
  try {
    const misBoletosLocal = sessionStorage.getItem("misBoletos");
    const arreglo = JSON.parse(misBoletosLocal);

    if (misBoletosLocal.length !== 0) {
      arreglo.forEach((element) => {
        updateBoletoFalse(element.id);
      });
    } else {
      return;
    }

    sessionStorage.clear();
  } catch (error) {}
};

const modal = document.getElementById("modal");
const cerrarModalBtn = document.getElementById("cerrarModal");
const modalBoletos = document.getElementById("modalBoletos");

cerrarModalBtn.addEventListener("click", () => {
  const p = document.getElementById("warningNumero");
  modalBoletos.innerHTML = ``;
  modal.classList.add("hidden");
  p.innerHTML = "";
  const telefono = document.getElementById("telefono").value = "";
  const nombre = document.getElementById("nombre").value ="";

});

function enviarMensaje(folio) {
  const numeroTelefono = "3319764003"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
  const mensaje = "¡Hola, soy un mensaje desde mi página web!" + folio; // Reemplaza con el mensaje que deseas enviar

  const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(url);
}
const comprarboletosModal = document.getElementById("comprarboletosModal");
comprarboletosModal.addEventListener("click", (e) => {
  const telefono = document.getElementById("telefono").value;
  const nombre = document.getElementById("nombre").value;
  const formulario = document.getElementById("formulario");
  if (telefono !== "" && nombre !== "") {
    const folio = generarFolio();
    enviarMensaje(folio);

    const boletos = [];

    boletosCar.forEach((element) => {
      boletos.push(String(element.numero));
    });

    insertFolio(telefono, nombre, folio, boletos);
    boletosCar = [];
    sessionStorage.clear();
    formulario.reset();

    location.reload();
  }else{
    console.log("Holaaa")
  }
});

const generarFolio = (telefono) => {
  // Generar un número aleatorio entre 1000 y 9999
  let numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;

  // Obtener la fecha y hora actual
  let fecha = new Date();
  let timestamp = fecha.getTime();

  // Concatenar el número aleatorio y el timestamp para formar el folio
  let folio = numeroAleatorio + "-" + timestamp;

  return folio;
};

// const notesList = document.querySelector("#notes");

// let saveId = "";

// const noteUi = (note) => {
//     const div = document.createElement("div");
//     div.innerHTML = `
//     <div class="card card-body rounded-0 mb-2 animate__animated animate__fadeInUp">
//         <div class="d-flex justify-content-between">
//         <h1>${note.title}</h1>
//         <div>
//         <button class="delete btn btn-danger" data-id=${note._id} >Delete</button>
//         <button class="update btn btn-secondary" data-id=${note._id} >Edit</button>

//         </div>
//         </div>
//         <p>${note.description}</p>
//     </div>
//     `;

//     const btnDelete = div.querySelector(".delete");
//     btnDelete.addEventListener("click", (e) => {
//         deleteNote(btnDelete.dataset.id);
//     });

//     const btnUpdate = div.querySelector(".update");
//     btnUpdate.addEventListener("click", (e) => {
//         getNoteById(btnUpdate.dataset.id);
//     });
//     return div;
// };

// export const renderNotes = (notes) => {
//     notesList.innerHTML = "";
//     notes.forEach((element) => notesList.append(noteUi(element)));
// };

// export const onHandleSubmit = (e) => {
//     e.preventDefault();

//     if (saveId) {
//         const titulo = document.getElementById("titulo").value;
//         const descripcion = document.getElementById("descripcion").value;

//         updateNote(saveId, titulo, descripcion)
//     } else {
//         const titulo = document.getElementById("titulo").value;
//         const descripcion = document.getElementById("descripcion").value;

//         saveNote(titulo, descripcion);
//     }
//     document.getElementById("titulo").value = ""
//     document.getElementById("descripcion").value = "";
//     saveId = ""
// };

// export const appendNote = (note) => {
//     notesList.append(noteUi(note));
// };

// export const fillForm = (note) => {
//     saveId = note._id;
//     document.getElementById("titulo").value = note.title;
//     document.getElementById("descripcion").value = note.description;
// };

export const fillForm = (note) => {
  console.log(note);
};
