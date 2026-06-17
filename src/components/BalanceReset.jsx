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
        className="card-4"
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.08)',
          borderRadius: '1.125rem',
          padding: '1rem',
          color: '#818CF8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '0.75rem',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.target.style.borderColor = 'rgba(129,140,248,0.25)'; e.target.style.background = 'rgba(129,140,248,0.04)'; }}
        onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.02)'; }}
      >
        + Add Money
      </button>
    );
  }

  return (
    <div className="glass-highlight animate-scale-in card-4" style={{
      borderRadius: '1.125rem',
      padding: '1.25rem',
      marginBottom: '0.75rem',
    }}>
      <p style={{ color: '#E8E9ED', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
        Add Money
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1.125rem' }}>₹</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          autoFocus
          className="input-glass"
          style={{ flex: 1, fontSize: '1rem', fontWeight: '600' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
          className="input-glass"
          style={{ flex: 1 }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: 'linear-gradient(135deg, #34D399, #10B981)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.625rem',
            padding: '0.625rem 1rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
        <button onClick={() => setOpen(false)} className="btn-ghost" style={{ fontSize: '1rem' }}>✕</button>
      </div>
    </div>
  );
}
