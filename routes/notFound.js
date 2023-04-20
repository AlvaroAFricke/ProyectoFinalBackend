import express from 'express';

export default class Routes {
  constructor() {
    // Crear una instancia del enrutador de Express
    this.router = express.Router();
    //Rutas

    this.router.get('/', (req, res) =>{
      res.redirect('/api/productos');
    })

    this.router.get('/*', (req, res) => {
        res.render('./404/notFound');
    });
  }
}
