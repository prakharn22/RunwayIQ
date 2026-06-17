import { useState } from 'react';

export default function BalanceReset({ onAddIncome }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    onAddIncome(num, note);
    setAmount('');
    setNote('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          background: '#1A1D27',
          border: '1px dashed #2A2D37',
          borderRadius: '1rem',
          padding: '1rem',
          color: '#818CF8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        + Add Money
      </button>
    );
  }

  return (
    <div style={{
      background: '#1A1D27',
      borderRadius: '1rem',
      padding: '1.25rem',
      marginBottom: '1rem',
    }}>
      <p style={{ color: '#E8E9ED', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
        Add Money
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ color: '#6B7280', fontSize: '1.125rem' }}>₹</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            background: '#0F1117',
            border: '1px solid #2A2D37',
            borderRadius: '0.5rem',
            padding: '0.625rem 0.75rem',
            color: '#E8E9ED',
            fontSize: '1rem',
            fontWeight: '600',
            outline: 'none',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{
            flex: 1,
            background: '#0F1117',
            border: '1px solid #2A2D37',
            borderRadius: '0.5rem',
            padding: '0.625rem 0.75rem',
            color: '#E8E9ED',
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: '#34D399',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.625rem 1rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: 'transparent',
            color: '#6B7280',
            border: '1px solid #2A2D37',
            borderRadius: '0.5rem',
            padding: '0.625rem 0.75rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
