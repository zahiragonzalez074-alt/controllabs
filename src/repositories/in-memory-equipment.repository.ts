import { ICreateEquipmentDTO } from '../dtos/equipment.dto';
import {Equipment, EquipmentFilters, EquipmentRepository} from './equipment.repository';

export class InMemoryEquipmentRepository implements EquipmentRepository {
  private readonly equipment = new Map<number, Equipment>();
  private nextId = 1;

  public async create(input: ICreateEquipmentDTO): Promise<Equipment> {
    const equipment: Equipment = {
      ...input,
      id: this.nextId++
    };

    this.equipment.set(equipment.id, equipment);
    return { ...equipment };
  }

  public async findAll(
    filters: EquipmentFilters = {}
  ): Promise<Equipment[]> {
    const equipment = Array.from(this.equipment.values());

    return equipment
      .filter((item) =>
        filters.room_id === undefined ||
        item.room_id === filters.room_id
      )
      .map((item) => ({ ...item }));
  }

  public async findById(id: number): Promise<Equipment | null> {
    const equipment = this.equipment.get(id);

    return equipment ? { ...equipment } : null;
  }

  public async update(
    id: number,
    input: Partial<ICreateEquipmentDTO>
  ): Promise<Equipment | null> {
    const equipment = this.equipment.get(id);

    if (!equipment) {
      return null;
    }

    const updatedEquipment: Equipment = {
      ...equipment,
      ...input,
      id: equipment.id
    };

    this.equipment.set(id, updatedEquipment);
    return { ...updatedEquipment };
  }
}
