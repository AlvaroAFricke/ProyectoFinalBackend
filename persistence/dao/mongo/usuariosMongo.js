import Usuario from '../../models/SchemaUsuario.js';
import Connect from '../../conection/MongoConection.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Obtención del directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtención del directorio padre del directorio actual
const parentDir = join(__dirname, '..', '..', '..', './.env');

dotenv.config({path: parentDir}); // Cargar variables de entorno

export default class UsuariosMongo {
  constructor() {
    const MONGODB_URI = process.env.MONGODB_URI;
    const conectar = new Connect(MONGODB_URI);
    conectar.connect();
  }

  async getById(id) {
    try {
      // Obtener un usuario por su ID
      const usuario = await Usuario.findById(id);
      return usuario;
    } catch (error) {
      throw new Error(`Error al obtener el usuario por ID: ${error}`);
    }
  }

  async getByEmail(email) {
    try {
      // Obtener un usuario por su ID
      const usuario = await Usuario.find({email: email});
      return usuario;
    } catch (error) {
      throw new Error(`Error al obtener el usuario por Email: ${error}`);
    }
  }

  async save(usuarioData) {
    try {
      // Crear un nuevo usuario en la base de datos
      const usuario = new Usuario(usuarioData);
      const usuarioGuardado = await usuario.save();
      return usuarioGuardado;
    } catch (error) {
      throw new Error(`Error al guardar el usuario: ${error}`);
    }
  }

  async update(id, usuarioData) {
    try {
        // Actualizar un usuario por su ID
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuarioData, { new: true });
        return usuarioActualizado;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario por ID: ${error}`);
    }
}


  async deleteById(id) {
    try {
      // Eliminar un usuario por su ID
      await Usuario.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el usuario por ID: ${error}`);
    }
  }
}

