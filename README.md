# FinWise

**A student finance app that answers one question: how many days will your money last?**

🔗 [Live App](https://runway-iq-murex.vercel.app/)

---

## The Problem

First-year hostel students in Indian colleges receive a fixed monthly allowance: typically ₹3,000 to ₹8,000. Their spending is dominated by daily micro-transactions (chai, autos, canteen, prints) that are individually trivial but collectively devastating.

By the third or fourth week, many students face a predictable crisis: money runs out before the next transfer. The problem isn't that they don't track expenses, it's that no tool answers the only question that matters: **how many days can I survive on what I have left?**

## The Insight

Existing finance apps show you the past. FinWise shows you the future.

A bank balance of ₹1,200 means nothing without context. FinWise turns that into: "At your current pace, this lasts 4 more days. Cut back 30%, and it stretches to 6."

## What It Does

- **Runway Number** : One prominent number showing days remaining, calculated from your balance, daily burn rate, and upcoming fixed expenses. Color-coded green/amber/red.
- **3-Second Logging** : Amount, optional note, done. Quick-tap tags (Chai, Auto, Canteen) reduce friction further.
- **Crunch Mode** : When runway drops below 5 days, the app surfaces stretch scenarios and your most frequent spending categories to suggest what to cut.
- **Burn Trend** : 7-day spend chart showing daily totals against your average, so you can see if spending is trending up.
- **Confidence Indicator** : If you haven't logged in 24+ hours, the runway number fades with a warning. The app knows when it doesn't have enough data.

## Key Product Decisions

**Why no bank integration?** Zero permissions = zero trust barrier. Students are privacy-conscious and skeptical of apps that ask for SMS or bank access. Manual logging is a deliberate trade-off: we sacrifice data completeness for adoption.

**Why no categories?** Every budgeting app forces you to categorize. Students don't think in categories, they think in moments. The quick-tag system captures enough context without the overhead.

**Why the runway framing instead of budget tracking?** A budget tells you what you *should* spend. A runway tells you what *will* happen if you don't change. The second framing creates urgency without guilt.

## Honest Limitations

- **Manual logging fatigue** : Without bank integration, compliance will decay over time. The confidence indicator mitigates this but doesn't solve it.
- **Feature, not platform** : The runway calculation is arguably a feature that could live inside any bank app. The defensibility is in the focus and the student-specific UX, not in a technical moat.
- **No monetization path** : In its current form, there's no clear business model. This is a product insight looking for a business model, not the other way around.

## Tech Stack

React + Vite, deployed on Vercel. No backend, all data lives in localStorage. Designed mobile-first (430px max-width).

## Author

**Prakhar Nanda** | B.Tech, Biological Sciences and Bioengineering, IIT Kanpur (2026)

Built as part of a case competition by ProduScope '25 (E-Cell, IIT Guwahati).
