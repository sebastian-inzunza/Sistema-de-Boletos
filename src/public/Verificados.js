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


fetch("http://localhost:3000/verificados")
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
        { data: "fechaComprado" },
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
       
      ],
    });
}