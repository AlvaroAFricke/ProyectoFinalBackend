import ProductoService from "../service/productoService.js";

const prodService = new ProductoService()

//Quitar
import DBUser from '../persistence/dao/mongo/usuariosMongo.js'
//

const dbUsuarios = new DBUser();

export default class ProductosRoutes {

    constructor() { }

    async obtenerProductos(req, res) {
        const id = req.params.id;
        if (id) {
            const producto = await prodService.obtenerProductoPorId(id)
            res.render('index', {usuario: usuario, productos: [producto] }); // Renderizar la vista y pasar los datos
        } else {
            const productos = await prodService.obtenerProductos()
            const usuario = await dbUsuarios.getById("6440675c2358525e5c1d9e08")
            res.render('index', { usuario, productos }); // Renderizar la vista y pasar los datos
        }
    }

    // Controlador para guardar un nuevo producto
    async guardarProducto(req, res) {
        try {

            const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;

            // Crea una nueva instancia del modelo Producto con los datos del cuerpo de la solicitud
            const nuevoProducto = {
                nombre,
                descripcion,
                time: new Date(),
                codigo,
                imagen,
                precio,
                stock
            };

            await prodService.guardarProducto(nuevoProducto);

            // Envía la respuesta al cliente
            res.redirect('/api/productos');

        } catch (error) {
            // Manejo de errores
            console.error('Error al registrar el producto:', error);
            res.status(500).json({
                mensaje: 'Error al registrar el producto',
                error: error.message
            });
        }
    };


    // Función para manejar la ruta PUT
    async actualizarProducto(req, res) {

        /**Revisar */
        
        try {

            const { id } = req.params

            const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;

            const actualizado = {
                nombre,
                descripcion,
                time: new Date(),
                codigo,
                imagen,
                precio,
                stock
            };

            await prodService.actualizarProducto(id, actualizado);

            // Envía la respuesta al cliente
            res.redirect('/api/productos');

        } catch (error) {
            // Manejo de errores
            console.error('Error al registrar el producto:', error);
            res.status(500).json({
                mensaje: 'Error al registrar el producto',
                error: error.message
            });
        }
    }

    // Función para manejar la ruta DELETE
    async borrarProdutos(req, res) {
        const { id } = req.params;
        if (id) {
            await prodService.eliminarProductoPorId(id)
            const productos = await prodService.obtenerProductos()
            res.render('index', { productos }); // Renderizar la vista y pasar los datos
        } else {
            const productos = await prodService.eliminarProductos()
            res.render('index', { productos: productos })
        }
    }

}

