import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now }, // Fecha de creación del carrito
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }], // Array de referencias a los productos en el carrito
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;
