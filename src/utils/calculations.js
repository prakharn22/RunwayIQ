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
