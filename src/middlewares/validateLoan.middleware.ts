//es necesario un middleware para cada modulo
import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware
import { ICreateLoanDTO } from '../dtos/loan.dto';//interfaz dto

const isCreateLoanDTO = (value: unknown): value is ICreateLoanDTO => {//metodo que afectua las tareas de validacion
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const loan = value as Record<string, unknown>;
    return (
        typeof loan.aula === 'string' && loan.aula.trim() !== '' &&
        typeof loan.numeroPC === 'number' && Number.isInteger(loan.numeroPC) &&
        typeof loan.nombreGuardaEntrega === 'string' && loan.nombreGuardaEntrega.trim() !== '' &&
        typeof loan.instructorRecibe === 'string' && loan.instructorRecibe.trim() !== ''
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