import express from 'express';
import {Passport} from '../controllers/authController.js';

export default class LoggRoutes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    this.authController = new Passport()

    // Rutas Registro
    this.router.get('/register', this.authController.renderRegister);
    this.router.post('/register', this.authController.register);
    this.router.get('/failregister', this.authController.renderFailRegister);

    //Rutas Login
    this.router.get('/login', this.authController.renderLogin);
    this.router.post('/login', this.authController.login);
    this.router.get('/faillogin', this.authController.renderFailLogin);
    
    this.router.get('/logout', this.authController.logout);

  }
}
