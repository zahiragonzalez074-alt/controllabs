
//es necesario un middleware para cada modulo
import { Request, Response, NextFunction } from 'express'; //importaciones basicas de un middleware
import { ICreateEquipmentDTO } from '../dtos/equipment.dto'; //interfaz dto

const isCreateEquipmentDTO = (value: unknown): value is ICreateEquipmentDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Equipment = value as Record<string, unknown>;
    return (
        typeof Equipment.ambiente === 'string' && Equipment.ambiente.trim() !== '' &&
        typeof Equipment.num_equipo === 'number' && Number.isInteger(Equipment.num_equipo) &&
        typeof Equipment.estado === 'string' && Equipment.estado.trim() !== '' &&
        typeof Equipment.ubicacion === 'string' && Equipment.ubicacion.trim() !== ''
    );
};

export const validateEquipmentPayload = ( //metodo central
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;

    if (!isCreateEquipmentDTO(body)) { // si el metodo no pasa la validacion (es false) devuelve un error
        res.status(400).json({
            success: false,
            error: 'Datos del equipo inválidos.'
        });
        return;
    }

    next(); //funcion clave del middleware para saber si la peticion pasa o no
};
