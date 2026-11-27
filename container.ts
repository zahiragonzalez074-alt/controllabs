import { InMemoryLoanRepository } from './src/repositories/in-memory-loan.repository';
import { InMemoryUserRepository } from './src/repositories/in-memory-user.repository';
import { InMemoryEnvironmentRepository } from './src/repositories/in-memory-environment.repository';
import { InMemoryEquipmentRepository } from './src/repositories/in-memory-equipment.repository';
import { InMemoryIncidentRepository } from './src/repositories/in-memory-incident.repository';

import { LoanService } from './src/services/loan.service';
import { UserService } from './src/services/user.service';
import { EnvironmentService } from './src/services/environment.service';
import { EquipmentService } from './src/services/equipment.service';
import { IncidentService } from './src/services/incident.service';

const loanRepository = new InMemoryLoanRepository();
const userRepository = new InMemoryUserRepository();
const environmentRepository = new InMemoryEnvironmentRepository();
const equipmentRepository = new InMemoryEquipmentRepository();
const incidentRepository = new InMemoryIncidentRepository();

export const loanService = new LoanService(loanRepository);
export const userService = new UserService(userRepository);
export const environmentService = new EnvironmentService(environmentRepository);
export const equipmentService = new EquipmentService(equipmentRepository);
export const incidentService = new IncidentService(incidentRepository);
