import express from 'express';
import passport from '../../service/passport/passport.js';

export default class Login {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    //Rutas Login
    // Ruta de inicio de sesión
    this.router.post('/login', passport.authenticate('local', {
      successRedirect: '/api/productos', // Redirección exitosa
      failureRedirect: '/faillogin' // Redirección en caso de fallo
    }));

    // Ruta de cierre de sesión
    this.router.get('/logout', (req, res) => {
      req.logout(); // Método de Passport para cerrar sesión
      res.redirect('/login'); // Redirección a la página de inicio de sesión
    });

    this.router.get('/login', (req, res) => {
      res.render('./forms/log/login');
    })

    this.router.get('/faillogin', (req, res) => {
      res.render('./forms/log/noLog');
    })

  }
}
