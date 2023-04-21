# FinalBackendFrickeAlvaro

Este es el proyecto final del curso de backend del bootcamp de CODERHOUSE.

## Instalación

1. Descarga o clona el repositorio desde GitHub: https://github.com/AlvaroAFricke/ProyectoFinalBackend
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta el comando `npm i` para instalar todas las dependencias.
4. Si no tienes Node.js y npm instalados en tu máquina, descárgalos desde https://nodejs.org/es/download.

## Configuración

El archivo `.env` contiene las variables de entorno necesarias para la configuración del proyecto.
Asegúrate de configurar correctamente las siguientes variables:

MONGODB_URI=<Uri a MongoDB>
PORT=<Puerto de escucha>
MODE=<Modo de ejecusion -- prod -- dev (def) -->
MAIL_ADDRESS=pruebacoder97@gmail.com
MAIL_PASS=zmqxzagaxqpygusn

## Base de datos

El proyecto utiliza MongoDB a través de Mongo Atlas como base de datos.
También se proporciona la opción de usar una base de datos en el sistema de archivos en caso de no querer utilizar MongoDB.

## Uso

Para iniciar el servidor, ejecuta el comando `nodemon start` en una terminal en la carpeta raíz del proyecto.
La aplicación estará disponible en http://localhost:8080, por defecto. 

### Parametros 

    -t: 'tipo'
    -p: 'port'
    -m: 'mode'

## Contribuciones

Este proyecto fue desarrollado por Alvaro Fricke como parte del curso de backend de CODERHOUSE. Si deseas contribuir, siéntete libre de enviar un pull request.

## Estructura del Proyecto

El proyecto sigue una estructura organizada en varias capas, incluyendo:

- `/persistencia`: Carpeta que contiene los módulos para la persistencia de datos, ya sea mediante MongoDB o el sistema de archivos.
- `/service`: Carpeta que contiene los módulos para acceder a la base de datos y realizar operaciones de negocio.
- `/controllers`: Carpeta que contiene los controladores para el manejo de los endpoints y la lógica de negocio.
- `/rutas`: Carpeta que contiene las definiciones de rutas para la API.
- `/server`: Carpeta que contiene las configuraciones y opciones del servidor.

A continuación, se proporciona una breve explicación de cada una de las capas y su propósito en la aplicación:

- `/persistencia`: En esta capa se encuentra la lógica relacionada con la persistencia de datos. Puede incluir módulos para interactuar con una base de datos MongoDB, un sistema de archivos local u otra forma de almacenamiento de datos, dependiendo de la opción de persistencia seleccionada.
- `/service`: Esta capa se encarga de acceder a la base de datos y realizar operaciones de negocio, como la validación de datos, el procesamiento de información y la ejecución de lógica de negocio específica.
- `/controller`: En esta capa se encuentran los controladores para el manejo de los endpoints de la API. Los controladores se encargan de recibir las solicitudes HTTP, procesarlas y coordinar la ejecución de la lógica de negocio correspondiente.
- `/routes`: Aquí se definen las rutas para la API, especificando los endpoints disponibles, los métodos HTTP permitidos y los controladores asociados a cada ruta.
- `/server`: En esta capa se encuentran las configuraciones, opciones del servidor y otros ajustes específicos de la aplicación.

## Rutas

### Carrito

Las siguientes son las rutas relacionadas con la funcionalidad del carrito:

- `GET /`: Esta ruta asigna un carrito al usuario autenticado. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `asignarCarrito` del controlador `userService`. La función asigna un carrito al usuario y redirige a `/api/productos` en la respuesta.

- `GET /:idCarr`: Esta ruta obtiene los detalles del carrito con el ID especificado. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `obtenerCarrito` del controlador `carrService`. La función obtiene los productos del carrito con el ID especificado y renderiza la vista 'verCarrito' con los productos en la respuesta.

- `POST /:idCarr/producto/:idProd`: Esta ruta permite agregar un producto al carrito con el ID de carrito y el ID de producto especificados. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `procesarCarrito` del controlador `carrService`. La función obtiene el producto con el ID especificado, lo agrega al carrito con el ID de carrito especificado, y redirige a `/api/productos` en la respuesta.

- `DELETE /:idCarr/producto/:idProd`: Esta ruta permite eliminar un producto del carrito con el ID de carrito y el ID de producto especificados. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `procesarCarrito` del controlador `carrService`. La función obtiene el producto con el ID especificado, lo elimina del carrito con el ID de carrito especificado, y redirige a `/api/productos` en la respuesta.

## Productos

#### Carga, Actualización y Borrado

Las siguientes son las rutas relacionadas con la carga, actualización y borrado de productos:

- `GET /gestionarProductos`: Esta ruta permite cargar un nuevo producto. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `cargarProducto` del controlador `productosController`. La función carga un nuevo producto y renderiza una vista o redirige a la página adecuada en la respuesta.

