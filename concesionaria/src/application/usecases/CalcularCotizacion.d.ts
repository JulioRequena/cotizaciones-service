export declare class CalcularCotizacion {
    private bankAdapter;
    private repo;
    constructor(bankAdapter: any, repo: any);
    execute(payload: any): Promise<{
        id: string;
        clienteId: any;
        vehiculoId: any;
        plazoMeses: any;
        entrada: any;
        tasaAnual: any;
        cuotaMensual: number;
        estado: string;
        created_at: string;
    }>;
    private calculateMonthly;
}
//# sourceMappingURL=CalcularCotizacion.d.ts.map