import express from 'express';
const router = express.Router();
import pool from '../database/db.js'; 
import Ropa from '../database/query.js'; 

const ropaModel = new Ropa(pool);


router.get('/ropa', async (req, res) => {
    try {
        const ropa = await ropaModel.getProductos();
        res.json(ropa);
    } catch (error) {
        console.error('Error al obtener ropa:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.get('/ropa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const ropa = await ropaModel.getProductosById(id);
        if (ropa.length === 0) {
            res.status(404).send('Ropa no encontrada');
        } else {
            res.json(ropa[0]);
        }
    } catch (error) {
        console.error('Error al obtener ropa por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/ropa', async (req, res) => {
    const { nombre, categoria, talla, color } = req.body;
    try {
        const result = await ropaModel.addProductos(nombre, categoria, talla, color);
        res.status(201).send(`ropa agregado con ID: ${result.insertId}`);
    } catch (error) {
        console.error('Error al agregar ropa:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.put('/ropaUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, talla, color } = req.body;
    try {
        const result = await ropaModel.updateProductos(id, nombre, categoria, talla, color);
        if (result.affectedRows === 0) {
            res.status(404).send('Ropa no encontrado');
        } else {
            res.send(`Ropa con ID ${id} actualizado`);
        }
    } catch (error) {
        console.error('Error al actualizar ropa:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/ropaDelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ropaModel.deleteProductos(id);
        if (result.affectedRows === 0) {
            res.status(404).send('Ropa no encontrada');
        } else {
            res.send(`Ropa con ID ${id} eliminado`);
        }
    } catch (error) {
        console.error('Error al eliminar Ropa:', error);
        res.status(500).send('Error en el servidor');
    }
});

export default router;
