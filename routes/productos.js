import express from 'express';
import ProductosController from '../controllers/productoContorller.js';

// Importar el middleware de autenticación
import { isAuthenticated } from './auth/auth.js';

export default class ProductosRoutes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    // Crear una instancia del controlador de productos
    this.productosController = new ProductosController();

    //Rutas
    this.router.put('/:id?',  this.productosController.actualizarProducto)
    this.router.post('/',  this.productosController.guardarProducto);
    this.router.delete('/:id?',  this.productosController.borrarProdutos);
    this.router.get('/:id?', isAuthenticated , this.productosController.obtenerProductos);
  }
}

