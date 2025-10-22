import { v4 as uuidv4 } from 'uuid';

export class CalcularCotizacion {
  constructor(private bankAdapter: any, private repo: any) {}

  async execute(payload: any) {
    if (!payload.clienteId || !payload.vehiculoId || !payload.plazoMeses || !payload.precio) {
      throw new Error('Faltan datos requeridos');
    }
    const tasa = await this.bankAdapter.getRate({ plazo: payload.plazoMeses });
    const cuota = this.calculateMonthly(payload.precio, payload.entrada || 0, tasa, payload.plazoMeses);
    const cotizacion = {
      id: uuidv4(),
      clienteId: payload.clienteId,
      vehiculoId: payload.vehiculoId,
      plazoMeses: payload.plazoMeses,
      entrada: payload.entrada || 0,
      tasaAnual: tasa,
      cuotaMensual: cuota,
      estado: 'BORRADOR',
      created_at: new Date().toISOString()
    };
    await this.repo.save(cotizacion);
    return cotizacion;
  }

  private calculateMonthly(precio:number, entrada:number, tasaAnual:number, plazo:number) {
    const principal = precio - entrada;
    const r = tasaAnual / 12 / 100;
    if (r === 0) return +(principal / plazo).toFixed(2);
    const cuota = principal * (r * Math.pow(1 + r, plazo)) / (Math.pow(1 + r, plazo) - 1);
    return +cuota.toFixed(2);
  }
}
