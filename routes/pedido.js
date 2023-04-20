import express from 'express';
import Pedido from '../controllers/pedido.js';

export default class Routes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();
    this.pedido = new Pedido()
    
    //Rutas
    this.router.get('/', this.pedido.renderPedido);
    this.router.post('/:productos', this.pedido.solicitarPedido)

  }
}