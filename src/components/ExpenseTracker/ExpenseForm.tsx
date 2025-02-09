import React, { useState, useEffect } from 'react';
import { Plus, Save, DollarSign } from 'lucide-react';
import { CATEGORIES, CURRENCIES } from './constants';
import { useExpenseStore } from './store';
import type { Expense } from './types';

interface ExpenseFormProps {
  onSave: (expense: Omit<Expense, 'id'>) => void;
  editingId: number | null;
  expenses: Expense[];
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSave, editingId, expenses }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food',
    currency: 'USD'
  });

  useEffect(() => {
    if (editingId) {
      const expense = expenses.find(exp => exp.id === editingId);
      if (expense) {
        setFormData({
          description: expense.description,
          amount: expense.amount.toString(),
          category: expense.category,
          currency: expense.currency
        });
      }
    }
  }, [editingId, expenses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const expense = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      currency: formData.currency
    } as Omit<Expense, 'id'>;

    if (editingId) {
      await useExpenseStore.getState().updateExpense(editingId, expense);
    } else {
      await useExpenseStore.getState().addExpense(expense);
    }

    setFormData({
      description: '',
      amount: '',
      category: 'food',
      currency: 'USD'
    });
  };

  return (
    <div className="backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-lg">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <div className="flex items-center gap-2 text-2xl">
          <DollarSign className="w-6 h-6 text-green-500" />
          {editingId ? 'Edit' : 'Add'} Expense
        </div>
      </div>
      <div className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What did you spend on?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg"
            >
              {Object.entries(CATEGORIES).map(([category, color]) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg"
            >
              {CURRENCIES.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {editingId ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {editingId ? 'Update' : 'Add'} Expense
          </button>
        </form>
      </div>
    </div>
  );
};