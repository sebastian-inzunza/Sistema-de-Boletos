const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      // Guarda el token de forma segura para su uso posterior

      // Guardar el token en el localStorage
      sessionStorage.setItem("token", token);

      // Redirecciona a la página de inicio después del inicio de sesión exitoso
      window.location.href = "alta.html";
    } else {
      const error = await response.json();
      console.error(error.error);
    }
  } catch (error) {
    console.error("Error de conexión", error);
  }
});

