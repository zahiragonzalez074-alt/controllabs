
import { Request, Response } from 'express';

export class UserController {
  public static createUser = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'El registro de usuarios todavía no está implementado.'
    });
  };

  public static getAllUsers = (req: Request, res: Response): void => {
    res.status(501).json({
      success: false,
      message: 'La consulta de todos los usuarios todavía no está implementada.'
    });
  };

  public static getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La consulta del usuario ${id} todavía no está implementada.`
    });
  };

  public static updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La actualización del usuario ${id} todavía no está implementada.`
    });
  };

  public static deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La eliminación lógica del usuario ${id} todavía no está implementada.`
    });
  };
}
