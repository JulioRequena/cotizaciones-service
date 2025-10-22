export class BankAdapterMock {
  async getRate(_params:any) {
    return Number(process.env.DEFAULT_RATE || 9.5);
  }
}
