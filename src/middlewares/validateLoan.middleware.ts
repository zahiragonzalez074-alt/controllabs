import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware
import { ICreateLoanDTO } from '../dtos/loan.dto';//interfaz dto

const isCreateLoanDTO = (value: unknown): value is ICreateLoanDTO => {//metodo que afectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const loan = value as Record<string, unknown>;
    return (
        typeof loan.room_id === 'string' && loan.room_id.trim() !== '' &&
        typeof loan.instructor_id === 'string' && loan.instructor_id.trim() !== '' &&
        typeof loan.guarda_id === 'string' && loan.guarda_id.trim() !== '' &&
        typeof loan.numero_pc === 'number' && Number.isInteger(loan.numero_pc)
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
    next();//funcion  clave de el middleware la saber si la peticion pasa o no
};