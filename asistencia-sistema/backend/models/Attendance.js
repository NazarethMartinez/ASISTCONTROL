const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    location: { type: String, required: true },
    fullName: { type: String, required: true },
    shift: { type: String, required: true },
    attendanceStatus: { type: String, required: true },
    observations: { type: String },
    supervisor: { type: String, required: true },  // Supervisor que registró la asistencia
    location: { type: String, required: true }         // Sede del trabajador
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
