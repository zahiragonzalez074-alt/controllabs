//es necesario un middleware para cada modulo
import { Request, Response, NextFunction } from 'express';//importaciones basicas de un middleware

export const requestLogger = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT SENA] [${timestamp}] ${req.method} ${req.originalUrl}`);
  next();//next: funcion eje centrla de los middleware
};

