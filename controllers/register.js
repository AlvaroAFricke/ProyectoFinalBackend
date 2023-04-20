import Mailer from '../service/mensajeria/nodeMailer.js';
import bcrypt from 'bcrypt';
import logger from "../utils/logger.js";
import MongoUsuarios from "../persistence/dao/mongo/usuariosMongo.js";

const mailer = new Mailer();
const baseUsuarios = new MongoUsuarios();

export default class Register {
    constructor() { }

    // Controlador para renderizar la página de registro
    renderRegister(req, res) {
        res.render('./forms/log/registro');
    }

    // Controlador para el registro de un nuevo usuario
    async register(req, res) {
        const { email, password, username, direccion, edad, telefono } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const usuario = await baseUsuarios.getByEmail(email);
        if (!usuario) {
            // Generar el hash de la contraseña
            const saltRounds = 10; // Número de rondas de sal para la generación del hash
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = {
                username,
                password: hashedPassword,
                email,
                edad,
                telefono,
                direccion,
                carrito: null
            };

            // Enviar correo de confirmación
            mailer.mensajeRegistro(newUser);

            // Guardar el nuevo usuario en la base de datos
            baseUsuarios.save(newUser);

            logger.info("Nuevo usuario registrado.");
            res.redirect('/login'); // Redirigir a la página de inicio de sesión
        } else {
            logger.info("Usuario existente.");
            res.redirect('/failregister'); // Redirigir a la página de registro fallido
        }
    }

    // Controlador para renderizar la página de registro fallido
    renderFailRegister(req, res) {
        res.render('./forms/log/noReg');
    }
}
