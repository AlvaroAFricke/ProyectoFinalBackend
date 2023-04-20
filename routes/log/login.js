import express from 'express';
import LoginController from '../../controllers/login.js';

export default class Login {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();
    this.login = new LoginController();

    // Rutas Login
    this.router.post('/login', this.login.login);
    this.router.get('/logout', this.login.logout);
    this.router.get('/login', this.login.renderLogin)
    this.router.get('/faillogin', this.login.faillogin)

  }
}
