export function calcRunwayDays(balance, upcomingFixed, dailyAvg) {
  if (!dailyAvg || dailyAvg <= 0) return null;
  const available = balance - upcomingFixed;
  if (available <= 0) return 0;
  return Math.round((available / dailyAvg) * 10) / 10;
}

export function getRunwayStatus(days) {
  if (days === null || days === undefined) return 'none';
  if (days >= 10) return 'green';
  if (days >= 5) return 'amber';
  return 'red';
}

export function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export function getConfidence(expenses) {
  if (expenses.length === 0) return { level: 'none', label: '' };
  const now = new Date();
  const latest = new Date(expenses[0].timestamp);
  const hoursSince = (now - latest) / (1000 * 60 * 60);

  if (hoursSince < 12) return { level: 'high', label: '' };
  if (hoursSince < 24) return { level: 'medium', label: 'Last logged 12+ hrs ago' };
  if (hoursSince < 48) return { level: 'low', label: 'Last logged yesterday — runway may be off' };
  return { level: 'stale', label: `No logs in ${Math.floor(hoursSince / 24)} days — runway unreliable` };
}

export function getDailyTotals(expenses, days = 7) {
  const now = new Date();
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(dayStart.getDate() - i);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const total = expenses
      .filter(e => {
        const t = new Date(e.timestamp);
        return t >= dayStart && t < dayEnd;
      })
      .reduce((sum, e) => sum + e.amount, 0);

    result.push({
      day: dayStart.toLocaleDateString('en-IN', { weekday: 'short' }),
      total,
    });
  }
  return result;
}
