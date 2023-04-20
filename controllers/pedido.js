import CarritoService from "../service/carritoService.js";

const carritoService = new CarritoService();

export default class Pedido {

    constructor() { }

    async renderPedido(req, res) {
        
        const usuario = req.user;
        const carrito = await carritoService.obtenerCarrito(usuario.carrito._id);
        const productos = carrito.productos;

        res.render('pedidoCompletado', {usuario, productos})
    }

    async solicitarPedido(req, res) {

        /**
         * Enviar los mensajes a el admin y al user via mail y wpp vaciar el carrito del user
         */

            

        const {productos} = req.params
        res.redirect('/api/pedido', {productos})
    }

}

