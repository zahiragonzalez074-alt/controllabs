import { Request, Response, NextFunction } from 'express'; //importaciones basicas de un middleware
import { ICreateEquipmentDTO } from '../dtos/equipment.dto'; //interfaz dto

const isUuid = (value: unknown): value is string =>
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const isCreateEquipmentDTO = (value: unknown): value is ICreateEquipmentDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Equipment = value as Record<string, unknown>;

    const allowedFields = new Set([
        'placa_sena',
        'codigo_activo',
        'tipo',
        'room_id',
        'estado'
    ]);

    return (
        Object.keys(Equipment).every((key) => allowedFields.has(key)) &&
        typeof Equipment.placa_sena === 'string' && Equipment.placa_sena.trim() !== '' &&
        typeof Equipment.codigo_activo === 'string' && Equipment.codigo_activo.trim() !== '' &&
        typeof Equipment.tipo === 'string' && Equipment.tipo.trim() !== '' &&
        isUuid(Equipment.room_id) &&
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