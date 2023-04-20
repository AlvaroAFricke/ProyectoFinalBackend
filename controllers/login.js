import passport from '../service/passport/passport.js';

// Función callback para cerrar sesión
function logoutCallback(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

export default class LoginController {

    constructor() { }

    // Controlador para la ruta de inicio de sesión
    login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/api/carrito', // Redirección exitosa
            failureRedirect: '/faillogin' // Redirección en caso de fallo
        })(req, res, next);
    }

    renderLogin(req, res) {
        res.render('./forms/log/login')
    }

    // Controlador para la ruta de cierre de sesión
    logout(req, res) {
        logoutCallback(req, res); // Llamada a la función logoutCallback
    }

    // Controlador para la ruta de inicio de sesión fallida
    faillogin(req, res) {
        res.render('./forms/log/noLog');
    }
}
