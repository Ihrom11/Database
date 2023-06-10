// medicine_details.js
const express = require('express');
const router = express.Router();
const db = require('./database');

// Mendapatkan semua detail obat
router.get('/', (req, res) => {
    const query = 'SELECT * FROM medicine_details';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server ' });
        } else {
            res.json(results);
        }
    });
});

// Mendapatkan detail obat berdasarkan ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM medicine_details WHERE id = ?';
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

// Membuat detail obat baru
router.post('/', (req, res) => {
    const { mdc_name, mdc_desc, mdc_img, disease1_id, disease2_id, disease3_id } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const query = 'INSERT INTO medicine_details (mdc_name, mdc_desc, mdc_img, disease1_id, disease2_id, disease3_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [mdc_name, mdc_desc, mdc_img, disease1_id, disease2_id, disease3_id, createdAt, updatedAt], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server ' });
        } else {
            res.json({ message: 'Data berhasil ditambahkan', id: results.insertId });
        }
    });
});

// Mengubah detail obat berdasarkan ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { mdc_name, mdc_desc, mdc_img, disease1_id, disease2_id, disease3_id } = req.body;
    const updatedAt = new Date();
    const query = 'UPDATE medicine_details SET mdc_name = ?, mdc_desc = ?, mdc_img = ?, disease1_id = ?, disease2_id = ?, disease3_id = ?, updatedAt = ? WHERE id = ?';
    db.query(query, [mdc_name, mdc_desc, mdc_img, disease1_id, disease2_id, disease3_id, updatedAt, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server ' });
        } else {
            res.json({ message: 'Data berhasil diperbarui' });
        }
    });
});

// Menghapus detail obat berdasarkan ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM medicine_details WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server' });
        } else {
            res.json({ message: 'Data berhasil dihapus' });
        }
    });
});
module.exports = router;