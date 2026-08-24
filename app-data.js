/* =========================================================================
   APP DATA — mock user profile + derived calculations + content datasets
   This is the ONLY file a real onboarding integration would need to replace.
   Everything downstream (index.html) reads from window.APP_DATA.
   ========================================================================= */

/* ---------- 1. MOCK USER PROFILE (would come from onboarding.html) ---------- */
const userProfile = {
  name: "Megha",
  avatar: "explorer",          // id of chosen avatar, see AVATARS below
  age: 32,
  targetRetirementAge: 55,
  income: 850000,              // monthly, JPY
  monthlyExpenses: 420000,
  savings: 5000000,            // cash + deposits
  investments: 3200000,        // total invested assets today
  currentMonthlyInvestment: 50000,
  nisaUsage: 0.45,             // 0–1, share of annual NISA allowance used
  nisaAnnualLimit: 3600000,
  debt: 1000000,
  riskTolerance: "moderate",   // "cautious" | "moderate" | "adventurous"
  goals: ["buy_home", "retirement", "travel"],
  homeDownPaymentTarget: 8000000,
  level: 14,
  xp: 3150,
  xpForNextLevel: 3500,
  streakWeeks: 26,
  financialHealth: 72,
  powers: { savings: 81, investing: 64, optimization: 73, goalReadiness: 58, freedom: 41 },
  financialPower: { total: 78, savings: 84, investing: 68, optimization: 76, protection: 72, goalReadiness: 81 },
};

/* ---------- 2. AVATARS — replaces anxious/avoidant/secure with player-chosen identity ---------- */
const AVATARS = [
  { id: "explorer",   name: "Explorer",   icon: "🧭", color: "var(--ink-indigo)",    blurb: "Curious first, cautious second. You like understanding the whole map before picking a path." },
  { id: "strategist", name: "Strategist", icon: "♟️", color: "var(--denim-ledger)",   blurb: "You weigh trade-offs carefully. Big moves happen after the numbers make sense." },
  { id: "builder",    name: "Builder",    icon: "🏗️", color: "var(--moss-growth)",    blurb: "Slow, steady, compounding. You'd rather lay one brick a week than gamble on one big one." },
  { id: "dreamer",    name: "Dreamer",    icon: "🌙", color: "var(--gold-thread)",    blurb: "Money is a means to a life you can picture clearly. Goals matter more than spreadsheets." },
  { id: "adventurer", name: "Adventurer", icon: "🗺️", color: "var(--coral-pulse)",    blurb: "You're comfortable with a bit of risk if it opens more doors later." },
  { id: "investor",   name: "Investor",   icon: "📈", color: "var(--dim-ember)",      blurb: "Patient capital is your love language. You're in this for decades, not weeks." },
  { id: "creator",    name: "Creator",    icon: "🎨", color: "var(--coral-pulse)",    blurb: "You want money to fund what you make — a business, a craft, a body of work." },
  { id: "custom",     name: "Design your own", icon: "✨", color: "var(--wisteria-wand)", blurb: "None of these quite fit? Describe your own pattern with money during onboarding." },
];

/* ---------- 3. DERIVED WORLD NUMBERS ---------- */
function computeWorld(p) {
  const monthlySurplus = p.income - p.monthlyExpenses;
  const netWorth = p.savings + p.investments - p.debt;
  const unassignedMonthly = Math.max(0, monthlySurplus - p.currentMonthlyInvestment - Math.round(monthlySurplus * 0.66));
  // ^ illustrative split: some surplus already quietly becomes savings; whatever's left is "unassigned"
  const monthlyInvestmentCapacity = monthlySurplus - p.currentMonthlyInvestment;
  return { monthlySurplus, netWorth, unassignedMonthly, monthlyInvestmentCapacity };
}

