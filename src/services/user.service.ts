import { ICreateUserDTO } from '../dtos/User.dto';
import { DomainError } from '../errors/domain.error';
import {User, UserFilters, UserRepository} from '../repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(input: ICreateUserDTO): Promise<User> {
    return this.userRepository.create(input);
  }

  public async getUsers(filters: UserFilters = {}): Promise<User[]> {
    return this.userRepository.findAll(filters);
  }

  public async getUserDetail(id: number): Promise<User> {
    this.validateId(id);

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }

    return user;
  }

  public async updateUser(
    id: number,
    input: Partial<ICreateUserDTO>
  ): Promise<User> {
    this.validateId(id);

    const updatedUser = await this.userRepository.update(id, input);

    if (!updatedUser) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }

    return updatedUser;
  }

  public async deleteUser(id: number): Promise<User> {
    this.validateId(id);

    const deletedUser = await this.userRepository.delete(id);

    if (!deletedUser) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }

    return deletedUser;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del usuario debe ser un entero positivo.'
      );
    }
  }
}
