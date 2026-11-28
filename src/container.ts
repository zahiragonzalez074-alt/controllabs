import { InMemoryLoanRepository } from './repositories/in-memory-loan.repository';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { InMemoryEnvironmentRepository } from './repositories/in-memory-environment.repository';
import { InMemoryEquipmentRepository } from './repositories/in-memory-equipment.repository';
import { InMemoryIncidentRepository } from './repositories/in-memory-incident.repository';

import { LoanService } from './services/loan.service';
import { UserService } from './services/user.service';
import { EnvironmentService } from './services/environment.service';
import { EquipmentService } from './services/equipment.service';
import { IncidentService } from './services/incident.service';

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