function generateInsights(p, world) {
  const insights = [];
  insights.push(`You have ~¥${world.unassignedMonthly.toLocaleString()}/month that isn't assigned to anything yet.`);
  if (p.nisaUsage < 1) {
    insights.push(`You're already investing, but you're only using ${Math.round(p.nisaUsage * 100)}% of this year's NISA allowance.`);
  }
  if (p.goals.includes("buy_home")) {
    const monthlyTowardHome = Math.max(20000, world.unassignedMonthly + 40000);
    const monthsToHome = Math.ceil(p.homeDownPaymentTarget / monthlyTowardHome);
    const years = (monthsToHome / 12).toFixed(1);
    insights.push(`At your current pace, Home Quest reaches its ¥${(p.homeDownPaymentTarget/1000000).toFixed(0)}M target in roughly ${years} years — this is an estimate, not a promise.`);
  }
  if (p.debt > 0) {
    insights.push(`Clearing your ¥${(p.debt/1000000).toFixed(1)}M debt would free up room for other goals sooner.`);
  }
  return insights;
}

/* ---------- 4. QUESTS ("Your Journey") ---------- */
const QUESTS = [
  {
    id: "emergency_fund", icon: "🛟", title: "Emergency Fund",
    goal: "Build a 6-month safety buffer", target: 2520000, current: 2520000 * 0.7,
    xp: 200, difficulty: "Easy", estTime: "3 months", impact: "High",
    actions: ["Automate a weekly transfer to a separate savings pocket", "Pause discretionary spending until this is full"],
    sim: { label: "Monthly contribution", min: 10000, max: 100000, def: 40000, months: 12, returnPct: 0.5, taxAdvantaged: false },
  },
  {
    id: "nisa_ninja", icon: "🌱", title: "NISA Ninja",
    goal: "Maximize your NISA allowance", target: 3600000, current: 3600000 * 0.45,
    xp: 500, difficulty: "Medium", estTime: "Ongoing", impact: "High",
    actions: ["Increase monthly NISA contribution", "Check allocation matches your risk tolerance"],
    sim: { label: "Monthly investment", min: 50000, max: 200000, def: 50000, years: 23, returnPct: 3, taxAdvantaged: true },
  },
  {
    id: "savings_builder", icon: "💰", title: "Savings Builder",
    goal: "Build ¥10M net worth", target: 10000000, current: 7200000,
    xp: 300, difficulty: "Medium", estTime: "4–6 years", impact: "High",
    actions: ["Keep your current savings rate steady", "Review spending quarterly"],
    sim: { label: "Monthly savings", min: 20000, max: 150000, def: 60000, years: 5, returnPct: 1.5, taxAdvantaged: false },
  },
  {
    id: "travel_adventure", icon: "✈️", title: "Travel Adventure",
    goal: "Fund ¥500,000/year of travel without touching other goals", target: 500000, current: 220000,
    xp: 150, difficulty: "Easy", estTime: "6 months", impact: "Medium",
    actions: ["Set up a dedicated travel pocket", "Redirect one subscription you don't use"],
    sim: { label: "Monthly set-aside", min: 5000, max: 60000, def: 25000, months: 12, returnPct: 0.3, taxAdvantaged: false },
  },
  {
    id: "jimny_quest", icon: "🚗", title: "Jimny Quest",
    goal: "Save for a car without a loan", target: 3200000, current: 900000,
    xp: 250, difficulty: "Medium", estTime: "3 years", impact: "Medium",
    actions: ["Compare financing options before deciding", "See this in Big Decisions for the full risk picture"],
    sim: { label: "Monthly set-aside", min: 10000, max: 100000, def: 45000, years: 3, returnPct: 1, taxAdvantaged: false },
  },
  {
    id: "future_family", icon: "👶", title: "Future Family",
    goal: "Build a ¥3M cushion for a growing family", target: 3000000, current: 400000,
    xp: 300, difficulty: "Medium", estTime: "5 years", impact: "High",
    actions: ["Check family-related insurance coverage", "Set a dedicated monthly transfer"],
    sim: { label: "Monthly contribution", min: 10000, max: 80000, def: 30000, years: 5, returnPct: 1, taxAdvantaged: false },
  },
  {
    id: "retirement_freedom", icon: "🌅", title: "Retirement Freedom",
    goal: "Reach financial independence by 55", target: 100000000, current: 8200000,
    xp: 800, difficulty: "Hard", estTime: "23 years", impact: "Very high",
    actions: ["Keep contributing to NISA and iDeCo", "Revisit your target return every year"],
    sim: { label: "Monthly investment", min: 50000, max: 300000, def: 100000, years: 23, returnPct: 5, taxAdvantaged: true },
  },
  {
    id: "wealth_builder", icon: "📈", title: "Wealth Builder",
    goal: "Grow invested assets beyond savings", target: 20000000, current: 3200000,
    xp: 400, difficulty: "Hard", estTime: "10+ years", impact: "High",
    actions: ["Diversify beyond your current two funds", "Explore Grow ideas for what's missing"],
    sim: { label: "Monthly investment", min: 30000, max: 250000, def: 80000, years: 10, returnPct: 6, taxAdvantaged: false },
  },
];

