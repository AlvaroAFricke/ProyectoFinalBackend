// Imports
import express from 'express';
import session from 'express-session';

//Variables externas
import dotenv from 'dotenv';
import Args from '../utils/args.js';

//Passport
import passport from '../service/passport/passport.js'

//Rutas
import ProductosRoutes from '../routes/productos.js';
import CarritosRoutes from '../routes/carritos.js';
import Login from '../routes/log/login.js'
import Register from '../routes/log/register.js';
import Pedido from '../routes/pedido.js'
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

    this.app.use(session({
      secret: 'mi-secreto', // Secreto para firmar la sesión
      resave: false, // No guardar la sesión en cada petición
      saveUninitialized: false // No guardar sesiones vacías
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

  }

  setupRoutes() {

    // Configurar rutas:
    const productosRoutes = new ProductosRoutes();
    this.app.use('/api/productos', productosRoutes.router);

    const carritosRoutes = new CarritosRoutes();
    this.app.use('/api/carrito', carritosRoutes.router);

    const login = new Login();
    this.app.use('/', login.router)

    const register = new Register();
    this.app.use('/', register.router)

    const pedido = new Pedido();
    this.app.use('/api/pedido', pedido.router);

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

