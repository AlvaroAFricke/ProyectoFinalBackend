import express from 'express';
import Registero from '../../controllers/register.js';

const registro = new Registero()

export default class Register {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    // Rutas Registro
    this.router.get('/register', registro.renderRegister);
    this.router.post('/register', registro.register);
    this.router.get('/failregister', registro.renderFailRegister);

  }
}
