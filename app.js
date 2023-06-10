// app.js
const express = require('express');
const app = express();
const diseaseDetailsRouter = require('./disease_details');
const medicineDetailsRouter = require('./medicine_details');

// Middleware untuk membaca body dari request
app.use(express.json());

// Menggunakan router untuk rute disease_details
app.use('/disease_details', diseaseDetailsRouter);

// Menggunakan router untuk rute medicine_details
app.use('/medicine_details', medicineDetailsRouter);

// Menjalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
})