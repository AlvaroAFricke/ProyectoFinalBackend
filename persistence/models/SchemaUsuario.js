import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    // Campos del modelo de usuario
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    carrito: {
        type: Object,
        default: null
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario
