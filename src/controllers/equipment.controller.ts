
//el controlador es una clase 
//recibe parametros y cuerpo
//se encarga de llamar al servicio(base de datos)
import { Request, Response } from 'express';

export class EquipmentController {
    //Registrar un nuevo equipo vinculado a un ambiente de laboratorio.
  public static createEquipment = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'El registro de equipos todavía no está implementado.'
    });
  };

    //Listar todos los equipos existentes o filtrar aquellos asignados a un ambiente específico.
  public static getAllEquipment = (req: Request, res: Response): void => {
    const { id_ambiente } = req.query;

    if (id_ambiente) {
      res.status(501).json({
        success: false,
        message: `La consulta de equipos del ambiente ${id_ambiente} todavía no está implementada.`
      });
      return;
    }

    res.status(501).json({
      success: false,
      message: 'La consulta de todos los equipos todavía no está implementada.'
    });
  };
  
  //Actualizar de forma parcial el estado técnico de un equipo
  public static updateEquipment = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La actualización del equipo ${id} todavía no está implementada.`
    });
  };
}
