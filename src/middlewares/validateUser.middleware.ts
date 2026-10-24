//es necesario un middleware para cada modulo
import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware
import { ICreateUserDTO } from '../dtos/User.dto';//interfaz dto

const isCreateUserDTO = (value: unknown): value is ICreateUserDTO => {//metodo que afectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

      const User = value as Record<string, unknown>;
    return (
        typeof User.Nombre === 'string' && User.Nombre.trim() !== '' &&
        typeof User.Rol === 'string' && User.Rol.trim() !== '' &&
        typeof User.documento === 'string' && User.documento.trim() !== '' &&
        typeof User.aula === 'string' && User.aula.trim() !== ''
    );
};

export const validateUserPayload = ( //metodo central
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;
    if (!isCreateUserDTO(body)) {// si el metodo no pasa la validacion (es false) devuelve un error
        res.status(400).json({
            success: false,
            error: 'Datos del usuario inválidos.'
        });
        return;
    }
    next();//funcion  clave de el middleware la saber si la peticion pasa o no
};