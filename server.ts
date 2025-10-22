import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { CotizacionController } from './concesionaria/src/application/controllers/CotizacionController';
import { PostgresCotizacionRepo } from './concesionaria/src/adapters/db/PostgresCotizacionRepo';
import { BankAdapterMock } from './concesionaria/src/adapters/bank/BankAdapterMock';

dotenv.config();
const app = express();

// Middleware
app.use(json());

// Repositorio, adaptador y controlador
const repo = new PostgresCotizacionRepo();
const bankAdapter = new BankAdapterMock();
const controller = new CotizacionController(repo, bankAdapter);

// Ruta raíz para probar servidor
app.get('/', (req, res) => {
  res.send('API Cotizaciones funcionando ✅');
});

// GET /cotizaciones para debug (opcional)
app.get('/cotizaciones', async (req, res) => {
  try {
    if (typeof repo.getAll === 'function') {
      const cotizaciones = await repo.getAll();
      res.json(cotizaciones);
    } else {
      res.status(500).json({ error: 'Método getAll no implementado en el repositorio' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo cotizaciones' });
  }
});

// POST /cotizaciones para crear cotizaciones
app.post('/cotizaciones', (req, res) => controller.create(req, res));

// Puerto — convertir siempre a número para evitar error TS2769
const port = Number(process.env.PORT || 3000);

app.listen(port, '0.0.0.0', () => {
  console.log(`Cotizaciones API corriendo en puerto ${port}`);
});
