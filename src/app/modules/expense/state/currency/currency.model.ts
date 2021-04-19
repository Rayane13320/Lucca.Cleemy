export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rates: Array<CurrencyRate>;
}

export interface CurrencyRate {
  to: string;
  rate: number;
}
