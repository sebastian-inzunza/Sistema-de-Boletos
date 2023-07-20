import {
  getBoletoById,
  updateBoleto,
  deleteComprado,
  updateBoletoFalse,
  insertFolio,
  inserVerificado,
} from "./socket.js";

const token = sessionStorage.getItem("token");

if (!token) {
  // Si no hay un token, redirige al formulario de inicio de sesión
  window.location.href = "/login.html";
} else {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manipular los datos recibidos
     
      // Realizar cualquier operación adicional con los datos
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Eliminar el token almacenado en el cliente, por ejemplo, desde el localStorage
        sessionStorage.removeItem("token");

        // Redirigir a la página de inicio de sesión u otra página apropiada
        window.location.href = "/login.html";
      } else {
        const error = await response.json();
        console.error(error.error);
      }
    } catch (error) {
      console.error("Error de conexión", error);
    }
  });
  // Si hay un token, puedes continuar cargando la página `alta.html` o realizar otras acciones necesarias
}

// const tr = document.getElementById("comprados");

// const boletotoUi = (comprar) => {
//   const tr = document.createElement("tr");
//   tr.innerHTML = `
//     <tr>
//     <td class="py-2 px-4 border-b text-center">${comprar.folio}</td>
//         <td class="py-2 px-4 border-b text-center">${comprar.nombre}</td>
//         <td class="py-2 px-4 border-b text-center">${comprar.boletos}</td>
//         <td class="py-2 px-4 border-b text-center">
//         <button class="py-2 bg-red-500 px-4 rounded-md">
//         Eliminar folio
//         </button>
//         <button class="py-2 bg-red-500 px-4 rounded-md">
//         Boleto comprado
//         </button>
//     </td>
//     </tr>
//       `;
//   // <button data-id=${boleto._id} class="bg-yellow-500 m-2 md:px-16 md:px-10  py-2 rounded-md hover:bg-yellow-700 seleccionar" >${boleto.numero}</button>

//   // const btnSelect = button.querySelector(".seleccionar");
//   // btnSelect.disabled = boleto.activo;
//   // if (boleto.activo) {
//   //   btnSelect.classList.add("bg-gray-950");
//   //   btnSelect.classList.add("text-black");
//   //   btnSelect.classList.remove("hover:bg-yellow-700");
//   // }
//   // btnSelect.addEventListener("click", (e) => {
//   //   // boletosComprar(boleto.data.numero)

//   //   updateBoleto(btnSelect.dataset.id);
//   //   boletosComprar(boleto.numero, btnSelect.dataset.id);
//   //   prueba.classList.remove("hidden");

//   //   boletosLocal = JSON.stringify(boletosCar);
//   //   sessionStorage.setItem("misBoletos", boletosLocal);
//   //   // getBoletoById(btnSelect.dataset.id);
//   // });

//   return tr;
// };

fetch("http://localhost:3000/data")
  .then((response) => response.json())
  .then((data) => {
    // Llamar a la función para construir la tabla con los datos
    buildDataTable(data);
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });

function buildDataTable(data) {
  $("#myTable").DataTable({
    data: data,
    columns: [
      { data: "folio" },
      { data: "nombre" },
      { data: "telefono" },
      { data: "estado" },
      { data: "fechaHora" },

      {
        data: "boletos",
        render: function (data, type, row) {
          let boletosString = [];
          data.forEach((element) => {
            boletosString.push(element.numero);
          });

          const arrayString = boletosString.join(", ");

          return arrayString;
        },
      },
      {
        render: function (data, type, row) {
          return (
            '<button id="eliminar" class="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-400">Eliminar</button>' +
            ' <button id="comprado" class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">Comprado</button>'
          );
        },
      },
    ],
  });

  $("#myTable").on("click", "#eliminar", function () {
    // Obtener el dato de la fila seleccionada
    var data = $("#myTable").DataTable().row($(this).closest("tr")).data();
    // Ejecutar la lógica de eliminación con el dato obtenido
    eliminarRegistro(data);

    var row = $("#myTable").DataTable().row($(this).closest("tr"));

    // Eliminar la fila
    row.remove().draw();
  });

  $("#myTable").on("click", "#comprado", function () {
    // Obtener el dato de la fila seleccionada
    var data = $("#myTable").DataTable().row($(this).closest("tr")).data();
    // Ejecutar la lógica de eliminación con el dato obtenido
    comprarBoleto(data);

    var row = $("#myTable").DataTable().row($(this).closest("tr"));

    // Eliminar la fila
    row.remove().draw();
  });
}

function comprarBoleto(data) {
  // Lógica para eliminar el registro

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

  inserVerificado(
    data.telefono,
    data.nombre,
    data.folio,
    data.boletos,
    data.estado,
    data.fechaHora,
    fechaHoraFormateada
  );
  deleteComprado(data._id);

 
}

function eliminarRegistro(data) {
  let boletos = data.boletos;

  boletos.forEach((element) => {
    updateBoletoFalse(element.id);
  });
  deleteComprado(data._id);

  // Lógica para eliminar el registro
  // console.log("Eliminar registro:", data.boletos[0].numero);
}
