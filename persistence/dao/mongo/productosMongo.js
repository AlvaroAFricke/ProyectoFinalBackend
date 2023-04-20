import Producto from '../../models/SchemaProducto.js';
import Connect from '../../conection/MongoConection.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Obtención del directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtención del directorio padre del directorio actual
const parentDir = join(__dirname, '..', '..', '..', './.env');

dotenv.config({path: parentDir}); // Cargar variables de entorno

export default class ProductoMongo {
  constructor() {
    const MONGODB_URI = process.env.MONGODB_URI
    const conectar = new Connect(MONGODB_URI);
    conectar.connect()
  }

  async getByName(nombre) {
    try {
      const producto = await Producto.findOne({nombre: nombre})
      return producto
    } catch (error) {
      throw new Error(`Error al obtener el producto por nombre: ${error.message}`);
    }
  }

  async getAll() {
    try {
      // Obtener todos los productos de la base de datos
      const productos = await Producto.find({});
      return productos;
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      // Obtener un producto por su ID
      const producto = await Producto.findById(id);
      return producto;
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  }

  async save(productoData) {
    try {
      // Crear un nuevo producto en la base de datos
      const producto = new Producto({
        nombre: productoData.nombre,
        descripcion: productoData.descripcion,
        time: productoData.time,
        codigo: productoData.codigo,
        imagen: productoData.imagen,
        precio: productoData.precio,
        stock: productoData.stock
      });
      const productoGuardado = await producto.save();
      return productoGuardado;
    } catch (error) {
      throw new Error(`Error al guardar el producto: ${error.message}`);
    }
  }

  async updateById(id, productoData) {
    try {
      // Actualizar un producto por su ID
      const productoActualizado = await Producto.findByIdAndUpdate(id, productoData, { new: true });
      return productoActualizado;
    } catch (error) {
      throw new Error(`Error al actualizar el producto por ID: ${error.message}`);
    }
  }

  async delete() {
    try {
      await Producto.deleteMany({})
    } catch (error) {
      throw new Error(`Error al eliminar todos los productos: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      // Eliminar un producto por su ID
      await Producto.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el producto por ID: ${error.message}`);
    }
  }
}
