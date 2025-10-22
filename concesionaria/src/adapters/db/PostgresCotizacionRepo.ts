import dotenv from 'dotenv';
import { Pool } from 'pg';

// Asegúrate de cargar las variables de entorno
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export class PostgresCotizacionRepo {
  async save(cotizacion: any) {
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
