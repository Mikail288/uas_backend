// Import AlumniController
const AlumniController = require("../controllers/AlumniController");

// Import express untuk membuat routing
const express = require("express");
const router = express.Router();

// Routing utama (home route)
router.get("/", (req, res) => res.send("Hello Alumni API Express"));

// Routing untuk resource Alumni
router.get("/alumni", AlumniController.index); // Mendapatkan semua data alumni
router.post("/alumni", AlumniController.store); // Menambahkan data alumni baru
router.put("/alumni/:id", AlumniController.update); // Memperbarui data alumni berdasarkan ID
router.delete("/alumni/:id", AlumniController.destroy); // Menghapus data alumni berdasarkan ID
router.get("/alumni/:id", AlumniController.find); // Mendapatkan data detail alumni berdasarkan ID
router.get("/alumni/search/:name", AlumniController.search); // Mencari alumni berdasarkan nama
router.get("/alumni/status/fresh-graduate", AlumniController.freshGraduate); // Mendapatkan alumni fresh graduate
router.get("/alumni/status/employed", AlumniController.employed); // Mendapatkan alumni yang bekerja
router.get("/alumni/status/unemployed", AlumniController.unemployed); // Mendapatkan alumni yang tidak bekerja

// Ekspor router untuk digunakan di aplikasi utama
module.exports = router;
