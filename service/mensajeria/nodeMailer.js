//----Email----//

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

/**
 * email: pruebacoder97@gmail.com
 * pass: prueba97coder
 */

const MAIL_ADDRESS = process.env.MAIL_ADDRESS
const MAIL_PASS = process.env.MAIL_PASS

export default class Mailer{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:MAIL_ADDRESS,
                pass:MAIL_PASS
            }
        })
    }

    async mensajeRegistro(data) {
        await this.transporter.sendMail({
            from: 'MiApp',
            to: MAIL_ADDRESS,
            subject: 'Nuevo Registro',
            text: 'Un nuevo usuario se registro en la App:: ' + JSON.stringify(data)
        });
    }

    async solicitudPedido(user, data) {
        await this.transporter.sendMail({
            from: 'MiApp',
            to: MAIL_ADDRESS,
            subject: 'Pedido',
            text: 'El usuario ' + JSON.stringify(user) + ' realizo un pedido:: ' + JSON.stringify(data)
        })
    }

    async resumenPedido(userEmail, data) {
        await this.transporter.sendMail({
            from: MAIL_ADDRESS,
            to: userEmail,
            subject: 'TuPedido de MiApp',
            text: 'Gracias por realizanos un pedido, esta en camino. Pedido:: ' + JSON.stringify(data)
        })
    }

}



