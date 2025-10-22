CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS cotizaciones (
  id uuid PRIMARY KEY,
  cliente_id uuid NOT NULL,
  vehiculo_id uuid NOT NULL,
  plazo_meses integer NOT NULL,
  entrada numeric(12,2),
  tasa_anual numeric(6,4),
  cuota_mensual numeric(12,2),
  estado varchar(20) DEFAULT 'BORRADOR',
  created_at timestamptz DEFAULT now()
);
