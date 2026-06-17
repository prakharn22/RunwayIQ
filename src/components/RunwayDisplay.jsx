import { getRunwayStatus, formatCurrency } from '../utils/calculations';

const statusColors = {
  green: '#34D399',
  amber: '#FBBF24',
  red: '#EF4444',
  none: '#4B5563',
};

export default function RunwayDisplay({ runwayDays, dailyAvg, balance }) {
  const status = getRunwayStatus(runwayDays);
  const color = statusColors[status];

  if (runwayDays === null) {
    return (
      <div style={{
        background: '#1A1D27',
        borderRadius: '1rem',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
          Log your first expense to see your runway
        </p>
      </div>
    );
  }

  const displayDays = Math.max(0, runwayDays);
  const barWidth = Math.min(100, (displayDays / 30) * 100);

  return (
    <div style={{
      background: '#1A1D27',
      borderRadius: '1rem',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      marginBottom: '1rem',
    }}>
      <div style={{
        fontSize: '5rem',
        fontWeight: '800',
        color: color,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {displayDays.toFixed(1)}
      </div>
      <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
        days remaining
      </p>

      {/* Runway bar */}
      <div style={{
        height: '6px',
        background: '#2A2D37',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          height: '100%',
          width: `${barWidth}%`,
          background: color,
          borderRadius: '3px',
          transition: 'width 0.5s ease, background 0.5s ease',
        }} />
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{
          flex: 1,
          background: '#0F1117',
          borderRadius: '0.75rem',
          padding: '0.875rem',
        }}>
          <p style={{ color: '#6B7280', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Daily avg</p>
          <p style={{ color: '#E8E9ED', fontSize: '1.125rem', fontWeight: '600' }}>
            {formatCurrency(Math.round(dailyAvg))}
          </p>
        </div>
        <div style={{
          flex: 1,
          background: '#0F1117',
          borderRadius: '0.75rem',
          padding: '0.875rem',
        }}>
          <p style={{ color: '#6B7280', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Balance</p>
          <p style={{ color: '#E8E9ED', fontSize: '1.125rem', fontWeight: '600' }}>
            {formatCurrency(Math.round(balance))}
          </p>
        </div>
      </div>
    </div>
  );
}
