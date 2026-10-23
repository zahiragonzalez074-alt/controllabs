import { Router } from 'express';
import { environmentController } from '../controllers/environment.controller';

const router = Router();
//los parametros de consulta son opcionales
//siempre definir rutas con sustantivos en plural
//verifican que la ruta que se solicita existe para poder hacer la consulta
//cada ruta llama un metodo que debe estar definida en el contorlador
router.get('/', environmentController.getEnvironments);
router.post('/', environmentController.createEnvironment);
router.patch('/:id', environmentController.updateEnvironment);
//cada ruta se redirige al controlador

export default router;



