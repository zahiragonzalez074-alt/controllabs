import { Request, Response, NextFunction } from 'express'; //importaciones basicas de un middleware
import { ICreateEquipmentDTO } from '../dtos/equipment.dto'; //interfaz dto

const isCreateEquipmentDTO = (value: unknown): value is ICreateEquipmentDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Equipment = value as Record<string, unknown>;
    return (
        typeof Equipment.placa_sena === 'string' && Equipment.placa_sena.trim() !== '' &&
        typeof Equipment.codigo_activo === 'string' && Equipment.codigo_activo.trim() !== '' &&
        typeof Equipment.tipo === 'string' && Equipment.tipo.trim() !== '' &&
        typeof Equipment.room_id === 'string' && Equipment.room_id.trim() !== '' &&
        typeof Equipment.estado === 'string' && Equipment.estado.trim() !== ''
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