import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  imagen: { type: String, required: false },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
