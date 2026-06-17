import { useState, useEffect, useMemo } from 'react';
import { calcRunwayDays } from '../utils/calculations';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useFinanceStore() {
  const [balance, setBalance] = useState(() => loadFromStorage('riq_balance', 0));
  const [expenses, setExpenses] = useState(() => loadFromStorage('riq_expenses', []));
  const [fixedExpenses, setFixedExpenses] = useState(() => loadFromStorage('riq_fixed', []));

  useEffect(() => saveToStorage('riq_balance', balance), [balance]);
  useEffect(() => saveToStorage('riq_expenses', expenses), [expenses]);
  useEffect(() => saveToStorage('riq_fixed', fixedExpenses), [fixedExpenses]);

  const addExpense = (amount, note = '') => {
    const expense = {
      id: Date.now().toString(),
      amount: Number(amount),
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };
    setExpenses(prev => [expense, ...prev]);
    setBalance(prev => prev - Number(amount));
  };

  const deleteExpense = (id) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setExpenses(prev => prev.filter(e => e.id !== id));
      setBalance(prev => prev + expense.amount);
    }
  };

  const addIncome = (amount, note = '') => {
    setBalance(prev => prev + Number(amount));
  };

  const addFixedExpense = (name, amount, dueDate) => {
    const fixed = {
      id: Date.now().toString(),
      name,
      amount: Number(amount),
      dueDate,
    };
    setFixedExpenses(prev => [...prev, fixed]);
  };

  const deleteFixedExpense = (id) => {
    setFixedExpenses(prev => prev.filter(e => e.id !== id));
  };

  const rollingDailyAvg = useMemo(() => {
    if (expenses.length === 0) return 0;
    const now = new Date();
    const firstExpense = new Date(expenses[expenses.length - 1].timestamp);
    const daysSinceFirst = Math.max(1, Math.ceil((now - firstExpense) / (24 * 60 * 60 * 1000)));
    
    // Use the shorter of: days since first expense, or 7
    const windowDays = Math.min(daysSinceFirst, 7);
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    
    const windowExpenses = expenses.filter(e => new Date(e.timestamp) >= windowStart);
    const total = windowExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    return total / windowDays;
  }, [expenses]);

  const totalUpcomingFixed = useMemo(() => {
    const now = new Date();
    const thirtyDaysOut = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return fixedExpenses
      .filter(e => {
        const due = new Date(e.dueDate);
        return due >= now && due <= thirtyDaysOut;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [fixedExpenses]);

  const runwayDays = useMemo(() => {
    if (expenses.length === 0) return null;
    return calcRunwayDays(balance, totalUpcomingFixed, rollingDailyAvg);
  }, [balance, totalUpcomingFixed, rollingDailyAvg, expenses.length]);

  const topRepeats = useMemo(() => {
    const counts = {};
    expenses.forEach(e => {
      const key = e.note.toLowerCase() || 'unlabeled';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }, [expenses]);

  const resetAll = () => {
    setBalance(0);
    setExpenses([]);
    setFixedExpenses([]);
    localStorage.removeItem('riq_balance');
    localStorage.removeItem('riq_expenses');
    localStorage.removeItem('riq_fixed');
  };

  return {
    balance,
    expenses,
    fixedExpenses,
    rollingDailyAvg,
    totalUpcomingFixed,
    runwayDays,
    topRepeats,
    addExpense,
    deleteExpense,
    addIncome,
    addFixedExpense,
    deleteFixedExpense,
    resetAll,
  };
}
