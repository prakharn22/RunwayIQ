import { useFinanceStore } from './hooks/useFinanceStore';
import Onboarding from './components/Onboarding';
import RunwayDisplay from './components/RunwayDisplay';
import BurnTrend from './components/BurnTrend';
import ExpenseLogger from './components/ExpenseLogger';
import BalanceReset from './components/BalanceReset';
import FixedExpenses from './components/FixedExpenses';
import CrunchMode from './components/CrunchMode';

export default function App() {
  const store = useFinanceStore();

  if (!store.onboarded) {
    return <Onboarding onComplete={store.completeOnboarding} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08090D',
      color: '#E8E9ED',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
    }}>
      <div className="bg-gradient" />

      <div style={{
        maxWidth: '430px',
        margin: '0 auto',
        padding: '1rem 1rem 3rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <div className="animate-fade-in" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 0 1.25rem',
        }}>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#E8E9ED',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Fin<span style={{ color: '#818CF8' }}>Wise</span>
          </h1>
          <button
            onClick={() => {
              if (window.confirm('Reset all data? This cannot be undone.')) {
                store.resetAll();
              }
            }}
            className="btn-ghost"
            style={{ fontSize: '0.75rem' }}
          >
            Reset
          </button>
        </div>

        <RunwayDisplay
          runwayDays={store.runwayDays}
          dailyAvg={store.rollingDailyAvg}
          balance={store.balance}
          confidence={store.confidence}
        />

        <CrunchMode
          runwayDays={store.runwayDays}
          balance={store.balance}
          totalUpcomingFixed={store.totalUpcomingFixed}
          dailyAvg={store.rollingDailyAvg}
          topRepeats={store.topRepeats}
        />

        <BurnTrend
          dailyTotals={store.dailyTotals}
          dailyAvg={store.rollingDailyAvg}
        />

        <ExpenseLogger onAddExpense={store.addExpense} />

        <BalanceReset onAddIncome={store.addIncome} />

        <FixedExpenses
          fixedExpenses={store.fixedExpenses}
          totalUpcoming={store.totalUpcomingFixed}
          onAdd={store.addFixedExpense}
          onDelete={store.deleteFixedExpense}
        />

        {/* Recent expenses */}
        {store.expenses.length > 0 && (
          <div className="glass card-6" style={{ padding: '1.25rem' }}>
            <p style={{ color: '#E8E9ED', fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              Recent
            </p>
            {store.expenses.slice(0, 10).map((exp, i) => (
              <div key={exp.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                animation: `fadeUp 0.3s ease ${i * 0.03}s both`,
              }}>
                <div>
                  <p style={{ color: '#E8E9ED', fontSize: '0.875rem' }}>{exp.note || 'Expense'}</p>
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6875rem' }}>
                    {new Date(exp.timestamp).toLocaleString('en-IN', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#EF4444', fontSize: '0.875rem', fontWeight: '600' }}>
                    -₹{exp.amount.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => store.deleteExpense(exp.id)}
                    className="btn-ghost"
                    style={{ fontSize: '0.875rem', padding: 0 }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
