import ProductoService from "../service/productoService.js";

const prodService = new ProductoService()

export default class ProductosRoutes {

    constructor() { }

    async cargarProducto(req, res) {
        res.render('./forms/productos/formProducto')
    }

    async buscarNombre(req, res) {
        const buscado = req.query.buscado;
        if (!buscado || buscado.trim() === '') {
            res.redirect('/api/productos');
            return;
        }

        try {
            const producto = await prodService.buscarPorNombre(buscado);
            if (producto) {
                res.render('index', { usuario: req.user, productos: [producto] });
            } else {
                res.redirect('/api/productos');
            }
        } catch (error) {
            res.redirect('/api/productos');
        }
    }

    async obtenerProductos(req, res) {
        try {
            const usuario = req.user;
            const id = req.params.id;
            let productos;

            if (id) {
                const producto = await prodService.obtenerProductoPorId(id);
                if (producto) {
                    productos = [producto];
                } else {
                    throw new Error('Producto no encontrado');
                }
            } else {
                productos = await prodService.obtenerProductos();
            }

            res.render('index', { usuario: usuario, productos }); // Renderizar la vista y pasar los datos
        } catch (error) {
            // Manejo de errores
            res.status(500).send('Error interno del servidor');
        }
    }
    

    // Controlador para guardar un nuevo producto
    async guardarProducto(req, res) {
        try {
            // Validar que los datos del cuerpo de la solicitud sean válidos
            const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;

            // Realizar validación de datos aquí, por ejemplo, utilizando Joi o validaciones manuales

            // Crear una nueva instancia del modelo Producto con los datos validados
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
            // Manejo de errores específicos
            if (error instanceof ValidationError) {
                // En caso de error de validación
                res.status(400).json({
                    mensaje: 'Error de validación',
                    error: error.details.map(detail => detail.message)
                });
            } else {
                // En caso de otros errores
                console.error('Error al registrar el producto:', error);
                res.status(500).json({
                    mensaje: 'Error al registrar el producto',
                    error: error.message
                });
            }
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

