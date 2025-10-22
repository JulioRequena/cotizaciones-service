"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const CotizacionController_1 = require("./concesionaria/src/application/controllers/CotizacionController");
const PostgresCotizacionRepo_1 = require("./concesionaria/src/adapters/db/PostgresCotizacionRepo");
const BankAdapterMock_1 = require("./concesionaria/src/adapters/bank/BankAdapterMock");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, body_parser_1.json)());
// Repositorio, adaptador y controlador
const repo = new PostgresCotizacionRepo_1.PostgresCotizacionRepo();
const bankAdapter = new BankAdapterMock_1.BankAdapterMock();
const controller = new CotizacionController_1.CotizacionController(repo, bankAdapter);
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
        }
        else {
            res.status(500).json({ error: 'Método getAll no implementado en el repositorio' });
        }
    }
    catch (error) {
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
//# sourceMappingURL=server.js.map