"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcularCotizacion = void 0;
const uuid_1 = require("uuid");
class CalcularCotizacion {
    bankAdapter;
    repo;
    constructor(bankAdapter, repo) {
        this.bankAdapter = bankAdapter;
        this.repo = repo;
    }
    async execute(payload) {
        if (!payload.clienteId || !payload.vehiculoId || !payload.plazoMeses || !payload.precio) {
            throw new Error('Faltan datos requeridos');
        }
        const tasa = await this.bankAdapter.getRate({ plazo: payload.plazoMeses });
        const cuota = this.calculateMonthly(payload.precio, payload.entrada || 0, tasa, payload.plazoMeses);
        const cotizacion = {
            id: (0, uuid_1.v4)(),
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
    calculateMonthly(precio, entrada, tasaAnual, plazo) {
        const principal = precio - entrada;
        const r = tasaAnual / 12 / 100;
        if (r === 0)
            return +(principal / plazo).toFixed(2);
        const cuota = principal * (r * Math.pow(1 + r, plazo)) / (Math.pow(1 + r, plazo) - 1);
        return +cuota.toFixed(2);
    }
}
exports.CalcularCotizacion = CalcularCotizacion;
//# sourceMappingURL=CalcularCotizacion.js.map