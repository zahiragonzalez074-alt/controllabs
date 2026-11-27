import { ICreateIncidentDTO } from '../dtos/incident.dto';
import { DomainError } from '../errors/domain.error';
import {Incident, IncidentFilters, IncidentRepository} from '../repositories/incident.repository';

export class IncidentService {
  constructor(
    private readonly incidentRepository: IncidentRepository
  ) {}

  public async createIncident(
    input: ICreateIncidentDTO
  ): Promise<Incident> {
    return this.incidentRepository.create(input);
  }

  public async getIncidents(
    filters: IncidentFilters = {}
  ): Promise<Incident[]> {
    return this.incidentRepository.findAll(filters);
  }

  public async getIncidentDetail(
    id: number
  ): Promise<Incident> {
    this.validateId(id);

    const incident = await this.incidentRepository.findById(id);

    if (!incident) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe una novedad con identificador ${id}.`
      );
    }

    return incident;
  }

  public async updateIncidentStatus(
    id: number,
    estado: string
  ): Promise<Incident> {
    this.validateId(id);

    if (typeof estado !== 'string' || !estado.trim()) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El estado de la novedad es obligatorio.'
      );
    }

    const updatedIncident =
      await this.incidentRepository.updateStatus(id, estado);

    if (!updatedIncident) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe una novedad con identificador ${id}.`
      );
    }

    return updatedIncident;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador de la novedad debe ser un entero positivo.'
      );
    }
  }
}
