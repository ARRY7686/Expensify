import React, { useState } from 'react';
import { useExpenseStore } from './store';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { ExpenseChart } from './ExpenseChart';
import type { Expense, Currency } from './types';

export const ExpenseTracker: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenseStore();
  const [baseCurrency, setBaseCurrency] = useState<Currency>('USD');
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSave = (expense: Omit<Expense, 'id'>) => {
    if (editingId) {
      updateExpense(editingId, expense);
      setEditingId(null);
    } else {
      addExpense(expense);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleDelete = (id: number) => {
    deleteExpense(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="inline-block transform hover:scale-105 transition-transform duration-200">
              Personal Expense Tracker
            </span>
          </h1>
          <p className="text-gray-600">Keep track of your spending across multiple currencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <ExpenseForm 
            onSave={handleSave}
            editingId={editingId}
            expenses={expenses}
          />

          {/* Chart */}
          <ExpenseChart 
            expenses={expenses}
            baseCurrency={baseCurrency}
          />
        </div>

        {/* List */}
        <ExpenseList
          expenses={expenses}
          baseCurrency={baseCurrency}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCurrencyChange={setBaseCurrency}
        />
      </div>
    </div>
  );
};