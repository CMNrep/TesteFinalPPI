export default function autenticador(req, res) {
    const user = req.body.user;
    const password = req.body.password;

    if (user == "cansativo" && password == "sim") {
        req.session.authenticated = true;
        res.redirect("http://localhost:3000/menu.html");
    }
    else{
        
    }
}

export function verificarAutenticacao (req, res, next) {
    if(req.session.authenticated != undefined && req.session.authenticated) {
        next();
    }
    else {
        res.redirect("/login.html");
    }
}

export function logout(req, res){
    req.session.authenticated = undefined;
    res.redirect('/login.html');
}