import mongoose from 'mongoose';

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
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      process.exit(1);
    }
  }

  disconnect() {
    mongoose.connection.close(() => {
      console.log('Desconexión de MongoDB');
      process.exit(0);
    });
  }
}
