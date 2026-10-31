//es necesario un middleware para cada modulo
import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware
import { ICreateEnvironmetDTO} from '../dtos/environment.dto';//interfaz dto

const isCreateEnvironmentDTO = (value: unknown): value is ICreateEnvironmetDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Environment = value as Record<string, unknown>;
    return (
        typeof Environment.ubicacion === 'string' && Environment.ubicacion.trim() !== '' &&
        typeof Environment.capacidad === 'number' && Number.isInteger(Environment.capacidad) &&
        typeof Environment.tipo_espacio === 'string' && Environment.tipo_espacio.trim() !== '' &&
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
