//Clase Producto para el uso Local
export default class Producto {
  constructor(id, time, nombre, descripcion, codigo, imagen, precio, stock) {
    this.id = id;
    this.time = time;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.imagen = imagen;
    this.precio = precio;
    this.stock = stock;
  }
}

