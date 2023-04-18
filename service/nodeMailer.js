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

    async send(data) {
        const result = await transporter.sendMail({
            from: 'MiApp',
            to: MAIL_ADDRESS,
            subject: 'Nuevo Registro',
            text: 'Gracias por registrarte en MiApp' + JSON.stringify(data)
        });
    }

}



