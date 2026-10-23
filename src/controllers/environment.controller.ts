//el controlador es una clase 
//recibe parametros y cuerpo
//se encarga de llamar al servicio(base de datos)
import { Request, Response } from 'express';

//metodos
export class environmentController {
   // Listar todos los ambientes
  public static getEnvironments = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'La consulta de todos los ambientes todavía no está implementada.'
    });
  };

 // Crear un ambiente
  public static createEnvironment = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'El registro de ambientes todavía no está implementado.'
    });
  };

  // Actualizar atributos específicos de un ambiente
  public static updateEnvironment = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La actualización del ambiente ${id} todavía no está implementada.`
    });
  };
}
