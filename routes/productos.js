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
    //Carga, Actualizacion y Borrado
    this.router.get('/cargarProducto', isAuthenticated, this.productosController.cargarProducto)
    this.router.put('/:id?', isAuthenticated, this.productosController.actualizarProducto)
    this.router.delete('/:id?', isAuthenticated, this.productosController.borrarProdutos);
    this.router.post('/', isAuthenticated, this.productosController.guardarProducto);
    
    //Vista
    this.router.get('/buscarProducto/:buscado', isAuthenticated, this.productosController.buscarNombre)
    this.router.get('/:id?', isAuthenticated, this.productosController.obtenerProductos);
  }
}

