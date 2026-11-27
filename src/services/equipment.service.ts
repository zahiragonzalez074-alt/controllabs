import { ICreateEquipmentDTO } from '../dtos/equipment.dto';
import { DomainError } from '../errors/domain.error';
import {Equipment, EquipmentFilters, EquipmentRepository} from '../repositories/equipment.repository';

export class EquipmentService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository
  ) {}

  public async createEquipment(
    input: ICreateEquipmentDTO
  ): Promise<Equipment> {
    return this.equipmentRepository.create(input);
  }

  public async getEquipment(
    filters: EquipmentFilters = {}
  ): Promise<Equipment[]> {
    return this.equipmentRepository.findAll(filters);
  }

  public async getEquipmentDetail(
    id: number
  ): Promise<Equipment> {
    this.validateId(id);

    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un equipo con identificador ${id}.`
      );
    }

    return equipment;
  }

  public async updateEquipment(
    id: number,
    input: Pick<ICreateEquipmentDTO, 'estado'>
  ): Promise<Equipment> {
    this.validateId(id);

    if (typeof input.estado !== 'string' || !input.estado.trim()) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El estado del equipo es obligatorio.'
      );
    }

    const updatedEquipment =
      await this.equipmentRepository.update(id, {
        estado: input.estado
      });

    if (!updatedEquipment) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un equipo con identificador ${id}.`
      );
    }

    return updatedEquipment;
  }

  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del equipo debe ser un entero positivo.'
      );
    }
  }
}
