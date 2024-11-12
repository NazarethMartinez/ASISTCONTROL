const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Asegúrate de que User sea el modelo correcto

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Asegúrate de que la clave secreta esté en .env
        const user = await User.findById(decoded.id);  // Verificar que el usuario existe

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        req.user = user;  // Asocia al usuario autenticado con la solicitud
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({ message: 'No autorizado', error: error.message });
    }
};

module.exports = authenticate;
