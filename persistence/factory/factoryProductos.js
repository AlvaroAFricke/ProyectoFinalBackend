// Importar los módulos necesarios
import productoFS from '../dao/fileSystem/productoFS.js';
import productosMongo from '../dao/mongo/productosMongo.js';

class FactoryProductos {
    constructor(data) {
        // Implementación de patrón Singleton
        if (FactoryProductos.instance) {
            return FactoryProductos.instance;
        }

        // Seleccionar la implementación de productoFS o productosMongo en base al valor de 'data'
        if (data === 'local') {
            FactoryProductos.instance = new productoFS();
        } else if (data === 'mongo') {
            FactoryProductos.instance = new productosMongo();
        } else {
            // Manejar caso en que 'data' no es un valor válido
            console.error('Error: Valor inválido para "data" en FactoryProductos');
        }

        return FactoryProductos.instance;
    }
}

export default FactoryProductos;
