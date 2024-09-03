import crypto from 'crypto';
class Ropa {
    constructor(database) {
        this.database = database;
    }

    async getProductos() {
        const query = 'SELECT * FROM productos_de_ropa';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getProductos:', err);
            throw err;
        }
    }

    async getProductosById(id) {
        const query = 'SELECT * FROM productos_de_ropa WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getProductosById:', err);
            throw err;
        }
    }

    async deleteProductos(id) {
        const query = 'DELETE FROM productos_de_ropa WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteProducto:', err);
            throw err;
        }
    }

    async updateProductos(id, nombre, categoria, talla, color) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(nombre, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE productos_de_ropa SET nombre = ?, categoria = ?, talla = ? , color = ? WHERE id = ?';
            const [result] = await this.database.query(query, [`${salt}:${hash}`,categoria, talla, color, id]);
            return result;
        } catch (err) {
            console.error('Error en updateProducto:', err);
            throw err;
        }
    }

    async addProductos(nombre, categoria, talla, color) {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(nombre, salt, 1000, 64, 'sha512').toString('hex'); 

        try {
            const query = 'INSERT INTO productos_de_ropa (nombre, categoria, talla, color) VALUES (?, ?, ?, ?)';
            const [result] = await this.database.query(query, [`${salt}:${hash}`, categoria, talla, color,]);
            return result;
        } catch (err) {
            console.error('Error en addProducto:', err);
            throw err;
        }
    }
}

export default Ropa;
