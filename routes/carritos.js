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
    this.router.get('/', isAuthenticated , this.carritosController.asignarCarrito);
    this.router.get('/:idCarr', isAuthenticated , this.carritosController.obtenerCarrito);
    this.router.post('/:idCarr/producto/:idProd', isAuthenticated , this.carritosController.procesarCarrito);
    this.router.delete('/:idCarr/producto/:idProd', isAuthenticated , this.carritosController.procesarCarrito);
  }

}
