import Mailer from '../service/nodeMailer.js'
import bcrypt from 'bcrypt'

import logger from "../utils/logger.js"

import MongoUsuarios from "../persistence/dao/mongo/usuariosMongo.js";
import CarritoService from '../service/carritoService.js';

const mailer = new Mailer();
const baseUsuarios = new MongoUsuarios();
const baseCarritos = new CarritoService();

export default class Register {
    constructor() { }
    //Registro
    renderRegister(req, res) {
        res.render('./forms/log/registro');
    }

    async register(req, res) {

        /**Crearle un carrito al usuario */
        const { email } = req.body
        const { password } = req.body
        const { username } = req.body
        const { direccion } = req.body
        const { edad } = req.body
        const { telefono } = req.body

        const usuario = await baseUsuarios.getByEmail(email)

        // Generar el hash de la contraseña
        const saltRounds = 10; // Número de rondas de sal para la generación del hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        if (!usuario) {
            const newUser = {
                username,
                password: hashedPassword,
                email,
                edad,
                telefono,
                direccion,
                carrito: await baseCarritos.crearCarrito()
            }

            mailer.send(newUser)
            baseUsuarios.save(newUser)

            logger.info("Nuevo usuario registrado.")
            res.redirect('/login')
            return
        }
        logger.info("Usuario Existente.")
        res.redirect('/failregister')
        return
    }

    renderFailRegister(req, res) {
        res.render('./forms/log/noReg');
    }
}