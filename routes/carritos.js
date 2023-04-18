import express from 'express';
import CarritosController from '../controllers/carritoController.js';

// Importar el middleware de autenticación
import { isAuthenticated } from './auth/auth.js';

export default class CarritosRoutes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    // Crear una instancia del controlador de productos
    this.carritosController = new CarritosController();

    //Rutas
    this.router.post('/', isAuthenticated, this.carritosController.crearCarrito);
    this.router.delete('/:id', isAuthenticated, this.carritosController.borrarCarrito);
    this.router.get('/:id', isAuthenticated, this.carritosController.obtenerCarrito);
    this.router.post('/:id/producto', isAuthenticated, this.carritosController.agregarProductoAlCarrito);
    this.router.delete('/:id/producto/:idProd', isAuthenticated, this.carritosController.borrarProductoDelCarrito);
  }

}
