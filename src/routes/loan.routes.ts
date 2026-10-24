//archivo de enrutamiento
import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';
import { validateLoanPayload } from '../middlewares/validateLoan.middleware';

const router = Router();
//los parametros de consulta son opcionales
//siempre definir rutas con sustantivos en plural
//verifican que la ruta que se solicita existe para poder hacer la consulta
//cada ruta llama un metodo que debe estar definida en el contorlador
router.get('/search', LoanController.getLoansByFilter);
router.post('/', validateLoanPayload, LoanController.createLoan);
router.put('/:id/accept', LoanController.acceptLoanInventory);
router.get('/:id', LoanController.getLoanById);
//cada ruta se redirige al controlador

export default router;