import { useState, useEffect, useMemo } from 'react';
import { calcRunwayDays, getConfidence, getDailyTotals } from '../utils/calculations';

function load(key, fallback) {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch { return fallback; }
}
function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

export function useFinanceStore() {
  const [balance, setBalance] = useState(() => load('riq_balance', 0));
  const [expenses, setExpenses] = useState(() => load('riq_expenses', []));
  const [fixedExpenses, setFixedExpenses] = useState(() => load('riq_fixed', []));
  const [onboarded, setOnboarded] = useState(() => load('riq_onboarded', false));

  useEffect(() => save('riq_balance', balance), [balance]);
  useEffect(() => save('riq_expenses', expenses), [expenses]);
  useEffect(() => save('riq_fixed', fixedExpenses), [fixedExpenses]);
  useEffect(() => save('riq_onboarded', onboarded), [onboarded]);

  const addExpense = (amount, note = '') => {
    const e = { id: Date.now().toString(), amount: Number(amount), note: note.trim(), timestamp: new Date().toISOString() };
    setExpenses(prev => [e, ...prev]);
    setBalance(prev => prev - Number(amount));
  };

  const deleteExpense = (id) => {
    const e = expenses.find(x => x.id === id);
    if (e) {
      setExpenses(prev => prev.filter(x => x.id !== id));
      setBalance(prev => prev + e.amount);
    }
  };

  const addIncome = (amount) => setBalance(prev => prev + Number(amount));

  const addFixedExpense = (name, amount, dueDate) => {
    setFixedExpenses(prev => [...prev, { id: Date.now().toString(), name, amount: Number(amount), dueDate }]);
  };

  const deleteFixedExpense = (id) => setFixedExpenses(prev => prev.filter(e => e.id !== id));

  const completeOnboarding = (initialBalance) => {
    setBalance(Number(initialBalance));
    setOnboarded(true);
  };

  const rollingDailyAvg = useMemo(() => {
    if (expenses.length === 0) return 0;
    const now = new Date();
    const first = new Date(expenses[expenses.length - 1].timestamp);
    const daysSinceFirst = Math.max(1, Math.ceil((now - first) / (86400000)));
    const window = Math.min(daysSinceFirst, 7);
    const start = new Date(now.getTime() - window * 86400000);
    const total = expenses.filter(e => new Date(e.timestamp) >= start).reduce((s, e) => s + e.amount, 0);
    return total / window;
  }, [expenses]);

  const totalUpcomingFixed = useMemo(() => {
    const now = new Date();
    const limit = new Date(now.getTime() + 30 * 86400000);
    return fixedExpenses.filter(e => { const d = new Date(e.dueDate); return d >= now && d <= limit; }).reduce((s, e) => s + e.amount, 0);
  }, [fixedExpenses]);

  const runwayDays = useMemo(() => {
    if (expenses.length === 0) return null;
    return calcRunwayDays(balance, totalUpcomingFixed, rollingDailyAvg);
  }, [balance, totalUpcomingFixed, rollingDailyAvg, expenses.length]);

  const confidence = useMemo(() => getConfidence(expenses), [expenses]);

  const dailyTotals = useMemo(() => getDailyTotals(expenses, 7), [expenses]);

  const topRepeats = useMemo(() => {
    const c = {};
    expenses.forEach(e => { const k = (e.note || 'unlabeled').toLowerCase(); c[k] = (c[k] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, count]) => ({ name, count }));
  }, [expenses]);

  const resetAll = () => {
    setBalance(0); setExpenses([]); setFixedExpenses([]); setOnboarded(false);
    ['riq_balance', 'riq_expenses', 'riq_fixed', 'riq_onboarded'].forEach(k => localStorage.removeItem(k));
  };

  return {
    balance, expenses, fixedExpenses, onboarded,
    rollingDailyAvg, totalUpcomingFixed, runwayDays,
    confidence, dailyTotals, topRepeats,
    addExpense, deleteExpense, addIncome,
    addFixedExpense, deleteFixedExpense,
    completeOnboarding, resetAll,
  };
}
