import { Request, Response } from 'express';
import { loanService } from '../container';
import { DomainError } from '../errors/domain.error';
import { ICreateLoanDTO } from '../dtos/loan.dto';

export class LoanController {

  public static createLoan = async (
    req: Request<Record<string, string>, unknown, ICreateLoanDTO>,
    res: Response
  ): Promise<void> => {
    const loan = await loanService.createLoan(req.body);

    res.status(201).json({ success: true, data: loan });
  };

  public static getLoansByFilter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { room_id } = req.query;

    if (room_id !== undefined && typeof room_id !== 'string') {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El filtro room_id debe ser un texto.'
      );
    }

    const loans = await loanService.getLoans({ room_id });

    res.status(200).json({ success: true, data: loans });
  };

  public static getLoanById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const loan = await loanService.getLoanDetail(
      Number(req.params.id)
    );

    res.status(200).json({ success: true, data: loan });
  };

  public static acceptLoanInventory = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const loan = await loanService.acceptLoan(
      Number(req.params.id)
    );

    res.status(200).json({ success: true, data: loan });
  };
}
