import minimist from 'minimist';

export default class Arguments {
  constructor() {
    const opciones = {
    alias: {
        t: 'tipo',
        p: 'port',
        m: 'mode'
      },
      default: {
        tipo: 'mongo',
        port: 8080,
        mode: 'dev'
      }
    };

    this.args = minimist(process.argv.slice(2), opciones);
  }

  getTypePersistence() {
    const tipo = this.args.tipo;

    if (tipo === 'mongo' || tipo === 'local') {
      return tipo;
    } else {
      return 'mongo'
    }
  }

  getPort(){
    const port = this.args.port;
    return port;
  }

  getMode(){
    const mode = this.args.mode;
    if (mode === 'dev' || mode === 'prod') {
      return mode;
    } else {
      return 'dev'
    }
  }
  
}
