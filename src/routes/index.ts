 import { Router } from 'express';
import loanRoutes from './loan.routes';
import UserRoutes from './user.routes';
import EnvironmentRoutes from './environment.routes';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/users', UserRoutes);
router.use('/environment', EnvironmentRoutes);
export default router;