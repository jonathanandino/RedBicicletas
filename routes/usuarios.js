var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuarios')

/* GET users listing. */
router.get('/',usuariosController.list);
router.get('/create',usuariosController.create_get);
router.post('/create',usuariosController.create);
router.get('/:id/update',usuariosController.update_get);
router.post('/:id/update',usuariosController.update);
router.post('/:id/delete',usuariosController.delete);

module.exports = router;
