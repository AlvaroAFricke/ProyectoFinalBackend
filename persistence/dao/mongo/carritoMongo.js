import Carrito from '../../models/SchemaCarritos.js';
import Connect from '../../conection/MongoConection.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Obtención del directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtención del directorio padre del directorio actual
const parentDir = join(__dirname, '..', '..', '..', './.env');

dotenv.config({ path: parentDir }); // Cargar variables de entorno

export default class CarritoMongo {
  constructor() {
    const MONGODB_URI = process.env.MONGODB_URI;
    const conectar = new Connect(MONGODB_URI);
    conectar.connect();
  }

  async getById(id) {
    try {
      // Obtener un carrito por su ID
      const carrito = await Carrito.findById(id);
      return carrito;
    } catch (error) {
      throw new Error(`Error al obtener el carrito por ID: ${error}`);
    }
  }

  async save(carritoData) {
    try {
      // Crear un nuevo carrito en la base de datos
      const carrito = new Carrito(carritoData);
      const carritoGuardado = await carrito.save();
      return carritoGuardado;
    } catch (error) {
      throw new Error(`Error al guardar el carrito: ${error}`);
    }
  }

  async updateCarrito(id, carritoData) {
    try {
      // Actualizar un carrito por su ID
      const carritoActualizado = await Carrito.findByIdAndUpdate(id, carritoData, { new: true });
      return carritoActualizado;
    } catch (error) {
      throw new Error(`Error al actualizar el carrito por ID: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      // Eliminar un carrito por su ID
      await Carrito.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el carrito por ID: ${error}`);
    }
  }
}
