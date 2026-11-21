import { ICreateEnvironmentDTO } from '../dtos/environment.dto';

export interface Environment extends ICreateEnvironmentDTO {
  id: number;
}

export interface EnvironmentFilters {
  bloque?: string;
  estado?: string;
}

export interface EnvironmentRepository {
  create(input: ICreateEnvironmentDTO): Promise<Environment>;
  findAll(filters?: EnvironmentFilters): Promise<Environment[]>;
  findById(id: number): Promise<Environment | null>;
  update(
    id: number,
    input: Partial<ICreateEnvironmentDTO>
  ): Promise<Environment | null>;
}
