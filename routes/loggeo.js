import express from 'express';
import Register from '../controllers/register.js';
import {Passport} from '../controllers/authController.js';

const registro = new Register()

export default class LoggRoutes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    this.authController = new Passport()

    // Rutas Registro
    this.router.get('/register', registro.renderRegister);
    this.router.post('/register', registro.register);
    this.router.get('/failregister', registro.renderFailRegister);

    //Rutas Login
    this.router.get('/login', this.authController.renderLogin);
    this.router.post('/login', this.authController.login);
    this.router.get('/faillogin', this.authController.renderFailLogin);
    
    this.router.get('/logout', this.authController.logout);

  }
}
