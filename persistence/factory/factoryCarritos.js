/**
 * Imports para uso Local
 */

import carritoFS from '../dao/fileSystem/carritoFS.js'

/**
 * Imports para uso Mongo
*/

import carritoMongo from '../dao/mongo/carritoMongo.js'

export default class FactoryCarrito {
    constructor(data){
        if(data == 'local'){
            return new carritoFS()
        }
        if(data == 'mongo'){
            return new carritoMongo()
        }
    }
}