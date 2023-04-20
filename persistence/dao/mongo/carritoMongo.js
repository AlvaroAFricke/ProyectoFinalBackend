import Carrito from '../../models/SchemaCarritos.js';
import Connect from '../../conection/MongoConection.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

import { v4 as uuidv4 } from 'uuid';

const generateUniqueCode = () => {
  return uuidv4(); // Generar un UUID v4 único
};

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

  async save() {
    try {
      const codigoUnico = generateUniqueCode(); // Generar un código único
      const carrito = new Carrito({
        codigo: codigoUnico, // Asignar el código único al campo 'codigo'
        time: new Date()
      });
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

  async vaciarCarrito(id) {
    try {
      const carrito = await Carrito.findById(id);
      carrito.productos = [];
      this.updateCarrito(id, carrito);
      return carrito;
    } catch (error) {
      throw new Error;
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
