import CarritoService from "../service/carritoService.js";
import ProductoService from "../service/productoService.js";
import UsuariosMongo from "../persistence/dao/mongo/usuariosMongo.js";

const carrService = new CarritoService();
const prodService = new ProductoService();
const userService = new UsuariosMongo();

export default class CarritosController {

    constructor() { }

    // Asigna un carrito al usuario
    async asignarCarrito(req, res) {
        const usuario = await userService.getById(req.user._id)
        usuario.carrito = await carrService.crearCarrito();
        await userService.update(req.user._id, usuario)
        res.redirect('/api/productos')
    }

    // Obtiene los productos de un carrito y los renderiza en una vista
    async obtenerCarrito(req, res) {
        const { idCarr } = req.params;
        
        const carrito = await carrService.obtenerCarrito(idCarr)
        const prodsCarrito = carrito.productos;

        res.render('verCarrito', { productos: prodsCarrito });
    }

    // Procesa la acción del usuario en el carrito (añadir o borrar producto)
    async procesarCarrito(req, res) {
        const { idCarr } = req.params;
        const { idProd } = req.params;

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
