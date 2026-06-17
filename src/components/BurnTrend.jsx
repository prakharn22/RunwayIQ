export default function BurnTrend({ dailyTotals, dailyAvg }) {
  if (!dailyTotals || dailyTotals.length === 0) return null;
  const hasData = dailyTotals.some(d => d.total > 0);
  if (!hasData) return null;

  const max = Math.max(...dailyTotals.map(d => d.total), dailyAvg || 1);
  const barHeight = 52;

  return (
    <div className="glass card-2" style={{ padding: '1rem 1.25rem', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontWeight: '500' }}>7-day spend</p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6875rem' }}>avg = ₹{Math.round(dailyAvg)}/day</p>
      </div>

      <div style={{ position: 'relative' }}>
        {dailyAvg > 0 && (
          <div style={{
            position: 'absolute',
            bottom: `${(dailyAvg / max) * barHeight + 18}px`,
            left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)',
            zIndex: 1,
          }} />
        )}

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: `${barHeight + 22}px` }}>
          {dailyTotals.map((d, i) => {
            const h = max > 0 ? (d.total / max) * barHeight : 0;
            const isToday = i === dailyTotals.length - 1;
            const overAvg = dailyAvg > 0 && d.total > dailyAvg;

            let bg = 'rgba(255,255,255,0.04)';
            if (d.total > 0) {
              bg = overAvg
                ? 'linear-gradient(180deg, #EF4444, #EF444466)'
                : isToday
                  ? 'linear-gradient(180deg, #818CF8, #818CF866)'
                  : 'linear-gradient(180deg, #34D399, #34D39966)';
            }

            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div style={{
                  width: '100%',
                  height: `${Math.max(h, 2)}px`,
                  borderRadius: '3px 3px 1px 1px',
                  background: bg,
                  opacity: d.total === 0 ? 0.2 : 1,
                  transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5625rem' }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
