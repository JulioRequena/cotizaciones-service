import { Request, Response } from 'express';
import { CalcularCotizacion } from '../usecases/CalcularCotizacion';

export class CotizacionController {
  constructor(private repo: any, private bankAdapter: any) {}

  async create(req: Request, res: Response) {
    try {
      const usecase = new CalcularCotizacion(this.bankAdapter, this.repo);
      const result = await usecase.execute(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}
