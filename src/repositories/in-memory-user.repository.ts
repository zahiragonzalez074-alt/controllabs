import { ICreateUserDTO } from '../dtos/User.dto';
import {
  User,
  UserFilters,
  UserRepository
} from './user.repository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<number, User>();
  private nextId = 1;

  public async create(input: ICreateUserDTO): Promise<User> {
    const user: User = {
      ...input,
      id: this.nextId++
    };

    this.users.set(user.id, user);
    return { ...user };
  }

  public async findAll(filters: UserFilters = {}): Promise<User[]> {
    const users = Array.from(this.users.values());

    return users
      .filter((user) =>
        filters.rol === undefined || user.rol === filters.rol
      )
      .filter((user) =>
        filters.activo === undefined || user.activo === filters.activo
      )
      .map((user) => ({ ...user }));
  }

  public async findById(id: number): Promise<User | null> {
    const user = this.users.get(id);
    return user ? { ...user } : null;
  }

  public async update(
    id: number,
    input: Partial<ICreateUserDTO>
  ): Promise<User | null> {
    const user = this.users.get(id);

    if (!user) {
      return null;
    }

    const updatedUser: User = {
      ...user,
      ...input,
      id: user.id
    };

    this.users.set(id, updatedUser);
    return { ...updatedUser };
  }

  public async delete(id: number): Promise<User | null> {
    const user = this.users.get(id);

    if (!user) {
      return null;
    }

    const updatedUser: User = {
      ...user,
      activo: false
    };

    this.users.set(id, updatedUser);
    return { ...updatedUser };
  }
}
