import {
  getBoletoById,
  updateBoleto,
  updateBoletoFalse,
  insertFolio,
} from "./socket.js";

const boletosList = document.querySelector("#boletos");
const prueba = document.getElementById("comprarBoletos");

let boletosLocal;

export const renderBoletos = (boletos) => {
  boletosList.innerHTML = "";
  boletos.forEach((element) => boletosList.append(boletotoUi(element)));
};

const boletotoUi = (boleto) => {
  
  const botones = document.querySelectorAll(".seleccionar");
  // Filtrar los botones deshabilitados
  var botonesDeshabilitados = Array.from(botones).filter(function (boton) {
    return boton.disabled;
  });

  // Obtener el contador de botones deshabilitados
  var contadorDeshabilitados = botonesDeshabilitados.length;

  let desa = document.getElementById("alertaNuevo")
  let prue = document.getElementById("Perro")


  if(contadorDeshabilitados === 499){

    desa.classList.remove("hidden")
    prue.classList.add("hidden")
  }else{
    prue.classList.remove("hidden")
    desa.classList.add("hidden")
    const button = document.createElement("button");
  button.innerHTML = `
   <button data-id=${boleto._id} class="bg-yellow-500 m-2 md:px-16 md:w-40 w-12 md:px-10 py-2 rounded-md hover:bg-yellow-700 seleccionar " >${boleto.numero}</button>

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

  }

  
};

let boletosCar = [];
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
  const telefono = (document.getElementById("telefono").value = "");
  const nombre = (document.getElementById("nombre").value = "");
});

const comprarboletosModal = document.getElementById("comprarboletosModal");
comprarboletosModal.addEventListener("click", (e) => {
  e.preventDefault();

  const telefono = document.getElementById("telefono").value;
  const nombre = document.getElementById("nombre").value;
  const formulario = document.getElementById("formulario");
  const estado = document.getElementById("estados-select").value;

  //

  if (telefono !== "" && nombre !== "" && estado !== "") {
    const folio = generarFolio();
    enviarMensaje(folio);

    // Obtener la fecha y hora actual
    let fechaHoraActual = new Date();

    // Obtener los componentes de la fecha y hora
    let año = fechaHoraActual.getFullYear();
    let mes = fechaHoraActual.getMonth() + 1; // Los meses comienzan en 0, por lo que se suma 1
    let dia = fechaHoraActual.getDate();
    let hora = fechaHoraActual.getHours();
    let minutos = fechaHoraActual.getMinutes();
    let segundos = fechaHoraActual.getSeconds();

    // Formatear la fecha y hora como una cadena
    let fechaHoraFormateada =
      año + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;


    let boletos = [];
    let boletosPus = [];

    boletosCar.forEach((element) => {
      boletos = {
        numero: element.numero,
        id: element.id,
      };
      boletosPus.push(boletos);
    });



    insertFolio(
      telefono,
      nombre,
      folio,
      boletosPus,
      estado,
      fechaHoraFormateada
    );
    boletosCar = [];
    sessionStorage.clear();
    formulario.reset();

    location.reload();
  } else {
    const p = document.getElementById("warningNumero");

    p.innerHTML =
      "<p class='text-center text-xl text-white bg-red-800 py-2 px-2 rounded-md font-bold'>Llena todos los campos</p>";

    setTimeout(() => {
      const p = document.getElementById("warningNumero");
      p.innerHTML = "";
    }, 5000);
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

};

function enviarMensaje(folio) {
  const nombre = document.getElementById("nombre").value;

  let boletosString = [];
  boletosCar.forEach((element) => {
    boletosString.push(element.numero);
  });

  const arrayString = boletosString.join(", ");

  const numeroTelefono = "3320291811"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
  const mensaje =
    "¡Hola, mi nombre es " +
    nombre +
    " y quiero participar en el sorteo, por ello quiero apartar estos boletos:  " +
    arrayString +
    ", Este es mi número de folio: " +
    "*" +
    folio +
    "*"; // Reemplaza con el mensaje que deseas enviar

  const url = `
  https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

  // const link = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
  //   mensaje
  // )}`;

  window.open(url);
}
