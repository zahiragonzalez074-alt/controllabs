//el controlador es una clase 
//recibe parametros y cuerpo
//se encarga de llamar al servicio(base de datos)
import { Request, Response } from 'express';

export class IncidentController {
  public static createIncident = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'El registro de novedades todavía no está implementado.'
    });
  };

  public static getIncidents = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'La consulta del historial de novedades todavía no está implementada.'
    });
  };

  public static updateIncidentStatus = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La actualización de estado de la novedad ${id} todavía no está implementada.`
    });
  };
}
