

document.querySelector("a[href='#preguntas']").addEventListener("click", function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  // Haz scroll hacia el elemento de destino
  document.querySelector("#preguntas").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("a[href='#nosotros']").addEventListener("click", function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  // Haz scroll hacia el elemento de destino
  document.querySelector("#nosotros").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("a[href='#contacto']").addEventListener("click", function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  // Haz scroll hacia el elemento de destino
  document.querySelector("#contacto").scrollIntoView({ behavior: "smooth" });
});


document.querySelector("#miBoton").addEventListener("click", function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  // Haz scroll hacia el elemento de destino
  document.querySelector("#header").scrollIntoView({ behavior: "smooth" });
});

