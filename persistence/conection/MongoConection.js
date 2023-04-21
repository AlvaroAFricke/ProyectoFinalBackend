import mongoose from 'mongoose'; // Importar la librería mongoose para la conexión a MongoDB
import logger from '../../utils/logger.js'; // Importar un logger personalizado para el registro de eventos

export default class MongoConnection {
  constructor(uri) {
    this.uri = uri; // Almacenar la URI de la base de datos MongoDB en la propiedad 'uri'
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, { // Conectar a la base de datos MongoDB utilizando la URI y opciones de conexión
        useNewUrlParser: true, // Opción para usar el nuevo analizador de URL de mongoose
        useUnifiedTopology: true, // Opción para usar el nuevo motor de topología unificada de mongoose
      });
      logger.info("Conectado a Mongo."); // Registrar un mensaje de info en el logger indicando que se ha establecido la conexión
    } catch (error) {
      logger.error('Error al conectar a MongoDB:', error); // Registrar un mensaje de error en el logger indicando que ha ocurrido un error en la conexión
      throw new Error('No se pudo conectar a MongoDB'); // Lanzar un error indicando que no se pudo establecer la conexión a MongoDB
    }
  }

  disconnect() {
    mongoose.connection.close(() => { // Cerrar la conexión a la base de datos MongoDB utilizando la función close de mongoose
      logger.info('Desconexión de MongoDB'); // Registrar un mensaje de info en el logger indicando que se ha cerrado la conexión
      process.exit(0); // Terminar el proceso de Node.js con un código de salida 0 (indicando éxito)
    });
  }
}

