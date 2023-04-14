import express from 'express';
import ProductosController from '../controllers/productoContorller.js';

export default class Routes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();

    // Crear una instancia del controlador de productos
    this.productosController = new ProductosController();

    //Rutas
    this.router.put('/:id', this.productosController.actualizarProducto)
    this.router.post('/', this.productosController.guardarProducto);
    this.router.delete('/:id?', this.productosController.borrarProdutos);
    this.router.get('/:id?', this.productosController.obtenerProductos);
  }
}

