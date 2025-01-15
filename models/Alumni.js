// Import konfigurasi database
const db = require("../config/db");

// Membuat class Alumni sebagai representasi model data
class Alumni {
  // Method untuk mendapatkan semua data alumni
  static all() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM alumni", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Method untuk menambahkan data alumni baru
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      db.query("INSERT INTO alumni SET ?", data, (err, results) => {
        if (err) reject(err);
        resolve(results.insertId); // Ambil ID yang baru ditambahkan
      });
    });
    return this.find(id); // Cari data berdasarkan ID untuk dikembalikan
  }

  // Method untuk memperbarui data alumni berdasarkan ID
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      db.query("UPDATE alumni SET ? WHERE id = ?", [data, id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
    return this.find(id); // Cari data setelah diperbarui
  }

  // Method untuk menghapus data alumni berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM alumni WHERE id = ?", id, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  // Method untuk mendapatkan data alumni berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM alumni WHERE id = ?", id, (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Ambil data pertama
      });
    });
  }

  // Method untuk mencari alumni berdasarkan nama
  static search(name) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM alumni WHERE nama LIKE ?", `%${name}%`, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Method untuk mendapatkan data alumni berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM alumni WHERE status = ?", status, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

// Ekspor class Alumni untuk digunakan di file lain
module.exports = Alumni;
