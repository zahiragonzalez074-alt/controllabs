import { ICreateIncidentDTO } from '../dtos/incident.dto';
import {Incident, IncidentFilters, IncidentRepository} from './incident.repository';

export class InMemoryIncidentRepository implements IncidentRepository {
  private readonly incidents = new Map<number, Incident>();
  private nextId = 1;

  public async create(input: ICreateIncidentDTO): Promise<Incident> {
    const incident: Incident = {
      ...input,
      id: this.nextId++
    };

    this.incidents.set(incident.id, incident);
    return { ...incident };
  }

  public async findAll(
    filters: IncidentFilters = {}
  ): Promise<Incident[]> {
    const incidents = Array.from(this.incidents.values());

    return incidents
      .filter((incident) =>
        filters.equipment_id === undefined ||
        incident.equipment_id === filters.equipment_id
      )
      .filter((incident) =>
        filters.estado === undefined ||
        incident.estado === filters.estado
      )
      .map((incident) => ({ ...incident }));
  }

  public async findById(id: number): Promise<Incident | null> {
    const incident = this.incidents.get(id);

    return incident ? { ...incident } : null;
  }

  public async updateStatus(
    id: number,
    estado: string
  ): Promise<Incident | null> {
    const incident = this.incidents.get(id);

    if (!incident) {
      return null;
    }

    const updatedIncident: Incident = {
      ...incident,
      estado
    };

    this.incidents.set(id, updatedIncident);
    return { ...updatedIncident };
  }
}
