import { Request, Response, NextFunction } from 'express'; //importaciones basicas de un middleware
import { ICreateIncidentDTO } from '../dtos/incident.dto'; //interfaz dto

const isCreateIncidentDTO = (value: unknown): value is ICreateIncidentDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Incident = value as Record<string, unknown>;
    return (
        typeof Incident.equipment_id === 'string' && Incident.equipment_id.trim() !== '' &&
        typeof Incident.reported_by === 'string' && Incident.reported_by.trim() !== '' &&
        typeof Incident.descripcion === 'string' && Incident.descripcion.trim() !== '' &&
        typeof Incident.prioridad === 'string' && Incident.prioridad.trim() !== '' &&
        typeof Incident.estado === 'string' && Incident.estado.trim() !== ''
    );
};

export const validateIncidentPayload = ( //metodo central
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;

    if (!isCreateIncidentDTO(body)) { // si el metodo no pasa la validacion (es false) devuelve un error
        res.status(400).json({
            success: false,
            error: 'Datos de la incidencia inválidos.'
        });
        return;
    }

    next(); //funcion clave del middleware para saber si la peticion pasa o no
};