import { ICreateEnvironmentDTO } from '../dtos/environment.dto';
import {Environment,EnvironmentFilters,EnvironmentRepository} from './environment.repository';

export class InMemoryEnvironmentRepository implements EnvironmentRepository {
  private readonly environments = new Map<number, Environment>();
  private nextId = 1;

  public async create(input: ICreateEnvironmentDTO): Promise<Environment> {
    const environment: Environment = {
      ...input,
      id: this.nextId++
    };

    this.environments.set(environment.id, environment);
    return { ...environment };
  }

  public async findAll(
    filters: EnvironmentFilters = {}
  ): Promise<Environment[]> {
    const environments = Array.from(this.environments.values());

    return environments
      .filter((environment) =>
        filters.bloque === undefined ||
        environment.bloque === filters.bloque
      )
      .filter((environment) =>
        filters.estado === undefined ||
        environment.estado === filters.estado
      )
      .map((environment) => ({ ...environment }));
  }

  public async findById(id: number): Promise<Environment | null> {
    const environment = this.environments.get(id);

    return environment ? { ...environment } : null;
  }

  public async update(
    id: number,
    input: Partial<ICreateEnvironmentDTO>
  ): Promise<Environment | null> {
    const environment = this.environments.get(id);

    if (!environment) {
      return null;
    }

    const updatedEnvironment: Environment = {
      ...environment,
      ...input,
      id: environment.id
    };

    this.environments.set(id, updatedEnvironment);
    return { ...updatedEnvironment };
  }
}
