import Mailer from '../service/nodeMailer.js'

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

        if (usuario.length == 0) {
            const newUser = {
                username,
                password,
                email,
                edad,
                telefono,
                direccion,
                carrito: await baseCarritos.crearCarrito()
            }
    
            mailer.send(newUser)
            baseUsuarios.save(newUser)
    
            logger.info("Nuevo usuario registrado.")
            return
        }
        logger.info("Usuario Existente.")
        return
    }

    renderFailRegister(req, res) {
        res.render('./forms/log/noReg');
    }
}