import { ICreateUserDTO } from '../dtos/User.dto';

export interface User extends ICreateUserDTO {
  id: number;
}

export interface UserFilters {
  rol?: string;
  activo?: boolean;
}

export interface UserRepository {
  create(input: ICreateUserDTO): Promise<User>;
  findAll(filters?: UserFilters): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  update(id: number, input: Partial<ICreateUserDTO>): Promise<User | null>;
  delete(id: number): Promise<User | null>;
}
