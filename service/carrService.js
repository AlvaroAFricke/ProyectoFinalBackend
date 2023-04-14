import Factory from '../persistence/factory/factoryCarritos.js';
import Args from '../utils/args.js';

export default class CarritoService {
  constructor() {
    const arg = new Args();
    this.carritoDAO = new Factory(arg.getTypePersistence());
  }

  async obtenerProductosDelCarrito(id) {
    try {
      // Lógica para obtener un carrito por ID
      const carrito = await this.carritoDAO.getById(id);
      return carrito.productos
    } catch (error) {
      console.error(`Error al obtener el carrito con ID ${id}:`, error);
      throw error;
    }
  }

  async guardarCarrito(carritoData) {
    try {
      // Lógica para guardar un carrito
      const carritoGuardado = await this.carritoDAO.save(carritoData);
      return carritoGuardado;
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
      throw error;
    }
  }

  async actualizarCarrito(id, carritoData) {
    try {
      // Lógica para actualizar un carrito
      const carritoActualizado = await this.carritoDAO.updateCarrito(id, carritoData);
      return carritoActualizado;
    } catch (error) {
      console.error(`Error al actualizar el carrito con ID ${id}:`, error);
      throw error;
    }
  }

  async eliminarCarritoPorId(id) {
    try {
      // Lógica para eliminar un carrito por ID
      const carritoEliminado = await this.carritoDAO.deleteById(id);
      return carritoEliminado;
    } catch (error) {
      console.error(`Error al eliminar el carrito con ID ${id}:`, error);
      throw error;
    }
  }
}
