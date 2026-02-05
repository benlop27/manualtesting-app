 
const express = require('express'); 
const router = express.Router();

const controladorUsuarios = require('./Controladores/Usuarios');
 
router.use('/usuarios', controladorUsuarios);


module.exports = router;