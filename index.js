import express from "express";
import autenticador from "./Frontend/security/autenticacao.js";
import { verificarAutenticacao, logout } from "./Frontend/security/autenticacao.js";
import session from "express-session";
import cors from "cors"; 
// import routeEventos from "./routes/routeEventos.js";

const frontHost = '0.0.0.0'
const frontPort = 3000
const frontApp = express(); 

frontApp.use(express.urlencoded({ extended: true }));

frontApp.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))

frontApp.use(express.static('./Frontend/public'));

frontApp.get("/menu.html", (req, res) =>{
    res.redirect("/login.html");
})

frontApp.get("/logout", logout)
frontApp.post("/login", autenticador);

frontApp.use(verificarAutenticacao, express.static('./Frontend/private'));

frontApp.listen(frontPort, frontHost, () => {
    console.log(`Servidor frontend em http://${frontHost}:${frontPort}`)
})

//backend
const app = express()
const host = '0.0.0.0'
const port = 4000

app.use(cors({
    origin: "*",
}))

app.use(express.json())

// app.use('/', routeEventos)

app.listen(port, host, () => {
    console.log(`Servidor backend em http://${host}:${port}`)
})