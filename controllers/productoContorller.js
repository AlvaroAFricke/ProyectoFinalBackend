import ProductoService from "../service/productoService.js";

const prodService = new ProductoService()

export default class ProductosRoutes {
   
    constructor() {}

    async obtenerProductos(req, res) {
        const id = req.params.id;
        if (id) {
            const producto = await prodService.obtenerProductoPorId(id)
            res.render('index', { productos : [producto] }); // Renderizar la vista y pasar los datos
        } else {
            const productos = await prodService.obtenerProductos()  
            res.render('index', { productos }); // Renderizar la vista y pasar los datos
        }
    }

    // Función para manejar la ruta POST
    guardarProducto(req, res) {
        // Lógica para manejar la creación de un recurso
        res.send('Crear recurso');
    }

    // Función para manejar la ruta PUT
    actualizarProducto(req, res) {
        const { id } = req.params;
        // Lógica para manejar la actualización de un recurso con ID
        res.send(`Actualizar recurso con ID: ${id}`);
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
            res.render('index', {productos: productos})
        }
    }

}

