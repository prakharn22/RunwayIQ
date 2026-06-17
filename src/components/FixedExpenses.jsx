import { useState } from 'react';
import { formatCurrency } from '../utils/calculations';

export default function FixedExpenses({ fixedExpenses, totalUpcoming, onAdd, onDelete }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !amount || !dueDate) return;
    onAdd(name.trim(), parseFloat(amount), dueDate);
    setName(''); setAmount(''); setDueDate('');
    setOpen(false);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <div className="glass card-5" style={{ padding: '1.25rem', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <p style={{ color: '#E8E9ED', fontWeight: '600', fontSize: '0.875rem' }}>Upcoming Fixed</p>
        <button
          onClick={() => setOpen(!open)}
          className="tag"
          style={{ fontSize: '0.6875rem', padding: '0.25rem 0.625rem' }}
        >
          {open ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {open && (
        <div className="animate-scale-in" style={{ marginBottom: '1rem' }}>
          <input type="text" placeholder="Name (e.g. Mess bill)" value={name} onChange={e => setName(e.target.value)}
            className="input-glass" style={{ width: '100%', marginBottom: '0.5rem', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input type="number" placeholder="₹ Amount" value={amount} onChange={e => setAmount(e.target.value)}
              className="input-glass" style={{ flex: 1 }} />
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
              className="input-glass" style={{ flex: 1 }} />
          </div>
          <button onClick={handleAdd} className="btn-primary" style={{ width: '100%', padding: '0.625rem', fontSize: '0.8125rem' }}>
            Add Fixed Expense
          </button>
        </div>
      )}

      {fixedExpenses.length === 0 && !open && (
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8125rem' }}>No fixed expenses yet</p>
      )}

      {fixedExpenses.map(item => (
        <div key={item.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div>
            <p style={{ color: '#E8E9ED', fontSize: '0.875rem', fontWeight: '500' }}>{item.name}</p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>{formatDate(item.dueDate)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#E8E9ED', fontSize: '0.875rem', fontWeight: '600' }}>{formatCurrency(item.amount)}</span>
            <button onClick={() => onDelete(item.id)} className="btn-ghost" style={{ fontSize: '0.875rem', padding: 0 }}>✕</button>
          </div>
        </div>
      ))}

      {fixedExpenses.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>Total upcoming (30d)</span>
          <span style={{ color: '#FBBF24', fontSize: '0.875rem', fontWeight: '600' }}>{formatCurrency(totalUpcoming)}</span>
        </div>
      )}
    </div>
  );
}
