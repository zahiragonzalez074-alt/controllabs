import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
//los parametros de consulta son opcionales
//siempre definir rutas con sustantivos en plural
//verifican que la ruta que se solicita existe para poder hacer la consulta
//cada ruta llama un metodo que debe estar definida en el contorlador
router.get('/search', UserController.getUsersByFilter);
router.post('/', UserController.createUser);
router.put('/:id/accept', UserController.acceptUserInventory);
router.get('/:id', UserController.getUserById);
router.patch('/', UserController.changesUserpassword);
router.patch('/:id/status',UserController.ChangeUserStatus)
//cada ruta se redirige al controlador

export default router;