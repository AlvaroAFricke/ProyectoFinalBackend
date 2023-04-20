import Factory from '../persistence/factory/factoryProductos.js';
import Args from '../utils/args.js'

const arg = new Args();
const productoDAO = new Factory(arg.getTypePersistence())

export default class ProductoService {
  constructor() {

  }

  async obtenerProductos() {
    try {
      // Lógica para obtener todos los productos
      const productos = await productoDAO.getAll();
      
      return productos;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }

  async obtenerProductoPorId(id) {
    try {
      // Lógica para obtener un producto por ID
      const producto = await productoDAO.getById(id);
      
      return producto;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw error;
    }
  }

  async guardarProducto(productoData) {
    try {
      // Lógica para guardar un producto
      const productoGuardado = await productoDAO.save(productoData);
      return productoGuardado;
      
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      throw error;
    }
  }

  async actualizarProducto(id, productoData) {
    try {
      // Lógica para actualizar un producto
      
      const productoActualizado = await productoDAO.updateById(id, productoData);
      return productoActualizado;
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id}:`, error);
      throw error;
    }
  }

  async eliminarProductos() {
    try {
      const productosEliminado = await productoDAO.delete();
      return productosEliminado;
    } catch (error) {
      console.error('Error al eliminar el producto. ', error);
      throw error;
    }
  }

  async eliminarProductoPorId(id) {
    try {
      // Lógica para eliminar un producto por ID
      
      const productoEliminado = await productoDAO.deleteById(id);
      return productoEliminado;
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
      throw error;
    }
  }
}

