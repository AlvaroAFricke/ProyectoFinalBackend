import productoFS from '../dao/fileSystem/productoFS.js'
import productosMongo from '../dao/mongo/productosMongo.js'

class FactoryProductos {
    constructor(data){
        if (FactoryProductos.instance) {
            return FactoryProductos.instance;
        }
        if(data == 'local'){
            FactoryProductos.instance = new productoFS();
        }
        if(data == 'mongo'){
            FactoryProductos.instance = new productosMongo();
        }
        return FactoryProductos.instance;
    }
}

export default FactoryProductos;
