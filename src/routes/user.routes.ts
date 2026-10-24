import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUserPayload } from '../middlewares/validateUser.middleware';

const router = Router();
//los parametros de consulta son opcionales
//siempre definir rutas con sustantivos en plural
//verifican que la ruta que se solicita existe para poder hacer la consulta
//cada ruta llama un metodo que debe estar definida en el contorlador
router.get('/', UserController.getAllUsers);
router.post('/', validateUserPayload, UserController.createUser);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser)
//cada ruta se redirige al controlador

export default router;