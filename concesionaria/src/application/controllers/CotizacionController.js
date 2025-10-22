"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotizacionController = void 0;
const CalcularCotizacion_1 = require("../usecases/CalcularCotizacion");
class CotizacionController {
    repo;
    bankAdapter;
    constructor(repo, bankAdapter) {
        this.repo = repo;
        this.bankAdapter = bankAdapter;
    }
    async create(req, res) {
        try {
            const usecase = new CalcularCotizacion_1.CalcularCotizacion(this.bankAdapter, this.repo);
            const result = await usecase.execute(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}
exports.CotizacionController = CotizacionController;
//# sourceMappingURL=CotizacionController.js.map