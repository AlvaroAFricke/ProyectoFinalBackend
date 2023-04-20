import fs from 'fs';
import path from 'path';
import Carrito from '../../models/Carrito.js';

export default class CarritoFS {
  static ARCHIVO = path.join(
    path.dirname(new URL(import.meta.url).pathname), '..', '..', 'data', 'carritos.txt'
  );

  constructor() {
    if (!fs.existsSync(CarritoFS.ARCHIVO) || fs.readFileSync(CarritoFS.ARCHIVO, 'utf-8').length === 0) {
      fs.writeFileSync(CarritoFS.ARCHIVO, '[]', 'utf-8');
    }
  }

  async create() {
    const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
    const carritos = JSON.parse(data);
    carritos.push(new Carrito(Math.random ,new Date()));
    await fs.promises.writeFile(CarritoFS.ARCHIVO, JSON.stringify(carritos), 'utf-8');
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
      const carritos = JSON.parse(data);
      return carritos.find(carrito => carrito.id === id) || null;
    } catch (error) {
      throw new Error(`Error al obtener el carrito con id ${id}: ` + error);
    }
  }

  async save(carrito) {
    try {
      const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
      const carritos = JSON.parse(data);
      carritos.push(carrito);
      await fs.promises.writeFile(CarritoFS.ARCHIVO, JSON.stringify(carritos), 'utf-8');
    } catch (error) {
      throw new Error('Error al guardar el carrito: ' + error);
    }
  }

  async updateCarrito(idCarrito, carritoActualizado) {
    try {
      const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
      const carritos = JSON.parse(data);
      const index = carritos.findIndex(carrito => carrito.id === idCarrito);
      if (index !== -1) {
        carritos[index] = { ...carritos[index], ...carritoActualizado };
        await fs.promises.writeFile(CarritoFS.ARCHIVO, JSON.stringify(carritos), 'utf-8');
        return carritos[index];
      } else {
        throw new Error(`No se encontró el carrito con id ${idCarrito}`);
      }
    } catch (error) {
      throw new Error(`Error al actualizar el carrito con id ${idCarrito}: ` + error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
      const carritos = JSON.parse(data);
      const index = carritos.findIndex(carrito => carrito.id === id);
      if (index !== -1) {
        carritos.splice(index, 1);
        await fs.promises.writeFile(CarritoFS.ARCHIVO, JSON.stringify(carritos), 'utf-8');
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Error al borrar el carrito con id ${id}: ` + error);
    }
  }
}
