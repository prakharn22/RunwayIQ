import { useState } from 'react';

const steps = [
  {
    title: 'Know your runway',
    desc: 'FinWise tells you one thing — how many days your money will last at your current spending pace.',
  },
  {
    title: 'Log in 3 seconds',
    desc: 'Tap an amount, hit log. No categories, no receipts, no friction. Just the number.',
  },
  {
    title: 'Get warned early',
    desc: 'When your runway drops below 5 days, Crunch Mode kicks in with a plan to stretch what\'s left.',
  },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [animKey, setAnimKey] = useState(0);

  const nextStep = () => {
    setAnimKey(k => k + 1);
    setStep(s => s + 1);
  };

  const isBalanceStep = step === steps.length;

  if (isBalanceStep) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#08090D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}>
        <div className="bg-gradient" />
        <div key="balance" className="animate-scale-in" style={{
          maxWidth: '380px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{ color: '#E8E9ED', fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            How much do you have right now?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Your current balance — cash, UPI, whatever you can spend today.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '2rem', fontWeight: '600' }}>₹</span>
            <input
              type="number"
              inputMode="decimal"
              placeholder="5000"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
              className="input-glass"
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                width: '200px',
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '0.875rem',
                background: 'rgba(255,255,255,0.03)',
              }}
            />
          </div>

          <button
            className="btn-primary"
            disabled={!amount || parseFloat(amount) <= 0}
            onClick={() => {
              const num = parseFloat(amount);
              if (num > 0) onComplete(num);
            }}
            style={{ width: '100%' }}
          >
            Start tracking →
          </button>
        </div>
      </div>
    );
  }

  const s = steps[step];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08090D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div className="bg-gradient" />
      <div key={animKey} className="animate-slide-left" style={{
        maxWidth: '380px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <h2 style={{
          color: '#E8E9ED',
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>
          {s.title}
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '1rem',
          lineHeight: 1.65,
          marginBottom: '2.5rem',
        }}>
          {s.desc}
        </p>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === step ? '1.75rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '0.25rem',
              background: i === step
                ? 'linear-gradient(135deg, #818CF8, #6366F1)'
                : 'rgba(255,255,255,0.08)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          ))}
        </div>

        <button className="btn-primary" onClick={nextStep} style={{ width: '100%' }}>
          {step === steps.length - 1 ? 'Set up my balance →' : 'Next'}
        </button>

        <button className="btn-ghost" onClick={() => setStep(steps.length)} style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}>
          Skip intro
        </button>
      </div>
    </div>
  );
}
