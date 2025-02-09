import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CATEGORIES } from './constants';
import { useExpenseStore } from './store';
import type { Expense, Currency } from './types';

interface ExpenseChartProps {
  expenses: Expense[];
  baseCurrency: Currency;
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses, baseCurrency }) => {
  const { exchangeRates } = useExpenseStore();

  const convertCurrency = (amount: number, from: Currency, to: Currency) => {
    return (amount / exchangeRates[from]) * exchangeRates[to];
  };

  const categoryTotals = expenses.reduce((acc, exp) => {
    const amount = convertCurrency(exp.amount, exp.currency, baseCurrency);
    acc[exp.category] = (acc[exp.category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total
  }));

  return (
    <div className="backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-lg">
      <div className="border-b border-gray-100 pb-4 mb-4">
        <h2 className="text-2xl font-bold">Spending Overview</h2>
      </div>
      <div className="h-96 pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={true}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORIES[entry.name]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value: string) => (
                <span className="text-sm font-medium capitalize">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};