import { useState } from 'react';

export default function ExpenseLogger({ onAddExpense }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [flash, setFlash] = useState(false);

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    onAddExpense(num, note);
    setAmount('');
    setNote('');
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{
      background: '#1A1D27',
      borderRadius: '1rem',
      padding: '1.25rem',
      marginBottom: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <span style={{ color: '#6B7280', fontSize: '1.5rem', fontWeight: '600' }}>₹</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#E8E9ED',
            fontSize: '2rem',
            fontWeight: '700',
            width: '100%',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
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
            background: flash ? '#34D399' : '#818CF8',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.625rem 1.25rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {flash ? '✓' : 'Log Expense'}
        </button>
      </div>
    </div>
  );
}
