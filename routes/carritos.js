import express from 'express';
import CarritosController from '../controllers/carritoController.js';

export default class CarritosRoutes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    // Crear una instancia del controlador de productos
    this.carritosController = new CarritosController();

    //Rutas
    this.router.post('/', this.carritosController.crearCarrito);
    this.router.delete('/:id', this.carritosController.borrarCarrito);
    this.router.get('/:id', this.carritosController.obtenerCarrito);
    this.router.post('/:id/producto', this.carritosController.agregarProductoAlCarrito);
    this.router.delete('/:id/producto/:idProd', this.carritosController.borrarProductoDelCarrito);
  }

}