/* ---------- 5. SUGGESTED vs PERSONALIZED GOALS ---------- */
const SUGGESTED_GOALS = [
  "Build a 6-month emergency fund",
  "Maximize NISA",
  "Invest ¥100,000/month",
  "Pay off debt",
  "Save for a home",
  "Prepare for retirement",
  "Build ¥10M net worth",
  "Reach financial independence",
];

function generatePersonalizedGoals(p, world) {
  const goals = [];
  if (world.unassignedMonthly > 30000) {
    goals.push({ title: "Put your idle cash to work", reason: `You have ~¥${world.unassignedMonthly.toLocaleString()}/month sitting unassigned — this could be working toward a goal.`, icon: "💤➡️💰" });
  }
  if (p.monthlyExpenses / p.income > 0.55 && p.savings < p.monthlyExpenses * 3) {
    goals.push({ title: "Create your first ¥1M safety buffer", reason: "Your spending relative to income leaves less room than most goals need — a buffer protects the rest of your plan.", icon: "🛟" });
  }
  if (p.goals.includes("buy_home")) {
    goals.push({ title: `Home Quest — Build your ¥${(p.homeDownPaymentTarget/1000000).toFixed(0)}M down payment`, reason: "You told us buying a home matters to you — this is sized to a realistic Tokyo-area down payment.", icon: "🏠" });
  }
  if (p.goals.includes("retirement") && p.targetRetirementAge < 60) {
    goals.push({ title: "Freedom Quest — Reach ¥100M invested assets", reason: `You're aiming to retire at ${p.targetRetirementAge} — this is the scale of assets that typically supports that.`, icon: "🌅" });
  }
  if (p.nisaUsage < 0.8) {
    goals.push({ title: "Close the NISA gap", reason: `You're using ${Math.round(p.nisaUsage*100)}% of this year's allowance — the rest expires unused if it's not filled.`, icon: "🌱" });
  }
  return goals;
}

/* ---------- 6. WEEKLY MISSIONS ---------- */
const WEEKLY_MISSIONS = [
  { id: "invest50k", label: "Invest ¥50,000", xp: 150, done: true },
  { id: "nisa_quest", label: "Complete NISA Quest check-in", xp: 200, done: true },
  { id: "review_spend", label: "Review spending", xp: 150, done: false },
  { id: "explore_opp", label: "Explore one optimization opportunity", xp: 150, done: false },
];

