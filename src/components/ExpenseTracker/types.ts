export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD';

export type Category = 'food' | 'transport' | 'entertainment' | 'utilities' | 'shopping' | 'other';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
  currency: Currency;
}

export interface CategoryColors {
  [key: string]: string;
}

export interface ExchangeRates {
  [key: string]: number;
}