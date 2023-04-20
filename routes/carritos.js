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
    this.router.post('/', this.carritosController.crearCarrito)
    this.router.delete('/:idCarr',  this.carritosController.borrarCarrito);
    this.router.get('/:idCarr',  this.carritosController.obtenerCarrito);
    this.router.post('/:idCarr/producto/:idProd',  this.carritosController.procesarCarrito);
    this.router.delete('/:idCarr/producto/:idProd',  this.carritosController.procesarCarrito);
  }

}