/* ---------- 7. OPPORTUNITIES ("Optimize") ---------- */
const OPPORTUNITIES = [
  { icon: "🏠", title: "You may qualify for a lower-rate mortgage", why: "Based on your income, existing debt, and current interest-rate environment.", benefit: "Potentially ¥18,000–¥32,000/month lower repayment.", action: "Compare 3 pre-qualified lenders (5 minutes).", confidence: "Moderate — based on public rate data, not a guaranteed offer.", downside: "Refinancing may involve one-off fees.", effort: "Medium", lifetimeValue: 7200000 },
  { icon: "🚗", title: "Jimny Quest — cheaper financing may exist", why: "Your Jimny Quest is funded partly by savings and partly by a hypothetical loan.", benefit: "Comparing financing options could reduce total interest paid.", action: "See loan comparisons in Big Decisions.", confidence: "Illustrative — actual rates depend on your credit profile.", downside: "None if you're paying cash; relevant only if financing part of it.", effort: "Low", lifetimeValue: 180000 },
  { icon: "🧘", title: "Local wellness subsidies", why: "Based on your location and stated wellness-related goals.", benefit: "Possible partial reimbursement on gym or health costs.", action: "Check eligibility on your municipality's site.", confidence: "Low–moderate — varies significantly by ward/city.", downside: "May require paperwork; savings are usually modest.", effort: "Low", lifetimeValue: 240000 },
  { icon: "🌱", title: "Unused NISA capacity", why: `You've used ${Math.round(userProfile.nisaUsage*100)}% of this year's ¥3.6M allowance.`, benefit: `Up to ¥${Math.round(userProfile.nisaAnnualLimit*(1-userProfile.nisaUsage)).toLocaleString()} more can grow completely tax-free this year.`, action: "Increase your monthly NISA contribution in Grow.", confidence: "High — this is your own account data.", downside: "Ties up cash that would otherwise stay liquid.", effort: "Low", lifetimeValue: 3270000 },
  { icon: "💳", title: "Your card's rewards may not fit your spending", why: "Your top spending categories don't align well with your current card's reward structure.", benefit: "A better-matched card could return more per year on the same spending.", action: "Compare 2 alternatives suited to your spending mix.", confidence: "Moderate — depends on your actual monthly categories.", downside: "Switching cards can involve a hard credit check.", effort: "Low", lifetimeValue: 150000 },
  { icon: "🏦", title: "Idle cash could earn more", why: "A portion of your savings sits in a low-interest ordinary account.", benefit: "Moving part of it to a higher-yield option could add meaningfully over a year.", action: "Review a high-yield savings option alongside your emergency fund needs.", confidence: "High — based on your current balances.", downside: "Slightly less instantly accessible depending on the product.", effort: "Low", lifetimeValue: 480000 },
];

const INTELLIGENCE_HERO = {
  headline: "You found ¥84,000",
  sub: "Potential annual optimization",
  basedOn: ["Your spending", "Your current accounts", "Your goals", "Available products/programs"],
  amount: 84000,
};

/* ---------- 8. WEALTH GARDEN (Grow) ---------- */
function getWealthGarden(p) {
  // Illustrative split of total invested assets across categories
  const total = p.investments;
  return [
    { icon: "🌱", label: "Cash", pct: 0.10, value: total * 0.10 },
    { icon: "🌿", label: "Bonds", pct: 0.08, value: total * 0.08 },
    { icon: "🌳", label: "Index Funds", pct: 0.52, value: total * 0.52 },
    { icon: "🌳", label: "Global Equity", pct: 0.22, value: total * 0.22 },
    { icon: "🌲", label: "Long-term Investments", pct: 0.08, value: total * 0.08 },
  ];
}

const INVESTMENT_CATEGORIES = [
  { icon: "📇", name: "Index funds", blurb: "Broad, low-cost exposure to a whole market at once." },
  { icon: "📦", name: "ETFs", blurb: "Traded like a stock, often tracks an index or theme." },
  { icon: "🏢", name: "Stocks", blurb: "Ownership in a single company — higher concentration, higher movement." },
  { icon: "📜", name: "Bonds", blurb: "Lending money for steady, usually lower, returns." },
  { icon: "🏘️", name: "REITs", blurb: "Real estate exposure without buying property directly." },
];

