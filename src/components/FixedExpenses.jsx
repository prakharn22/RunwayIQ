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
    setName('');
    setAmount('');
    setDueDate('');
    setOpen(false);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{
      background: '#1A1D27',
      borderRadius: '1rem',
      padding: '1.25rem',
      marginBottom: '1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <p style={{ color: '#E8E9ED', fontWeight: '600', fontSize: '0.875rem' }}>Upcoming Fixed</p>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'transparent',
            border: '1px solid #2A2D37',
            borderRadius: '0.375rem',
            color: '#818CF8',
            fontSize: '0.75rem',
            padding: '0.25rem 0.625rem',
            cursor: 'pointer',
          }}
        >
          {open ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {open && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Name (e.g. Mess bill)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%',
              background: '#0F1117',
              border: '1px solid #2A2D37',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
              color: '#E8E9ED',
              fontSize: '0.875rem',
              outline: 'none',
              marginBottom: '0.5rem',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="number"
              placeholder="₹ Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                flex: 1,
                background: '#0F1117',
                border: '1px solid #2A2D37',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                color: '#E8E9ED',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              style={{
                flex: 1,
                background: '#0F1117',
                border: '1px solid #2A2D37',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.75rem',
                color: '#E8E9ED',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              background: '#818CF8',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Add Fixed Expense
          </button>
        </div>
      )}

      {fixedExpenses.length === 0 && !open && (
        <p style={{ color: '#4B5563', fontSize: '0.8125rem' }}>No fixed expenses yet</p>
      )}

      {fixedExpenses.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          borderBottom: '1px solid #2A2D37',
        }}>
          <div>
            <p style={{ color: '#E8E9ED', fontSize: '0.875rem', fontWeight: '500' }}>{item.name}</p>
            <p style={{ color: '#6B7280', fontSize: '0.75rem' }}>{formatDate(item.dueDate)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#E8E9ED', fontSize: '0.875rem', fontWeight: '600' }}>
              {formatCurrency(item.amount)}
            </span>
            <button
              onClick={() => onDelete(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '0',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {fixedExpenses.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.75rem',
          paddingTop: '0.5rem',
        }}>
          <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>Total upcoming (30d)</span>
          <span style={{ color: '#FBBF24', fontSize: '0.875rem', fontWeight: '600' }}>
            {formatCurrency(totalUpcoming)}
          </span>
        </div>
      )}
    </div>
  );
}
