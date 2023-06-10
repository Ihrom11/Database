// databes.js
const mysql = require('mysql');

// Buat koneksi ke database
const connection = mysql.createConnection({
    host: 'localhost', //ubah sesuai localhost
    user: 'username', //ubah sesuai username
    password: 'password', //ubah sesuai password
    database: 'database_name', //ubah sesuai database_name
});

// Lakukan koneksi ke database
connection.connect((err) => {
    if (err) throw err;
    console.log('Terhubung ke database MySQL');
});

// Ekspor objek koneksi agar dapat digunakan pada file lain
module.exports = connection;