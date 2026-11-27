import { ICreateEnvironmentDTO } from '../dtos/environment.dto';
import { DomainError } from '../errors/domain.error';
import {Environment, EnvironmentFilters, EnvironmentRepository} from '../repositories/environment.repository';

export class EnvironmentService {
  constructor(
    private readonly environmentRepository: EnvironmentRepository
  ) {}

  public async createEnvironment(
    input: ICreateEnvironmentDTO
  ): Promise<Environment> {
    return this.environmentRepository.create(input);
  }

  public async getEnvironments(
    filters: EnvironmentFilters = {}
  ): Promise<Environment[]> {
    return this.environmentRepository.findAll(filters);
  }

  public async getEnvironmentDetail(
    id: number
  ): Promise<Environment> {
    this.validateId(id);

    const environment = await this.environmentRepository.findById(id);

    if (!environment) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un ambiente con identificador ${id}.`
      );
    }

    return environment;
  }

  public async updateEnvironment(
    id: number,
    input: Partial<ICreateEnvironmentDTO>
  ): Promise<Environment> {
    this.validateId(id);

    const updatedEnvironment =
      await this.environmentRepository.update(id, input);

    if (!updatedEnvironment) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un ambiente con identificador ${id}.`
      );
    }

    return updatedEnvironment;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del ambiente debe ser un entero positivo.'
      );
    }
  }
}
