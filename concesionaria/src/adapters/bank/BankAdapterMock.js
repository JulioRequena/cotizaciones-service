"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAdapterMock = void 0;
class BankAdapterMock {
    async getRate(_params) {
        return Number(process.env.DEFAULT_RATE || 9.5);
    }
}
exports.BankAdapterMock = BankAdapterMock;
//# sourceMappingURL=BankAdapterMock.js.map