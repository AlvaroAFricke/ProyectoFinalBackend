import mongoose from 'mongoose';
import Producto from './SchemaProducto.js';

const carritoSchema = new mongoose.Schema({
  codigo: { type: String, unique: true, required: true }, // Código del carrito (debe ser único)
  time: { type: Date, default: Date.now }, // Fecha de creación del carrito
  productos: [Producto.schema]
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;

