import CarritoService from "../service/carritoService.js";
import ProductoService from '../service/productoService.js'
import Mailer from "../service/mensajeria/nodeMailer.js";

const carritoService = new CarritoService();
const productoService = new ProductoService();

const mailer = new Mailer();

export default class Pedido {

    constructor() { }

    // Renderiza la vista del pedido con la información del usuario y los productos en el carrito
    async renderPedido(req, res) {
        
        const usuario = req.user;
        const carrito = await carritoService.obtenerCarrito(usuario.carrito._id)
        const productos = carrito.productos

        res.render('pedido', {usuario, productos})
    }

    // Realiza la solicitud del pedido, actualiza el stock de los productos y envía correos al vendedor y al cliente
    async solicitarPedido(req, res) {
        
        const usuario = req.user
        const carrito = await carritoService.obtenerCarrito(usuario.carrito._id)
        const productos = carrito.productos

        for (let i = 0; i < productos.length; i++) {
            const idProducto = productos[i]._id;
            productos[i].stock --;
            await productoService.actualizarProducto(idProducto, productos[i])
        }

        const userEmail = usuario.email.toString()

        // Enviar correo al vendedor con la solicitud del pedido
        mailer.solicitudPedido(usuario, productos);

        // Enviar correo al cliente con el resumen del pedido
        mailer.resumenPedido(userEmail, productos);

        res.redirect('/api/pedido')

    }

}
