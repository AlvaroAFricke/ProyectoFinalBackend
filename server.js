//Importacion de la Configuracion del Servidor
import ClusterServer from './server/cluster.js'

// Crear una instancia de la clase ClusterServer y comenzar el servidor
const clusterServer = new ClusterServer();
clusterServer.start();