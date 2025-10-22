"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresCotizacionRepo = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
// Asegúrate de cargar las variables de entorno
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
class PostgresCotizacionRepo {
    async save(cotizacion) {
        const q = `INSERT INTO cotizaciones
      (id, cliente_id, vehiculo_id, plazo_meses, entrada, tasa_anual, cuota_mensual, estado, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
        await pool.query(q, [
            cotizacion.id,
            cotizacion.clienteId,
            cotizacion.vehiculoId,
            cotizacion.plazoMeses,
            cotizacion.entrada,
            cotizacion.tasaAnual,
            cotizacion.cuotaMensual,
            cotizacion.estado,
            cotizacion.created_at,
        ]);
        return cotizacion;
    }
    async getAll() {
        const result = await pool.query('SELECT * FROM cotizaciones');
        return result.rows;
    }
}
exports.PostgresCotizacionRepo = PostgresCotizacionRepo;
//# sourceMappingURL=PostgresCotizacionRepo.js.map