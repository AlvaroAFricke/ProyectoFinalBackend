import fs from 'fs';
import path from 'path';
import Carrito from '../../models/Carrito.js';

function generateUniqueCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;
  let codigoUnico = '';

  // Generar un código aleatorio
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    codigoUnico += characters[randomIndex];
  }

  return codigoUnico;
}


export default class CarritoFS {
  static ARCHIVO = path.join(
    path.dirname(new URL(import.meta.url).pathname), '..', '..', 'data', 'carritos.txt'
  );

  constructor() {
    if (!fs.existsSync(CarritoFS.ARCHIVO) || fs.readFileSync(CarritoFS.ARCHIVO, 'utf-8').length === 0) {
      fs.writeFileSync(CarritoFS.ARCHIVO, '[]', 'utf-8');
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
      const carritos = JSON.parse(data);
      return carritos.find(carrito => carrito._id === id) || null;
    } catch (error) {
      throw new Error(`Error al obtener el carrito con id ${id}: ` + error);
    }
  }  

  async save(carrito) {
    try {
      if (!carrito) {
        // Si el carrito es nulo, crea un nuevo carrito
        const codigoUnico = generateUniqueCode(); // Generar un código único
        const nuevoCarrito = new Carrito(codigoUnico, new Date(), []);
        const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
        const carritos = JSON.parse(data);
        carritos.push(nuevoCarrito);
        await fs.promises.writeFile(CarritoFS.ARCHIVO, JSON.stringify(carritos), 'utf-8');
        return nuevoCarrito;
      } else {
        // Si el carrito no es nulo, busca el carrito por su id
        const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
        const carritos = JSON.parse(data);
        const carritoIndex = carritos.findIndex(c => c._id === carrito.id);
        if (carritoIndex !== -1) {
          // Si se encuentra el carrito por su id, se actualiza
          carritos[carritoIndex] = carrito;
          await fs.promises.writeFile(CarritoFS.ARCHIVO, JSON.stringify(carritos), 'utf-8');
          return carrito;
        } else {
          throw new Error('No se encontró el carrito con el id proporcionado');
        }
      }
    } catch (error) {
      throw new Error('Error al guardar el carrito: ' + error);
    }
  }


  async updateCarrito(idCarrito, carritoActualizado) {
    try {
      const data = await fs.promises.readFile(CarritoFS.ARCHIVO, 'utf-8');
      const carritos = JSON.parse(data);
      const index = carritos.findIndex(carrito => carrito._id === idCarrito);
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
      const index = carritos.findIndex(carrito => carrito._id === id);
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
