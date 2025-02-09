import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { CATEGORIES, CURRENCIES, EXCHANGE_RATES } from './constants';
import type { Expense, Currency } from './types';

interface ExpenseListProps {
  expenses: Expense[];
  baseCurrency: Currency;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCurrencyChange: (currency: Currency) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  baseCurrency,
  onEdit,
  onDelete,
  onCurrencyChange
}) => {
  const convertCurrency = (amount: number, from: Currency, to: Currency) => {
    return (amount / EXCHANGE_RATES[from]) * EXCHANGE_RATES[to];
  };

  return (
    <div className="backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-lg">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Recent Expenses</h2>
          <select
            value={baseCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="w-40 p-2 border border-gray-300 rounded"
          >
            {CURRENCIES.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-left text-gray-600 font-medium">Description</th>
              <th className="p-4 text-left text-gray-600 font-medium">Category</th>
              <th className="p-4 text-right text-gray-600 font-medium">Amount</th>
              <th className="p-4 text-center text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr 
                key={expense.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 text-gray-800">{expense.description}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: CATEGORIES[expense.category] }}
                    />
                    <span className="capitalize text-gray-800">{expense.category}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-gray-800">
                    {baseCurrency} {convertCurrency(
                      expense.amount,
                      expense.currency,
                      baseCurrency
                    ).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Original: {expense.currency} {expense.amount}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(expense.id)}
                      className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};