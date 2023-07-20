function validarLongitud() {
    var campo = document.getElementById("telefono");
    const p = document.getElementById("warningNumero");
    var valor = campo.value;
  
    if (valor.length > 10 || valor.length < 10) {
      campo.value = "";
      p.innerHTML =
        "<p class='text-center text-xl text-white bg-red-800 py-2 px-2 rounded-md font-bold'>Escribe solo 10 digitos</p>";
    
        setTimeout(() => {
            const p = document.getElementById("warningNumero");
            p.innerHTML = ""
          }, 5000);
          
    } else {
      p.innerHTML = "";
    }
  }



  document.querySelector("#boletosCompra").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  
    // Haz scroll hacia el elemento de destino
    document.querySelector("#boletosAqui").scrollIntoView({ behavior: "smooth" });
  });
  