//el controlador es una clase 
//recibe parametros y cuerpo
//se encarga de llamar al servicio(base de datos)
import { Request, Response } from 'express';
import { incidentService } from '../container';
import { DomainError } from '../errors/domain.error';
import { ICreateIncidentDTO } from '../dtos/incident.dto';

export class IncidentController {

  public static createIncident = async (
    req: Request<Record<string, string>, unknown, ICreateIncidentDTO>,
    res: Response
  ): Promise<void> => {
    const incident = await incidentService.createIncident(req.body);

    res.status(201).json({ success: true, data: incident });
  };

  public static getIncidents = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { equipment_id, estado } = req.query;

    if (equipment_id !== undefined && typeof equipment_id !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro equipment_id debe ser un texto.'
      );
    }

    if (estado !== undefined && typeof estado !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado debe ser un texto.'
      );
    }

    const incidents = await incidentService.getIncidents({
      equipment_id,
      estado
    });

    res.status(200).json({ success: true, data: incidents });
  };

  public static updateIncidentStatus = async (
    req: Request<{ id: string }, unknown, Pick<ICreateIncidentDTO, 'estado'>>,
    res: Response
  ): Promise<void> => {
    const incident = await incidentService.updateIncidentStatus(
      Number(req.params.id),
      req.body.estado
    );

    res.status(200).json({ success: true, data: incident });
  };
}
