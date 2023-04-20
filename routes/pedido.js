import express from 'express';
import Pedido from '../controllers/pedido.js';

// Importar el middleware de autenticación
import { isAuthenticated } from './auth/auth.js';

export default class Routes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();
    this.pedido = new Pedido()
    
    //Rutas
    this.router.get('/', isAuthenticated , this.pedido.renderPedido);
    this.router.post('/:productos', isAuthenticated , this.pedido.solicitarPedido)

  }
}