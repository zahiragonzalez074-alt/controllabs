//el controlador es una clase 
//recibe parametros y cuerpo
//se encarga de llamar al servicio(base de datos)
import { Request, Response } from 'express';
import { environmentService } from '../container';
import { DomainError } from '../errors/domain.error';
import { ICreateEnvironmentDTO } from '../dtos/environment.dto';

export class environmentController {

  public static getEnvironments = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { bloque, estado } = req.query;

    if (bloque !== undefined && typeof bloque !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro bloque debe ser un texto.'
      );
    }

    if (estado !== undefined && typeof estado !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro estado debe ser un texto.'
      );
    }

    const environments = await environmentService.getEnvironments({
      bloque,
      estado
    });

    res.status(200).json({ success: true, data: environments });
  };

  public static createEnvironment = async (
    req: Request<Record<string, string>, unknown, ICreateEnvironmentDTO>,
    res: Response
  ): Promise<void> => {
    const environment = await environmentService.createEnvironment(req.body);

    res.status(201).json({ success: true, data: environment });
  };

  public static updateEnvironment = async (
    req: Request<{ id: string }, unknown, Partial<ICreateEnvironmentDTO>>,
    res: Response
  ): Promise<void> => {
    const environment = await environmentService.updateEnvironment(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({ success: true, data: environment });
  };
}