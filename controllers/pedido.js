import CarritoService from "../service/carritoService.js";
import ProducoService from '../service/productoService.js'
import Mailer from "../service/mensajeria/nodeMailer.js";

const carritoService = new CarritoService();
const productoService = new ProducoService();

const mailer = new Mailer();

export default class Pedido {

    constructor() { }

    async renderPedido(req, res) {
        
        const usuario = req.user;
        const carrito = await carritoService.obtenerCarrito(usuario.carrito._id)
        const productos = carrito.productos

        res.render('pedido', {usuario, productos})
    }

    async solicitarPedido(req, res) {

        /**
         * Enviar los mensajes a el admin y al user via mail 
         */

        const usuario = req.user
        const carrito = await carritoService.obtenerCarrito(usuario.carrito._id)
        const productos = carrito.productos

        for (let i = 0; i < productos.length; i++) {
            const idProducto = productos[i]._id;
            productos[i].stock --;
            await productoService.actualizarProducto(idProducto, productos[i])
        }

        const userEmail = usuario.email.toString()

        //Al Vendedor
        mailer.solicitudPedido(usuario, productos);

        //Al Cliente
        mailer.resumenPedido(userEmail, productos);

        res.redirect('/api/pedido')

    }

}

