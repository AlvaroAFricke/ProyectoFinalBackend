import CarritoService from "../service/carritoService.js";
import ProductoService from "../service/productoService.js";

const carrService = new CarritoService();
const prodService = new ProductoService();

export default class CarritosController {

    constructor() { }

    crearCarrito(req, res) {
        const id = carrService.crearCarrito()
        res.send(id)
    }

    borrarCarrito(req, res) {
        const { idCArr } = req.params;
        carrService.eliminarCarritoPorId(idCArr)
        res.send(`Eliminar carrito con ID: ${idCArr}`);
    }

    async obtenerCarrito(req, res) {
        const {idCarr} = req.params;

        const carrito = await carrService.obtenerCarrito(idCarr)
        const prodsCarrito = carrito.productos;
        
        res.render('verCarrito', {productos:prodsCarrito});
    }


    async procesarCarrito(req, res) {
        const {idCarr} = req.params;
        const {idProd} = req.params;

        // Acceder al valor del campo oculto 'id' y realizar la acción correspondiente
        const accion = req.body.accion;
        if (accion === 'Añadir') {
            const producto = await prodService.obtenerProductoPorId(idProd)
            await carrService.agregarProducto(idCarr, producto);
            res.redirect('/api/productos')
        } else if (accion === 'Borrar') {
            await carrService.eliminarProducto(idCarr, await prodService.obtenerProductoPorId(idProd));
            res.redirect('/api/productos')
        }

    }
}

