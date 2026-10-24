import express, { Request, Response } from 'express';
import apiRoutes from './routes';
import cors from 'cors';
import {  requestLogger } from './middlewares/logger.middleware';
import { globalErrorHandler }  from './middlewares/errorHandler.middleware'

const app = express();

//middlewares
app.use(cors());//Permite que el backend reciba solicitudes desde otros orígenes, como un frontend.
app.use( requestLogger);//Registra información de las solicitudes HTTP que llegan al servidor.
app.use(express.json());//Registra información de las solicitudes HTTP que llegan al servidor.


// Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'ControlLabs API operando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1', apiRoutes);

app.get('/__test/error', (_req, _res, next) => {
  next(new Error('Error de prueba'));
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
});

app.use(globalErrorHandler);

export default app;