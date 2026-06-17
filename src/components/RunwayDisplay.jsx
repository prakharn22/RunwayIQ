import { getRunwayStatus, formatCurrency } from '../utils/calculations';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

const statusColors = {
  green: '#34D399',
  amber: '#FBBF24',
  red: '#EF4444',
  none: 'rgba(255,255,255,0.15)',
};

const statusGlow = {
  green: 'rgba(52, 211, 153, 0.15)',
  amber: 'rgba(251, 191, 36, 0.12)',
  red: 'rgba(239, 68, 68, 0.15)',
  none: 'transparent',
};

export default function RunwayDisplay({ runwayDays, dailyAvg, balance, confidence }) {
  const status = getRunwayStatus(runwayDays);
  const color = statusColors[status];
  const glow = statusGlow[status];
  const isStale = confidence.level === 'low' || confidence.level === 'stale';
  const animated = useAnimatedNumber(runwayDays !== null ? Math.max(0, runwayDays) : 0);

  if (runwayDays === null) {
    return (
      <div className="glass card-1" style={{
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        marginBottom: '0.75rem',
      }}>
        <div className="animate-float" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛬</div>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem' }}>
          Log your first expense
        </p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
          Your runway will appear here
        </p>
      </div>
    );
  }

  const displayDays = Math.max(0, runwayDays);
  const barWidth = Math.min(100, (displayDays / 30) * 100);

  return (
    <div className="glass card-1" style={{
      padding: '2rem 1.5rem 1.5rem',
      textAlign: 'center',
      marginBottom: '0.75rem',
      boxShadow: `0 0 40px ${glow}`,
      transition: 'box-shadow 0.6s ease',
    }}>
      {/* Confidence warning */}
      {isStale && (
        <div className="animate-fade-in" style={{
          background: 'rgba(251, 191, 36, 0.06)',
          border: '1px solid rgba(251, 191, 36, 0.12)',
          borderRadius: '0.5rem',
          padding: '0.5rem 0.75rem',
          marginBottom: '1rem',
        }}>
          <p style={{ color: '#FBBF24', fontSize: '0.75rem', opacity: 0.9 }}>⚠ {confidence.label}</p>
        </div>
      )}

      {/* Big number */}
      <div style={{
        fontSize: '4.5rem',
        fontWeight: '800',
        color: color,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        opacity: isStale ? 0.4 : 1,
        transition: 'opacity 0.4s ease, color 0.6s ease',
        textShadow: `0 0 30px ${glow}`,
        letterSpacing: '-0.03em',
      }}>
        {animated.toFixed(1)}
      </div>
      <p style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.8125rem',
        fontWeight: '500',
        marginTop: '0.375rem',
        marginBottom: '1.25rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        days remaining
      </p>

      {/* Bar */}
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '1.25rem',
      }}>
        <div style={{
          height: '100%',
          width: `${barWidth}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: '2px',
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.6s ease',
          boxShadow: `0 0 8px ${glow}`,
        }} />
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {[
          { label: 'Daily avg', value: formatCurrency(Math.round(dailyAvg)) },
          { label: 'Balance', value: formatCurrency(Math.round(balance)) },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '0.75rem',
            padding: '0.75rem',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6875rem', marginBottom: '0.125rem' }}>{stat.label}</p>
            <p style={{ color: '#E8E9ED', fontSize: '1rem', fontWeight: '600' }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
