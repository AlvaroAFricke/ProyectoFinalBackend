import cluster from 'cluster';
import os from 'os';
import Server from './setting.js';
import Args from '../utils/args.js'
import logger from '../utils/logger.js';

export default class ClusterServer {
    constructor() {
        this.numCores = os.cpus().length;
    }

    start() {
        const args = new Args();
        if (args.getMode() === 'prod') {
            if (cluster.isMaster) {
                // Crear un proceso hijo por cada núcleo del sistema
                for (let i = 0; i < this.numCores; i++) {
                    cluster.fork();
                }

                // Escuchar eventos de la muerte de los procesos hijos
                cluster.on('exit', (worker) => {
                    logger.info(`Proceso hijo ${worker.process.pid} ha muerto`);
                    // Crear un nuevo proceso hijo para reemplazar el que ha muerto
                    cluster.fork();
                });
            } else {
                // Este es el proceso hijo que manejará las solicitudes HTTP
                const peticion = new Server();
                peticion.start();
            }
        } else if (args.getMode() === 'dev') {
            // Unica instancia del Servidor (Modo development)
            const peticion = new Server();
            peticion.start();
        }
    }
}



