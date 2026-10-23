 import { Router } from 'express';
import loanRoutes from './loan.routes';
import UserRoutes from './user.routes';
import EnvironmentRoutes from './environment.routes';
import EquipmentRoutes  from './environment.routes';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/users', UserRoutes);
router.use('/environment', EnvironmentRoutes);
router.use('/equipment', EquipmentRoutes)

export default router;