export default class Pedido {

    constructor() { }

    async renderPedido(req, res) {

        /**
         * para renderizar se necesita, usuario y la lista de productos que la tomo de usuario.carr
         */
        
        res.render('pedidoCompletado', {productos})
    }

    async solicitarPedido(req, res) {

        /**
         * Enviar los mensajes a el admin y al user via mail y wpp vaciar el carrito del user
         */

            

        const {productos} = req.params
        res.redirect('/api/pedido', {productos})
    }

}

