import fs from 'fs';
import path from 'path';

export default class ProductosFS {
    static ARCHIVO = path.join(
        path.dirname(new URL(import.meta.url).pathname), '..', '..', 'data', 'productos.txt'
    );

    constructor() {
        if (!fs.existsSync(ProductosFS.ARCHIVO) || fs.readFileSync(ProductosFS.ARCHIVO, 'utf-8').length === 0) {
            fs.writeFileSync(ProductosFS.ARCHIVO, '[]', 'utf-8');
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(ProductosFS.ARCHIVO, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Error al obtener todos los productos: ' + error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(ProductosFS.ARCHIVO, 'utf-8');
            const productos = JSON.parse(data);
            return productos.find(producto => producto.id === id) || null;
        } catch (error) {
            throw new Error(`Error al obtener el producto con id ${id}: ` + error);
        }
    }

    async save(producto) {
        try {
            const data = await fs.promises.readFile(ProductosFS.ARCHIVO, 'utf-8');
            const productos = JSON.parse(data);
            productos.push(producto);
            await fs.promises.writeFile(ProductosFS.ARCHIVO, JSON.stringify(productos), 'utf-8');
        } catch (error) {
            throw new Error('Error al guardar el producto: ' + error);
        }
    }

    async updateById(id, productoActualizado) {
        try {
            const data = await fs.promises.readFile(Local.ARCHIVO, 'utf-8');
            let productos = JSON.parse(data);
            const index = productos.findIndex(producto => producto.id === id);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...productoActualizado };
                await fs.promises.writeFile(Local.ARCHIVO, JSON.stringify(productos), 'utf-8');
                return productos[index];
            } else {
                throw new Error(`No se encontró el producto con id ${id}`);
            }
        } catch (error) {
            throw new Error(`Error al actualizar el producto con id ${id}: ` + error);
        }
    }

    async delete() {
        try {
            await fs.promises.writeFile(ProductosFS.ARCHIVO, '[]', 'utf-8');
        } catch (error) {
            throw new Error('Error al borrar todos los productos: ' + error);
        }
    }

    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(ProductosFS.ARCHIVO, 'utf-8');
            const productos = JSON.parse(data);
            const index = productos.findIndex(producto => producto.id === id);
            if (index !== -1) {
                productos.splice(index, 1);
                await fs.promises.writeFile(ProductosFS.ARCHIVO, JSON.stringify(productos), 'utf-8');
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`Error al borrar el producto con id ${id}: ` + error);
        }
    }
}
