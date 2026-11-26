import { ICreateEquipmentDTO } from '../dtos/equipment.dto';

export interface Equipment extends ICreateEquipmentDTO {
  id: number;
}

export interface EquipmentFilters {
  room_id?: string;
}

export interface EquipmentRepository {
  create(input: ICreateEquipmentDTO): Promise<Equipment>;
  findAll(filters?: EquipmentFilters): Promise<Equipment[]>;
  findById(id: number): Promise<Equipment | null>;
  update(
    id: number,
    input: Partial<ICreateEquipmentDTO>
  ): Promise<Equipment | null>;
}
