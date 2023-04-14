/**
 * Imports para uso Local
 */

import productoFS from '../dao/fileSystem/productoFS.js'

/**
 * Imports para uso Mongo
*/

import productosMongo from '../dao/mongo/productosMongo.js'

export default class FactoryProductos {
    constructor(data){
        if(data == 'local'){
            return new productoFS()
        }
        if(data == 'mongo'){
            return new productosMongo()
        }
    }
}