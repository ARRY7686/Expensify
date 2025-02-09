import { create } from 'zustand';
import type { Expense } from './types';
import { API_URL, API_KEY } from './constants';

interface ExpenseStore {
  expenses: Expense[];
  exchangeRates: Record<string, number>;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  updateExpense: (id: number, expense: Omit<Expense, 'id'>) => Promise<void>;
  deleteExpense: (id: number) => void;
  fetchExchangeRates: () => Promise<Record<string, number>>;
}

const loadExpenses = (): Expense[] => {
  const storedExpenses = localStorage.getItem('expenses');
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};

const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: loadExpenses(),
  exchangeRates: {},

  addExpense: async (expense) => {
    const exchangeRates = await useExpenseStore.getState().fetchExchangeRates();
    const newExpenses = [...useExpenseStore.getState().expenses, { ...expense, id: Date.now() }];
    saveExpenses(newExpenses);
    set({ expenses: newExpenses, exchangeRates });
  },

  updateExpense: async (id, expense) => {
    const exchangeRates = await useExpenseStore.getState().fetchExchangeRates();
    const newExpenses = useExpenseStore.getState().expenses.map((exp) => 
      exp.id === id ? { ...expense, id } : exp
    );
    saveExpenses(newExpenses);
    set({ expenses: newExpenses, exchangeRates });
  },

  deleteExpense: (id) => {
    const newExpenses = useExpenseStore.getState().expenses.filter((exp) => exp.id !== id);
    saveExpenses(newExpenses);
    set({ expenses: newExpenses });
  },

  fetchExchangeRates: async () => {
    try {
      const response = await fetch(`${API_URL}?app_id=${API_KEY}`);
      const data = await response.json();
      set({ exchangeRates: data.rates });
      return data.rates;
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      return {};
    }
  }
}));

// Fetch exchange rates when the store is initialized
useExpenseStore.getState().fetchExchangeRates();