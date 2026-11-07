import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware
import { ICreateEnvironmentDTO} from '../dtos/environment.dto';//interfaz dto

const isCreateEnvironmentDTO = (value: unknown): value is ICreateEnvironmentDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Environment = value as Record<string, unknown>;
    return (
        typeof Environment.nombre === 'string' && Environment.nombre.trim() !== '' &&
        typeof Environment.bloque === 'string' && Environment.bloque.trim() !== '' &&
        typeof Environment.capacidad_pcs === 'number' && Number.isInteger(Environment.capacidad_pcs) &&
        typeof Environment.estado === 'string' && Environment.estado.trim() !== ''
    );
};

export const validateEnvironmentPayload = ( //metodo central
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;

    if (!isCreateEnvironmentDTO(body)) { // si el metodo no pasa la validacion (es false) devuelve un error
        res.status(400).json({
            success: false,
            error: 'Datos del ambiente inválidos.'
        });
        return;
    }

    next(); //funcion clave del middleware para saber si la peticion pasa o no
};