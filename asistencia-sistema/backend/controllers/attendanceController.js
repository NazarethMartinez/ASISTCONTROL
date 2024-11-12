// routes/attendanceRoutes.js
const express = require('express');
const Attendance = require('../models/attendanceModel'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Endpoint para registrar asistencia
router.post('/register', async (req, res) => {
    const { location, fullName, shift, attendanceStatus, observations } = req.body;

    try {
        const attendanceRecord = new Attendance({
            location,
            fullName,
            shift,
            attendanceStatus,
            observations
        });

        await attendanceRecord.save();
        res.status(201).json({ message: 'Asistencia registrada correctamente', attendanceRecord });
    } catch (error) {
        console.error('Error al registrar la asistencia:', error);
        res.status(500).json({ message: 'Error al registrar la asistencia', error });
    }
});

module.exports = router;
