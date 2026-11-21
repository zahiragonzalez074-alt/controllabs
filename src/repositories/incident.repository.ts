import { ICreateIncidentDTO } from '../dtos/incident.dto';

export interface Incident extends ICreateIncidentDTO {
  id: number;
}

export interface IncidentFilters {
  equipment_id?: string;
  estado?: string;
}

export interface IncidentRepository {
  create(input: ICreateIncidentDTO): Promise<Incident>;
  findAll(filters?: IncidentFilters): Promise<Incident[]>;
  findById(id: number): Promise<Incident | null>;
  updateStatus(
    id: number,
    estado: string
  ): Promise<Incident | null>;
}
