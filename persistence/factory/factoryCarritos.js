/**
 * Imports para uso Local
 */

import carritoFS from '../dao/fileSystem/carritoFS.js'

/**
 * Imports para uso Mongo
*/

import carritoMongo from '../dao/mongo/carritoMongo.js'

// Creación del Singleton
let instance = null;

export default class FactoryCarrito {
    constructor(data){
        if(instance){
            return instance; // Si ya existe una instancia, retornarla
        }

        if(data === 'local'){
            instance = new carritoFS(); // Crear instancia de carritoFS
        }
        else if(data === 'mongo'){
            instance = new carritoMongo(); // Crear instancia de carritoMongo
        }
        else {
            throw new Error('Tipo de base de datos no soportada'); // Lanzar error si se proporciona un tipo de base de datos no soportado
        }

        return instance; // Retornar la instancia creada
    }
}
