import { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller';
import { validateEquipmentPayload } from '../middlewares/validateEquipment.middleware';

const router = Router();
//los parametros de consulta son opcionales
//siempre definir rutas con sustantivos en plural
//verifican que la ruta que se solicita existe para poder hacer la consulta
//cada ruta llama un metodo que debe estar definida en el contorlador
router.post('/', validateEquipmentPayload, EquipmentController.createEquipment);
router.get('/', EquipmentController.getAllEquipment);
router.patch('/:id', EquipmentController.updateEquipment);

export default router;
