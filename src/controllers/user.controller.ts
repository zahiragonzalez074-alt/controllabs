import { Request, Response } from 'express';

//metodos
export class UserController {
  public static createUser = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'El registro de préstamos todavía no está implementado.'
    });
  };

  public static getUsersByFilter = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: 'La consulta del historial todavía no está implementada.'
    });
  };

  public static getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de consulta y responder con el préstamo encontrado.
    res.status(501).json({
      success: false,
      message: `La consulta del préstamo ${id} todavía no está implementada.`
    });
  };

  public static acceptUserInventory = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de aceptación y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `La aceptación del préstamo ${id} todavía no está implementada.`
    });
  };

  public static changesUserpassword = (req: Request, res: Response): void => {
    const { password } = req.body;
    // TODO: pasar id a la operación de aceptación y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `El cambio de contraseña todavía no está implementado.`
    });
  };

  public static ChangeUserStatus = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de aceptación y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `La inactivacion de usuario todavía no está implementada.`
    });
  };
}