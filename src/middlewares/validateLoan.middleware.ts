import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware
import { ICreateLoanDTO } from '../dtos/loan.dto';//interfaz dto

const isUuid = (value: unknown): value is string =>
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const isCreateLoanDTO = (value: unknown): value is ICreateLoanDTO => {//metodo que afectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const loan = value as Record<string, unknown>;

    const allowedFields = new Set([
        'room_id',
        'instructor_id',
        'guarda_id',
        'numero_pc'
    ]);

    return (
        Object.keys(loan).every((key) => allowedFields.has(key)) &&
        isUuid(loan.room_id) &&
        isUuid(loan.instructor_id) &&
        isUuid(loan.guarda_id) &&
        typeof loan.numero_pc === 'number' &&
        Number.isInteger(loan.numero_pc)
    );
};

export const validateLoanPayload = ( //metodo central
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;
    if (!isCreateLoanDTO(body)) {// si el metodo no pasa la validacion (es false) devuelve un error
        res.status(400).json({
            success: false,
            error: 'Datos del préstamo inválidos.'
        });
        return;
    }
    next();//funcion clave de el middleware la saber si la peticion pasa o no
};