- `PUT /:id?`: Esta ruta permite actualizar un producto con el ID especificado. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `actualizarProducto` del controlador `productosController`. La función actualiza el producto con el ID especificado y redirige a la página adecuada en la respuesta.

- `DELETE /:id?`: Esta ruta permite eliminar un producto con el ID especificado o por nombre. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `borrarPorNombre` del controlador `productosController`. La función elimina el producto con el ID o nombre especificado y redirige a la página adecuada en la respuesta.

- `POST /`: Esta ruta permite guardar un nuevo producto. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `guardarProducto` del controlador `productosController`. La función guarda un nuevo producto y redirige a la página adecuada en la respuesta.

#### Vista

Las siguientes son las rutas relacionadas con la visualización de productos:

- `GET /buscarProducto/:buscado`: Esta ruta permite buscar productos por nombre. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `buscarNombre` del controlador `productosController`. La función busca productos por el nombre especificado y renderiza la vista adecuada con los resultados en la respuesta.

- `GET /:id?`: Esta ruta obtiene los detalles de un producto con el ID especificado o muestra todos los productos si no se especifica un ID. Se requiere autenticación para acceder a esta ruta. El controlador encargado de esta ruta es `obtenerProductos` del controlador `productosController`. La función obtiene los productos con el ID especificado o todos los productos y renderiza la vista adecuada con los resultados en la respuesta.

Ten en cuenta que esta es solo una descripción básica de las rutas y los controladores asociados a cada una. Puedes agregar más detalles o información adicional, como los parámetros que se esperan en cada ruta, las respuestas que se obtienen, y cualquier otra información relevante para entender cómo funciona la funcionalidad de productos en tu aplicación.

## Rutas de Registro

Las siguientes son las rutas disponibles para el registro de usuarios en tu aplicación:

### Renderizar vista de registro

- Método: `GET`
- Ruta: `/register`
- Descripción: Renderiza la vista de registro para que los usuarios puedan registrarse en la aplicación.

### Registrar usuario

- Método: `POST`
- Ruta: `/register`
- Descripción: Registra un nuevo usuario en la base de datos con la información proporcionada en el formulario de registro.

### Renderizar vista de registro fallido

- Método: `GET`
- Ruta: `/failregister`
- Descripción: Renderiza la vista de registro fallido, que se muestra cuando ocurre un error durante el proceso de registro.

Estas son las rutas disponibles para el registro de usuarios en tu aplicación. Cada ruta tiene su respectivo método HTTP, ruta y descripción para que los desarrolladores puedan entender y utilizar correctamente estas rutas en su aplicación.


## Rutas de Login

Las siguientes son las rutas disponibles para el inicio de sesión de usuarios en tu aplicación:

### Iniciar sesión

- Método: `POST`
- Ruta: `/login`
- Descripción: Permite a los usuarios iniciar sesión en la aplicación con sus credenciales de usuario.

### Cerrar sesión

- Método: `GET`
- Ruta: `/logout`
- Descripción: Cierra la sesión del usuario actualmente autenticado en la aplicación.

### Renderizar vista de inicio de sesión

- Método: `GET`
- Ruta: `/login`
- Descripción: Renderiza la vista de inicio de sesión para que los usuarios puedan ingresar sus credenciales y acceder a la aplicación.

### Renderizar vista de inicio de sesión fallido

- Método: `GET`
- Ruta: `/faillogin`
- Descripción: Renderiza la vista de inicio de sesión fallido, que se muestra cuando ocurre un error durante el proceso de inicio de sesión.

Estas son las rutas disponibles para el inicio de sesión de usuarios en tu aplicación. Cada ruta tiene su respectivo método HTTP, ruta y descripción para que los desarrolladores puedan entender y utilizar correctamente estas rutas en su aplicación.

## Rutas del Pedido

Las siguientes son las rutas disponibles para la gestión de pedidos en tu aplicación:

### Renderizar vista de pedidos

- Método: `GET`
- Ruta: `/`
- Middleware: `isAuthenticated`
- Descripción: Renderiza la vista de pedidos para que los usuarios puedan ver los pedidos realizados.

### Solicitar un nuevo pedido

- Método: `POST`
- Ruta: `/`
- Middleware: `isAuthenticated`
- Descripción: Permite a los usuarios solicitar un nuevo pedido en la aplicación.

Estas son las rutas disponibles para la gestión de pedidos en tu aplicación. Cada ruta tiene su respectivo método HTTP, ruta, middleware y descripción para que los desarrolladores puedan entender y utilizar correctamente estas rutas en su aplicación. El middleware `isAuthenticated` se utiliza para asegurar que el usuario esté autenticado antes de acceder a estas rutas.

## Tecnologías Utilizadas

    - express

    - bcrypt
    - ejs
    - log4js
    - minimist
    - passport

    - mongoose
    - fs

    - nodemailer
    - twilio


## Licencia

Este proyecto no contiene Licencias.

## Contacto

Alvaro Andras Fricke
alvaroafricke@gmail.com



