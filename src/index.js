import { Server as WebSocketServer } from "socket.io";
import http from "http";
import Sockets from "./sockets";
import app from "./app";
import { connectDB, getUser } from "./db";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import Comprados from "./models/Comprados";
import Verificados from "./models/Verificados";


// import { PORT } from "./config";

connectDB();
const server = http.createServer(app);
const httpServer = server.listen(3000);
console.log("Server on http://localhost:", 3000);

const io = new WebSocketServer(httpServer);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Sockets(io);
// Secret key para firmar los tokens
const secretKey = "secreto123";

app.post("/login", async (req, res) => {
  // Aquí puedes implementar la lógica de inicio de sesión
  const { username, password } = req.body;


  // Realiza la validación de las credenciales del usuario
  if (username === "admin" && password === "883ey$3*TldX33AKsQGksa4v%") {
    // Credenciales válidas, genera un token JWT
    const token = jwt.sign({ username }, secretKey);

    // Envía el token como respuesta
    res.json({ token });
  } else {
    // Credenciales inválidas, muestra un mensaje de error
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

// Middleware de autenticación con JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: "Token inválido" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Token no proporcionado" });
  }
};

app.get("/alta", authenticateJWT, (req, res) => {
  res.sendFile(__dirname + "../src/public/alta.html");
});

app.post("/logout", (req, res) => {
  // Aquí puedes realizar las acciones necesarias para cerrar la sesión, como eliminar el token almacenado o realizar otras tareas de limpieza
  // Por ejemplo:
  // Eliminar el token almacenado en el cliente
  res.json({ message: "Sesión cerrada exitosamente" });
});


app.get("/data",  async(req, res) => {
  try {
    // Obtener los datos de tu colección de MongoDB
    const data = await Comprados.find();

    // Renderizar el archivo "alta.html" y pasar los datos a la plantilla
    res.json(data )
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los datos');
  }

});


app.get("/verificados",  async(req, res) => {
  try {
    // Obtener los datos de tu colección de MongoDB
    const data = await Verificados.find();

    // Renderizar el archivo "alta.html" y pasar los datos a la plantilla
    res.json(data )
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los datos');
  }

});
