import { useState } from 'react';

const quickTags = [
  { label: 'Chai', emoji: '☕' },
  { label: 'Auto', emoji: '🛺' },
  { label: 'Canteen', emoji: '🍛' },
  { label: 'Print', emoji: '🖨️' },
  { label: 'Snack', emoji: '🍿' },
  { label: 'Online', emoji: '📦' },
];

export default function ExpenseLogger({ onAddExpense }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [flash, setFlash] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    onAddExpense(num, note);
    setAmount('');
    setNote('');
    setActiveTag(null);
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  const handleTag = (tag) => {
    if (activeTag === tag.label) {
      setActiveTag(null);
      setNote('');
    } else {
      setActiveTag(tag.label);
      setNote(tag.label);
    }
  };

  return (
    <div className="glass card-3" style={{ padding: '1.25rem', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.5rem', fontWeight: '600' }}>₹</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#E8E9ED',
            fontSize: '2rem',
            fontWeight: '700',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
        {quickTags.map(tag => (
          <button
            key={tag.label}
            onClick={() => handleTag(tag)}
            className={`tag ${activeTag === tag.label ? 'tag-active' : ''}`}
          >
            {tag.emoji} {tag.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={e => { setNote(e.target.value); setActiveTag(null); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className="input-glass"
          style={{ flex: 1 }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: flash
              ? 'linear-gradient(135deg, #34D399, #10B981)'
              : 'linear-gradient(135deg, #818CF8, #6366F1)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.625rem',
            padding: '0.625rem 1.25rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            boxShadow: flash ? '0 0 16px rgba(52,211,153,0.3)' : 'none',
          }}
        >
          {flash ? '✓' : 'Log'}
        </button>
      </div>
    </div>
  );
}
