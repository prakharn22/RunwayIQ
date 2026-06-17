import { formatCurrency } from '../utils/calculations';

export default function CrunchMode({ runwayDays, balance, totalUpcomingFixed, dailyAvg, topRepeats }) {
  if (runwayDays === null || runwayDays >= 5) return null;

  const available = balance - totalUpcomingFixed;
  const at70 = dailyAvg > 0 ? (available / (dailyAvg * 0.7)).toFixed(1) : '—';
  const at50 = dailyAvg > 0 ? (available / (dailyAvg * 0.5)).toFixed(1) : '—';

  return (
    <div style={{
      background: '#1A1D27',
      borderRadius: '1rem',
      padding: '1.25rem',
      marginBottom: '1rem',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1rem' }}>🔴</span>
        <p style={{ color: '#EF4444', fontWeight: '700', fontSize: '1rem' }}>Crunch Mode</p>
      </div>

      <p style={{ color: '#E8E9ED', fontSize: '0.875rem', marginBottom: '1rem' }}>
        At {formatCurrency(Math.round(dailyAvg))}/day you have <strong style={{ color: '#EF4444' }}>{runwayDays.toFixed(1)} days</strong>.
      </p>

      <div style={{
        background: '#0F1117',
        borderRadius: '0.75rem',
        padding: '0.875rem',
        marginBottom: '1rem',
      }}>
        <p style={{ color: '#6B7280', fontSize: '0.75rem', marginBottom: '0.5rem' }}>If you cut back:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
          <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>30% less spending</span>
          <span style={{ color: '#FBBF24', fontSize: '0.875rem', fontWeight: '600' }}>{at70} days</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>50% less spending</span>
          <span style={{ color: '#34D399', fontSize: '0.875rem', fontWeight: '600' }}>{at50} days</span>
        </div>
      </div>

      {topRepeats.length > 0 && (
        <div>
          <p style={{ color: '#6B7280', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Your biggest repeats</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {topRepeats.map(item => (
              <span key={item.name} style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '1rem',
                padding: '0.25rem 0.75rem',
                color: '#F87171',
                fontSize: '0.75rem',
              }}>
                {item.name} · {item.count}×
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
