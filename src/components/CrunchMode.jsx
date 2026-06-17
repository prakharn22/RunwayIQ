import { formatCurrency } from '../utils/calculations';

export default function CrunchMode({ runwayDays, balance, totalUpcomingFixed, dailyAvg, topRepeats }) {
  if (runwayDays === null || runwayDays >= 5) return null;

  const available = balance - totalUpcomingFixed;
  const at70 = dailyAvg > 0 ? (available / (dailyAvg * 0.7)).toFixed(1) : '—';
  const at50 = dailyAvg > 0 ? (available / (dailyAvg * 0.5)).toFixed(1) : '—';

  return (
    <div className="glass-danger animate-scale-in" style={{
      borderRadius: '1.125rem',
      padding: '1.25rem',
      marginBottom: '0.75rem',
      boxShadow: '0 0 30px rgba(239, 68, 68, 0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444',
          boxShadow: '0 0 8px rgba(239,68,68,0.5)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <p style={{ color: '#EF4444', fontWeight: '700', fontSize: '0.9375rem' }}>Crunch Mode</p>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>
        At {formatCurrency(Math.round(dailyAvg))}/day you have <strong style={{ color: '#EF4444' }}>{runwayDays.toFixed(1)} days</strong>.
      </p>

      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '0.75rem',
        padding: '0.875rem',
        marginBottom: '1rem',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginBottom: '0.625rem' }}>If you cut back:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>30% less spending</span>
          <span style={{ color: '#FBBF24', fontSize: '0.875rem', fontWeight: '600' }}>{at70} days</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>50% less spending</span>
          <span style={{ color: '#34D399', fontSize: '0.875rem', fontWeight: '600' }}>{at50} days</span>
        </div>
      </div>

      {topRepeats.length > 0 && (
        <div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Your biggest repeats</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {topRepeats.map(item => (
              <span key={item.name} style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                borderRadius: '2rem',
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
