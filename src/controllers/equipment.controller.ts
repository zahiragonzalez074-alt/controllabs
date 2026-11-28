//el controlador es una clase 
//recibe parametros y cuerpo
//se encarga de llamar al servicio(base de datos)
import { Request, Response } from 'express';
import { equipmentService } from '../container';
import { DomainError } from '../errors/domain.error';
import { ICreateEquipmentDTO } from '../dtos/equipment.dto';

export class EquipmentController {

  public static createEquipment = async (
    req: Request<Record<string, string>, unknown, ICreateEquipmentDTO>,
    res: Response
  ): Promise<void> => {
    const equipment = await equipmentService.createEquipment(req.body);

    res.status(201).json({ success: true, data: equipment });
  };

  public static getAllEquipment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { room_id } = req.query;

    if (room_id !== undefined && typeof room_id !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro room_id debe ser un texto.'
      );
    }

    const equipment = await equipmentService.getEquipment({
      room_id
    });

    res.status(200).json({ success: true, data: equipment });
  };

  public static updateEquipment = async (
    req: Request<{ id: string }, unknown, Pick<ICreateEquipmentDTO, 'estado'>>,
    res: Response
  ): Promise<void> => {
    const equipment = await equipmentService.updateEquipment(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({ success: true, data: equipment });
  };
}