/* ---------- 9. MARKET THEMES ("The World Is Moving") ---------- */
const MARKET_THEMES = [
  { id: "ai_infra", name: "AI Infrastructure", why: "Data-center and compute buildout continues to accelerate globally.", exposure: 14, risk: "Moderate–high", consideration: "You already hold some exposure through global equity funds." },
  { id: "semis", name: "Semiconductors", why: "Memory and chip demand is rising alongside AI and device refresh cycles.", exposure: 12, risk: "High", consideration: "A cyclical sector — moves more than the broad market in both directions." },
  { id: "memory", name: "Memory", why: "Memory chip pricing has been recovering after an extended downturn.", exposure: 6, risk: "High", consideration: "Concentrated bets here carry more movement than a diversified fund." },
  { id: "cloud", name: "Cloud Computing", why: "Enterprise spend on cloud infrastructure keeps compounding.", exposure: 10, risk: "Moderate", consideration: "Largely captured already through your global equity holdings." },
  { id: "energy", name: "Energy", why: "Energy transition and traditional supply both remain active themes.", exposure: 3, risk: "Moderate", consideration: "Currently a small slice of your overall mix." },
  { id: "robotics", name: "Robotics", why: "Automation adoption is expanding beyond manufacturing.", exposure: 2, risk: "High", consideration: "An emerging, higher-movement theme — not yet a core holding for you." },
  { id: "healthcare", name: "Healthcare", why: "Aging demographics support long-run structural demand.", exposure: 5, risk: "Low–moderate", consideration: "A defensive theme relative to your other holdings." },
  { id: "japan", name: "Japan", why: "Corporate governance reform continues to reshape Japanese equities.", exposure: 18, risk: "Moderate", consideration: "You already hold meaningful exposure through your Japan Equity fund." },
  { id: "us_tech", name: "US Technology", why: "Continues to lead global equity performance over the last decade.", exposure: 24, risk: "Moderate–high", consideration: "Your largest single-country theme exposure today." },
  { id: "em", name: "Emerging Markets", why: "Valuations are lower, but currency and policy risk are higher.", exposure: 4, risk: "High", consideration: "A small, diversifying slice relative to developed markets." },
];

/* ---------- 10. INVESTMENT QUESTS (education, not trading) ---------- */
const INVESTMENT_QUESTS = [
  { icon: "🌱", title: "Beginner Investor", desc: "Learn what an index fund is.", xp: 100 },
  { icon: "📊", title: "Diversification Quest", desc: "Build a diversified hypothetical portfolio.", xp: 300 },
  { icon: "🇯🇵", title: "NISA Ninja", desc: "Optimize your NISA allocation.", xp: 500 },
  { icon: "🌎", title: "Global Explorer", desc: "Understand global diversification.", xp: 250 },
];

/* ---------- 11. BADGES ---------- */
const BADGES = [
  { icon: "🛟", name: "Buffer Built", earned: true },
  { icon: "🌱", name: "First NISA Contribution", earned: true },
  { icon: "🔥", name: "12-Week Streak", earned: true },
  { icon: "🔥", name: "26-Week Streak", earned: true },
  { icon: "📊", name: "Diversified", earned: false },
  { icon: "🏠", name: "Home Quest: 50%", earned: false },
  { icon: "🌅", name: "Freedom: 10%", earned: true },
  { icon: "💳", name: "Debt Reducer", earned: false },
];

/* ---------- 12. FAIRY GODMOTHER — contextual nudges per tab ---------- */
const FAIRY_NUDGES = {
  home: "You're closer to your home goal than you think — want me to show you the math?",
  playground: "I noticed you're keeping more cash than your emergency fund needs. Want to see what happens if we invest the difference?",
  optimize: "You have three optimizations sitting unused. The NISA one alone is worth checking this week.",
  grow: "Your global equity exposure is doing a lot of work already — Japan and US Technology overlap more than people usually expect.",
  profile: "26 weeks is a real streak. Most people don't get past week 4 — however you got here, it's working.",
};

/* ---------- expose everything ---------- */
window.APP_DATA = {
  userProfile, AVATARS, computeWorld, generateInsights, QUESTS,
  SUGGESTED_GOALS, generatePersonalizedGoals, WEEKLY_MISSIONS, OPPORTUNITIES,
  INTELLIGENCE_HERO, getWealthGarden, INVESTMENT_CATEGORIES, MARKET_THEMES,
  INVESTMENT_QUESTS, BADGES, FAIRY_NUDGES,
};

/* ---------- localStorage helpers (light local state persistence) ---------- */
window.APP_STORAGE = {
  saveAvatar(id) { localStorage.setItem("lokhi_avatar", id); },
  getAvatar() { return localStorage.getItem("lokhi_avatar") || userProfile.avatar; },
  saveWeeklyState(state) { localStorage.setItem("lokhi_weekly", JSON.stringify(state)); },
  getWeeklyState() {
    try { return JSON.parse(localStorage.getItem("lokhi_weekly")) || null; } catch(e){ return null; }
  },
};
