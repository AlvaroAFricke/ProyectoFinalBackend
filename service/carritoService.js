import Factory from '../persistence/factory/factoryCarritos.js';
import Args from '../utils/args.js';

const arg = new Args();
const carritoDAO = new Factory(arg.getTypePersistence());

export default class CarritoService {
  constructor() {
    
  }

  async obtenerCarrito(id) {
    try {
      // Lógica para obtener un carrito por ID
      const carrito = await carritoDAO.getById(id);
      return carrito
    } catch (error) {
      console.error(`Error al obtener el carrito con ID ${id}:`, error);
      throw error;
    }
  }

  async crearCarrito() {
    try {
      const carritoGuardado = await carritoDAO.save();
      return carritoGuardado;
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
      throw error;
    }
  }

  async agregarProducto(idCarr, producto) {
    try {
      const carrito = await carritoDAO.getById(idCarr);

      carrito.productos.push(producto);
      await carritoDAO.updateCarrito(idCarr, carrito);

      return carrito;
    } catch (error) {
      console.error(`Error al actualizar el carrito con ID ${idCarr}:`, error);
      throw error;
    }
  }

  async eliminarProducto(idCarr, producto) {
    try {
      const carrito = await carritoDAO.getById(idCarr);

      carrito.productos = carrito.productos.filter((item) => item !== producto)

      await carritoDAO.updateCarrito(idCarr, carrito);

      return carrito;
    } catch (error) {
      console.error(`Error al actualizar el carrito con ID ${idCarr}:`, error);
      throw error;
    }
  }

  async vaciarCarrito(id) {
    try {
      // Lógica para eliminar un carrito por ID
      const carritoEliminado = await carritoDAO.deleteById(id);
      return carritoEliminado;
    } catch (error) {
      console.error(`Error al eliminar el carrito con ID ${id}:`, error);
      throw error;
    }
  }
}
