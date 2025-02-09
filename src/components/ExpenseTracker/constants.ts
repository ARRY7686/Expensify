import type { CategoryColors, ExchangeRates } from './types';

export const CATEGORIES: CategoryColors = {
  food: '#FF6B6B',
  transport: '#4ECDC4',
  entertainment: '#45B7D1',
  utilities: '#96CEB4',
  shopping: '#FFEEAD',
  other: '#D4A5A5'
};

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'] as const;

export const EXCHANGE_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.83,
  GBP: 0.73,
  JPY: 110.5,
  AUD: 1.35
};

export const API_URL = 'https://openexchangerates.org/api/latest.json';
export const API_KEY = "240de5a931c9430b9d26ade6c1df8d48"; // Use environment variable for API key