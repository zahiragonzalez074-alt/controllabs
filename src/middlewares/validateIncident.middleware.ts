//es necesario un middleware para cada modulo
import { Request, Response, NextFunction } from 'express'; //importaciones basicas de un middleware
import { ICreateIncidentDTO } from '../dtos/incident.dto'; //interfaz dto

const isCreateIncidentDTO = (value: unknown): value is ICreateIncidentDTO => { //metodo que efectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const Incident = value as Record<string, unknown>;
    return (
        typeof Incident.novedad === 'string' && Incident.novedad.trim() !== '' &&
        typeof Incident.num_equipo === 'number' && Number.isInteger(Incident.num_equipo) &&
        typeof Incident.estado_novedad === 'string' && Incident.estado_novedad.trim() !== '' &&
        typeof Incident.num_incidencias === 'number' && Number.isInteger(Incident.num_incidencias)
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
