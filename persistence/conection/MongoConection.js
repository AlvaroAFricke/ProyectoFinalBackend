import mongoose from 'mongoose';
import logger from '../../utils/logger.js';

export default class MongoConnection {
  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info("Conectado a Mongo.")
    } catch (error) {
      logger.error('Error al conectar a MongoDB:', error);
      throw new Error('No se pudo conectar a MongoDB');
    }
  }

  disconnect() {
    mongoose.connection.close(() => {
      logger.info('Desconexión de MongoDB');
      process.exit(0);
    });
  }
}

