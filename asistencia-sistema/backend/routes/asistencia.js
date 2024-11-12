// routes/asistencia.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance'); // Asegúrate de que la ruta sea correcta

// Ruta para registrar asistencia
router.post('/register', async (req, res) => {
    try {
        const attendanceRecord = new Attendance(req.body);
        await attendanceRecord.save();
        res.status(201).json({
            message: "Asistencia registrada correctamente",
            attendanceRecord
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al registrar asistencia",
            error: error.message
        });
    }
});

// Ruta para obtener todas las asistencias
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

module.exports = router; 