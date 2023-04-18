// Imports
import express from 'express';
import { initPassport } from '../controllers/authController.js';

//Variables externas
import dotenv from 'dotenv';
import Args from '../utils/args.js';

//Rutas
import ProductosRoutes from '../routes/productos.js';
import CarritosRoutes from '../routes/carritos.js';
import LoggueoRoutes from '../routes/loggeo.js'
import NotFound from '../routes/notFound.js'

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una clase para el servidor Express
export default class Server {
  constructor() {
    this.app = express();
    this.port = new Args().getPort() || process.env.PORT || 8080;
    this.setupMiddlewares();
    this.setupRoutes()
  }

  setupMiddlewares() {
    // Configurar middlewares:
    this.app.use(express.json()); // Para analizar datos del cuerpo en formato JSON
    this.app.use(express.urlencoded({ extended: true })); // Para analizar datos del cuerpo en formato de formulario

    const passConf = new initPassport();
    passConf.setConfig(this.app);

  }

  setupRoutes() {
    // Configurar rutas:

    const productosRoutes = new ProductosRoutes();
    this.app.use('/api/productos', productosRoutes.router);

    const carritosRoutes = new CarritosRoutes();
    this.app.use('/api/carrito', carritosRoutes.router);

    const loggsRoutes = new LoggueoRoutes();
    this.app.use('/', loggsRoutes.router)

    const notFound = new NotFound();
    this.app.use(notFound.router)

    // Configurar el motor de plantillas EJS
    this.app.set('view engine', 'ejs');
    this.app.set('views', new URL('../views', import.meta.url).pathname);

  }

  start() {
    // Iniciar el servidor
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

