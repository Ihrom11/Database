// disease_details.js
const express = require('express');
const router = express.Router();
const db = require('./database');

// Mendapatkan semua detail penyakit
router.get('/', (req, res) => {
    const query = 'SELECT * FROM disease_details';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server' });
        } else {
            res.json(results);
        }
    });
});

// Mendapatkan detail penyakit berdasarkan ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM disease_details WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server ' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Data tidak ditemukan' });
        } else {
            res.json(results[0]);
        }
    });
});

// Membuat detail penyakit baru
router.post('/', (req, res) => {
    const { dss_name, dss_desc, dss_img } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = 'INSERT INTO disease_details (dss_name, dss_desc, dss_img, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [dss_name, dss_desc, dss_img, createdAt, updatedAt], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server' });
        } else {
            res.json({ message: 'Data berhasil ditambahkan', id: results.insertId });
        }
    });
});

// Mengubah detail penyakit berdasarkan ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { dss_name, dss_desc, dss_img } = req.body;
    const updatedAt = new Date();
    const query = 'UPDATE disease_details, SET dss_name = ?, dss_desc = ?, dss_imf = ?, updatedAt = ? WHERE id = ?';
    db.query(query, [dss_name, dss_desc, dss_img, updatedAt, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server' });
        } else {
            res.json({ message: 'Data berhasil diperbarui' });
        }
    });
});

// Menghapus detail penyakit berdasarkan ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM disease_details WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server' });
        } else {
            res.json({ message: 'Data berhasil dihapus' })
        }
    });
});
module.exports = router;