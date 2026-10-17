 import { Router } from 'express';
import loanRoutes from './loan.routes';
import UserRoutes from './user.routes';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/users', UserRoutes);

export default router;