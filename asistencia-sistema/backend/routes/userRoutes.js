const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate'); 
const router = express.Router();

// Ruta para registrar usuario (sin autenticación)
router.post('/register', async (req, res) => {
    const { firstName, lastName, password, location } = req.body;

    try {
        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            password: hashedPassword, // Guarda la contraseña encriptada
            location
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
});

router.post('/login', async (req, res) => {
    const { firstName, password } = req.body;
    try {
        // Busca el usuario por su nombre
        const user = await User.findOne({ firstName });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        console.log('Usuario encontrado:', user);

        // Compara la contraseña ingresada con la almacenada
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        console.log('Contraseña correcta');

        // Genera el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                location: user.location
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
});

module.exports = router;
