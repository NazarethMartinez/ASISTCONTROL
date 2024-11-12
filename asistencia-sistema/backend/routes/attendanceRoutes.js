const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance'); 
const authenticate = require('../middleware/authenticate');

//router.use(authenticate); // Middleware para autenticar todas las rutas en este router

// Ruta para registrar asistencia
router.post('/', authenticate, async (req, res) => {
    const { location, fullName, shift, attendanceStatus, observations } = req.body;
    const { sede } = req.user; 
    try {
        const supervisor = req.user._id;
        const attendance = new Attendance({
            location,
            fullName,
            shift,
            attendanceStatus,
            observations,
            supervisor,
            sede
        });

        await attendance.save();
        res.status(201).json({ message: 'Asistencia registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar asistencia:', error);  
        res.status(500).json({ message: 'Error al registrar asistencia', error: error.message });
    }
});


// Ruta para obtener las asistencias del supervisor autenticado
router.get('/', authenticate, async (req, res) => {
    const supervisorId = req.user._id;

    try {
        // Filtra por el supervisor autenticado
        const attendances = await Attendance.find({ supervisor: supervisorId });
        res.json(attendances);
    } catch (error) {
        console.error("Error al obtener registros de asistencia:", error);
        res.status(500).json({ message: 'Error al obtener los registros de asistencia', error: error.message });
    }
});

module.exports = router; 
