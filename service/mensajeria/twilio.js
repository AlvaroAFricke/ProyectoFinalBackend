//pruebacoder97@gmail.com
//prueba97codercoder

import twilio from 'twilio'
import logger from '../../utils/logger';

const configuracion = {
    accountSid: 'TU_ACCOUNT_SID',
    authToken: 'TU_AUTH_TOKEN',
    phoneNumber: 'TU_NUMERO_DE_TELEFONO_TWILIO'
};

export default class Twilio {

    constructor() {
        this.client = twilio(configuracion.accountSid, configuracion.authToken);
    }

    // Enviar el mensaje de texto
    enviarMensaje(to, data) {
        client.messages.create({
            body: 'Su pedido de MiApp esta en camino, ' + JSON.stringify(data),
            from: configuracion.phoneNumber, // Número de teléfono Twilio
            to: to // Número de teléfono de destino
        })
        .then(message => {
            logger.info('Mensaje enviado con SID:', message.sid);
        })
        .catch(error => {
            logger.error('Error al enviar el mensaje:', error);
        });
    }
}