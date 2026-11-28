import { Request, Response } from 'express';
import { userService } from '../container';
import { DomainError } from '../errors/domain.error';
import { ICreateUserDTO } from '../dtos/User.dto';

export class UserController {

  public static createUser = async (
    req: Request<Record<string, string>, unknown, ICreateUserDTO>,
    res: Response
  ): Promise<void> => {
    const user = await userService.createUser(req.body);

    res.status(201).json({ success: true, data: user });
  };

  public static getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { rol, activo } = req.query;

    if (rol !== undefined && typeof rol !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro rol debe ser un texto.'
      );
    }

    if (activo !== undefined && activo !== 'true' && activo !== 'false') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro activo debe ser true o false.'
      );
    }

    const users = await userService.getUsers({
      rol,
      activo: activo === undefined ? undefined : activo === 'true'
    });

    res.status(200).json({ success: true, data: users });
  };

  public static getUserById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const user = await userService.getUserDetail(
      Number(req.params.id)
    );

    res.status(200).json({ success: true, data: user });
  };

  public static updateUser = async (
    req: Request<{ id: string }, unknown, Partial<ICreateUserDTO>>,
    res: Response
  ): Promise<void> => {
    const user = await userService.updateUser(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({ success: true, data: user });
  };

  public static deleteUser = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const user = await userService.deleteUser(
      Number(req.params.id)
    );

    res.status(200).json({ success: true, data: user });
  };
}