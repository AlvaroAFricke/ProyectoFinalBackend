// Importar los módulos necesarios
import express from 'express';
import dotenv from 'dotenv';
import Args from '../utils/args.js';

import ProductosRoutes from '../routes/productos.js';
import CarritosRoutes from '../routes/carritos.js';


// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una clase para el servidor Express
export default class Server {
  constructor() {
    this.app = express();
    this.port = new Args().getPort() || process.env.PORT || 8080;
    this.setupMiddlewares();
    this.setupRoutes();
  }

  setupMiddlewares() {
    // Configurar middlewares:
    // this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: false }));
  }

  setupRoutes() {
    // Configurar rutas:

    const productosRoutes = new ProductosRoutes();
    this.app.use('/api/productos', productosRoutes.router);

    const carritosRoutes = new CarritosRoutes();
    this.app.use('/api/carrito', carritosRoutes.router);

    // this.app.get('/', (req, res) => {
    //   res.send('Hola, mundo!');
    // });
    // this.app.post('/api/usuarios', (req, res) => {
    //   // Manejar la lógica de la ruta aquí
    // });



    // Configurar el motor de plantillas EJS
    this.app.set('view engine', 'ejs');
    this.app.set('views', new URL('./views', import.meta.url).pathname);

  }

  start() {
    // Iniciar el servidor
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

