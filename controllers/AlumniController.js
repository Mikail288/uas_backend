// Import Model Alumni
const Alumni = require("../models/Alumni");

// Import express-validator untuk memvalidasi data
const { validationResult } = require("express-validator");

// Membuat class AlumniController untuk mengelola logika bisnis terkait Alumni
class AlumniController {
  // Method untuk mendapatkan semua data alumni
  async index(req, res) {
    // Mengambil semua data alumni dari model
    const alumni = await Alumni.all();
    
    // Jika data kosong, kirimkan respons dengan pesan "Data is empty"
    if (!alumni || alumni.length === 0) {
      return res.status(200).json({ message: "Data is empty", data: [] });
    }

    // Jika data ditemukan, kirimkan respons dengan data alumni
    res.status(200).json({ message: "Get All Resource", data: alumni });
  }

  // Method untuk menambahkan data baru
  async store(req, res) {
    // Validasi data input menggunakan express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid data", errors: errors.array() });
    }

    // Jika validasi berhasil, panggil model untuk menambahkan data
    const alumni = await Alumni.create(req.body);

    // Kirimkan respons berhasil
    res.status(201).json({ message: "Resource added successfully", data: alumni });
  }

  // Method untuk mengupdate data alumni berdasarkan ID
  async update(req, res) {
    const { id } = req.params; // Ambil ID dari parameter URL
    
    // Cari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);
    if (!alumni) {
      // Jika data tidak ditemukan, kirimkan respons 404
      return res.status(404).json({ message: "Resource not found" });
    }

    // Jika data ditemukan, perbarui data menggunakan model
    const updated = await Alumni.update(id, req.body);
    res.status(200).json({ message: "Resource updated successfully", data: updated });
  }

  // Method untuk menghapus data alumni berdasarkan ID
  async destroy(req, res) {
    const { id } = req.params; // Ambil ID dari parameter URL
    
    // Cari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);
    if (!alumni) {
      // Jika data tidak ditemukan, kirimkan respons 404
      return res.status(404).json({ message: "Resource not found" });
    }

    // Jika data ditemukan, hapus data menggunakan model
    await Alumni.delete(id);
    res.status(200).json({ message: "Resource deleted successfully" });
  }

  // Method untuk mendapatkan data detail alumni berdasarkan ID
  async find(req, res) {
    const { id } = req.params; // Ambil ID dari parameter URL
    
    // Cari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);
    if (!alumni) {
      // Jika data tidak ditemukan, kirimkan respons 404
      return res.status(404).json({ message: "Resource not found" });
    }

    // Kirimkan respons dengan data detail
    res.status(200).json({ message: "Get Detail Resource", data: alumni });
  }

  // Method untuk mencari alumni berdasarkan nama
  async search(req, res) {
    const { name } = req.params; // Ambil nama dari parameter URL
    
    // Cari alumni menggunakan keyword nama
    const alumni = await Alumni.search(name);
    if (!alumni || alumni.length === 0) {
      // Jika tidak ada hasil, kirimkan respons 404
      return res.status(404).json({ message: "No results found" });
    }

    // Kirimkan respons dengan data hasil pencarian
    res.status(200).json({ message: "Search results", data: alumni });
  }

  // Method untuk mendapatkan data alumni fresh graduate
  async freshGraduate(req, res) {
    // Cari alumni dengan status fresh graduate
    const alumni = await Alumni.findByStatus("freshGraduate");
    res.status(200).json({ message: "Fresh Graduates", data: alumni });
  }

  // Method untuk mendapatkan data alumni yang bekerja (employed)
  async employed(req, res) {
    // Cari alumni dengan status employed
    const alumni = await Alumni.findByStatus("employed");
    res.status(200).json({ message: "Employed Alumni", data: alumni });
  }

  // Method untuk mendapatkan data alumni yang tidak bekerja (unemployed)
  async unemployed(req, res) {
    // Cari alumni dengan status unemployed
    const alumni = await Alumni.findByStatus("unemployed");
    res.status(200).json({ message: "Unemployed Alumni", data: alumni });
  }
}

// Ekspor instance dari AlumniController
module.exports = new AlumniController();
