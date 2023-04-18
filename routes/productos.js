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
    this.router.put('/:id?', isAuthenticated, this.productosController.actualizarProducto)
    this.router.post('/', isAuthenticated, this.productosController.guardarProducto);
    this.router.delete('/:id?', isAuthenticated, this.productosController.borrarProdutos);
    this.router.get('/:id?', this.productosController.obtenerProductos);
  }
}

