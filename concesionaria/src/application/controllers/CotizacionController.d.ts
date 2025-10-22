import { Request, Response } from 'express';
export declare class CotizacionController {
    private repo;
    private bankAdapter;
    constructor(repo: any, bankAdapter: any);
    create(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=CotizacionController.d.ts.map