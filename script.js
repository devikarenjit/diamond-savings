const STORAGE_KEY = "diamond-savings-dashboard-v1";

const $ = {
  date: document.getElementById("date"),
  goalAmount: document.getElementById("goal-amount"),
  transactionForm: document.getElementById("transactionForm"),
  amount: document.getElementById("amount"),
  type: document.getElementById("type"),
  category: document.getElementById("category"),
  notes: document.getElementById("notes"),
  saveBtn: document.getElementById("saveBtn"),
  formError: document.getElementById("formError"),
  searchInput: document.getElementById("searchInput"),
  transactionList: document.getElementById("transactionList"),
  currentBalance: document.getElementById("current-balance"),
  totalIncome: document.getElementById("total-income"),
  totalExpenses: document.getElementById("total-expenses"),
  savingsFill: document.getElementById("savings-fill"),
  savingsPercent: document.getElementById("savings-percent"),
  goalMessage: document.getElementById("goalMessage"),
  goalInput: document.getElementById("goalInput"),
  categoryList: document.getElementById("category-list"),
  weeklyList: document.getElementById("weekly-list"),
  topCategory: document.getElementById("topCategory"),
  incomeVsExpenses: document.getElementById("incomeVsExpenses"),
  frequentType: document.getElementById("frequentType"),
  weekComparison: document.getElementById("weekComparison"),
  openFormBtn: document.getElementById("openFormBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  goalBtn: document.getElementById("goalBtn"),
  splashScreen: document.getElementById("splash-screen"),
  appRoot: document.querySelector(".dashboard"),
  homeSubtitle: document.getElementById("homeSubtitle"),
  pageTitle: document.getElementById("pageTitle"),
  profileStatusLabel: document.getElementById("profile-status-label"),
  profileStatusCopy: document.getElementById("profile-status-copy"),
  profileBadge: document.getElementById("profileBadge"),
  saveProfileBtn: document.getElementById("saveProfileBtn"),
  profileError: document.getElementById("profileError"),
  profileName: document.getElementById("profileName"),
  profileLocation: document.getElementById("profileLocation"),
  profileDependents: document.getElementById("profileDependents"),
  profileFamilyResponsibilities: document.getElementById("profileFamilyResponsibilities"),
  incomeSalary: document.getElementById("incomeSalary"),
  incomeFreelance: document.getElementById("incomeFreelance"),
  incomeBusiness: document.getElementById("incomeBusiness"),
  incomePassive: document.getElementById("incomePassive"),
  expenseHousing: document.getElementById("expenseHousing"),
  expenseFood: document.getElementById("expenseFood"),
  expenseTransport: document.getElementById("expenseTransport"),
  expenseUtilities: document.getElementById("expenseUtilities"),
  goalShortTerm: document.getElementById("goalShortTerm"),
  goalLongTerm: document.getElementById("goalLongTerm"),
  donationCause: document.getElementById("donationCause"),
  donationPercent: document.getElementById("donationPercent"),
  savingsRate: document.getElementById("savingsRate"),
  consistencyScore: document.getElementById("consistencyScore"),
  savingStreak: document.getElementById("savingStreak"),
  categoryPieChart: document.getElementById("category-pie-chart"),
  transactionHistory: document.getElementById("transactionHistory"),
  homeLogoLink: document.getElementById("homeLogoLink"),
  navDropdowns: document.querySelectorAll(".nav-dropdown"),
  leaderboardScore: document.getElementById("leaderboardScore"),
  locationScoreAdjustment: document.getElementById("locationScoreAdjustment"),
  scoreFormula: document.getElementById("scoreFormula"),
  savingBehaviorSummary: document.getElementById("savingBehaviorSummary"),
  leaderboardRank: document.getElementById("leaderboardRank"),
  topDonor: document.getElementById("topDonor"),
  totalDonations: document.getElementById("totalDonations"),
  donationPercentIncome: document.getElementById("donationPercentIncome"),
  donationStreak: document.getElementById("donationStreak"),
  donationInsight: document.getElementById("donationInsight"),
  nearbyRanks: document.getElementById("nearbyRanks"),
  top5Leaders: document.getElementById("top5Leaders"),
  userTier: document.getElementById("userTier"),
  pointsEarned: document.getElementById("pointsEarned"),
  rewardEligibility: document.getElementById("rewardEligibility"),
  rewardProgress: document.getElementById("rewardProgress"),
  rewardUnlockHint: document.getElementById("rewardUnlockHint"),
  advancedInsights: document.getElementById("advancedInsights"),
  boostStatus: document.getElementById("boostStatus"),
  competitionStatus: document.getElementById("competitionStatus"),
  premiumUntil: document.getElementById("premiumUntil"),
  settingsDisplayName: document.getElementById("settingsDisplayName"),
  settingsPlan: document.getElementById("settingsPlan"),
  autoDonateToggle: document.getElementById("autoDonateToggle"),
  darkModeToggle: document.getElementById("darkModeToggle"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  settingsMessage: document.getElementById("settingsMessage"),
  netflixProgressBar: document.getElementById("netflixProgressBar"),
  netflixProgressText: document.getElementById("netflixProgressText"),
  netflixProgressFill: document.getElementById("netflixProgressFill"),
  settingsPlanBadge: document.getElementById("settingsPlanBadge"),
  settingsThemeBadge: document.getElementById("settingsThemeBadge"),
  settingsDonateBadge: document.getElementById("settingsDonateBadge"),
  donationProofAmount: document.getElementById("donationProofAmount"),
  donationProofPlatform: document.getElementById("donationProofPlatform"),
  donationProofType: document.getElementById("donationProofType"),
  donationProofData: document.getElementById("donationProofData"),
  donationProofDataLabel: document.getElementById("donationProofDataLabel"),
  donationProofImage: document.getElementById("donationProofImage"),
  donationProofImageNote: document.getElementById("donationProofImageNote"),
  donationProofImagePreview: document.getElementById("donationProofImagePreview"),
  proofFieldsImage: document.getElementById("proofFieldsImage"),
  proofFieldsData: document.getElementById("proofFieldsData"),
  submitDonationProofBtn: document.getElementById("submitDonationProofBtn"),
  proofStatusMessage: document.getElementById("proofStatusMessage"),
  donationProofList: document.getElementById("donationProofList"),
  summaryParagraph: document.getElementById("summaryParagraph")
};


const getDefaultProfile = () => ({
  name: "",
  displayName: "",
  location: "",
  dependents: 0,
  familyResponsibilities: "",
  plan: "free",
  income: { salary: 0, freelance: 0, business: 0, passive: 0 },
  expenses: { housing: 0, food: 0, transport: 0, utilities: 0 },
  goals: { shortTerm: "", longTerm: "" },
  donation: { cause: "", percent: 0, autoDonate: true },
  preferences: { darkMode: false }
});


const generateCreativeAlias = () => {
  const adjectives = ["Radiant", "Bold", "Kind", "Swift", "Shining", "Calm", "Brave", "Sparkling"];
  const nouns = ["Diamond", "Saver", "Phoenix", "Comet", "Wave", "Star", "Trail", "Beacon"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const code = Math.floor(100 + Math.random() * 900);
  return `${adjective}${noun}${code}`;
};

const hasIncomeSource = (profile) =>
  [profile.income.salary, profile.income.freelance, profile.income.business, profile.income.passive].some((value) => Number(value) > 0);

const isProfileComplete = (profile) => Boolean(profile.name.trim() && profile.displayName.trim() && profile.location.trim() && hasIncomeSource(profile));

const dataStore = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { transactions: [], monthlyGoal: 0, profile: getDefaultProfile(), profileCompleted: false, premiumUnlockUntil: null, leaderboardAlias: generateCreativeAlias(), donationLastProcessedMonth: null, proofs: [] };

      const parsed = JSON.parse(raw);
      return {
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        monthlyGoal: Number(parsed.monthlyGoal) || 0,
        profile: parsed.profile ? { ...getDefaultProfile(), ...parsed.profile,
          income: { ...getDefaultProfile().income, ...(parsed.profile.income || {}) },
          expenses: { ...getDefaultProfile().expenses, ...(parsed.profile.expenses || {}) },
          goals: { ...getDefaultProfile().goals, ...(parsed.profile.goals || {}) },
          donation: { ...getDefaultProfile().donation, ...(parsed.profile.donation || {}) },
          preferences: { ...getDefaultProfile().preferences, ...(parsed.profile.preferences || {}) } } : getDefaultProfile(),
        profileCompleted: Boolean(parsed.profileCompleted),
        premiumUnlockUntil: parsed.premiumUnlockUntil || null,
        leaderboardAlias: parsed.leaderboardAlias || generateCreativeAlias(),
        donationLastProcessedMonth: parsed.donationLastProcessedMonth || null,
        proofs: Array.isArray(parsed.proofs) ? parsed.proofs : []
      };
    } catch {
      return { transactions: [], monthlyGoal: 0, profile: getDefaultProfile(), profileCompleted: false, premiumUnlockUntil: null, leaderboardAlias: generateCreativeAlias(), donationLastProcessedMonth: null, proofs: [] };
    }
  },

  save(state) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ transactions: state.transactions, monthlyGoal: state.monthlyGoal, profile: state.profile, profileCompleted: state.profileCompleted, premiumUnlockUntil: state.premiumUnlockUntil, leaderboardAlias: state.leaderboardAlias, donationLastProcessedMonth: state.donationLastProcessedMonth, proofs: state.proofs })
    );
  }
};

const initialData = dataStore.load();

const state = {
  ...initialData,
  profile: initialData.profile || getDefaultProfile(),
  profileCompleted: Boolean(initialData.profileCompleted),
  editingId: null,
  currentView: "overview",
  premiumUnlockUntil: initialData.premiumUnlockUntil || null,
  leaderboardAlias: initialData.leaderboardAlias || generateCreativeAlias(),
  donationLastProcessedMonth: initialData.donationLastProcessedMonth || null,
  proofs: Array.isArray(initialData.proofs) ? initialData.proofs : []
};

const formatters = {
  currency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR"
    }).format(value || 0).replace("₹", "Rs ");
  }
};

const transactionService = {
  add(payload) {
    state.transactions.push({ id: Date.now(), ...payload });
    this.persist();
  },

  update(id, payload) {
    state.transactions = state.transactions.map((transaction) =>
      transaction.id === id ? { ...transaction, ...payload } : transaction
    );
    this.persist();
  },

  remove(id) {
    state.transactions = state.transactions.filter((transaction) => transaction.id !== id);
    this.persist();
  },

  findById(id) {
    return state.transactions.find((transaction) => transaction.id === id);
  },

  persist() {
    dataStore.save(state);
  }
};

const analytics = {
  totals(transactions) {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") acc.income += transaction.amount;
        else acc.expenses += transaction.amount;
        return acc;
      },
      { income: 0, expenses: 0 }
    );
  },

  categoryTotals(transactions) {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {});
  },

  dailyExpenseAmount(transactions, dateKey) {
    return transactions
      .filter((transaction) => transaction.type === "expense" && transaction.date === dateKey)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  },

  weeklyExpenseComparison(transactions) {
    const now = new Date();
    const startCurrentWeek = new Date(now);
    startCurrentWeek.setDate(now.getDate() - now.getDay());
    startCurrentWeek.setHours(0, 0, 0, 0);

    const startLastWeek = new Date(startCurrentWeek);
    startLastWeek.setDate(startCurrentWeek.getDate() - 7);

    const thisWeek = transactions
      .filter((transaction) => {
        const d = new Date(transaction.date);
        return transaction.type === "expense" && d >= startCurrentWeek;
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const lastWeek = transactions
      .filter((transaction) => {
        const d = new Date(transaction.date);
        return transaction.type === "expense" && d >= startLastWeek && d < startCurrentWeek;
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return { thisWeek, lastWeek };
  },

  savingsBehaviorMetrics(transactions) {
    const totals = this.totals(transactions);
    const netSavings = Math.max(0, totals.income - totals.expenses);
    const savingsRate = totals.income > 0 ? (netSavings / totals.income) * 100 : 0;

    const dailyNetMap = transactions.reduce((acc, transaction) => {
      const key = transaction.date;
      if (!acc[key]) acc[key] = { income: 0, expense: 0 };
      acc[key][transaction.type] += transaction.amount;
      return acc;
    }, {});

    const dateKeys = Object.keys(dailyNetMap).sort();

    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    while (true) {
      const key = toDateKey(cursor);
      const day = dailyNetMap[key];
      if (day && day.income - day.expense > 0) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    const last28Days = Array.from({ length: 28 }, (_, index) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - index);
      return toDateKey(d);
    });

    const positiveDays = last28Days.filter((key) => {
      const day = dailyNetMap[key];
      return day && day.income - day.expense > 0;
    }).length;

    const consistency = Math.round((positiveDays / 28) * 100);

    return {
      savingsRate,
      consistency,
      streak,
      netSavings,
      trackedDays: dateKeys.length
    };
  },

  localAverageIncome(location) {
    const map = {
      "mumbai": 55000,
      "delhi": 50000,
      "bangalore": 60000,
      "chennai": 48000,
      "abu dhabi": 15000,
      "dubai": 18000
    };

    if (!location) return 45000;
    const key = location.trim().toLowerCase();
    return map[key] || 45000;
  },

  donationAmount(transactions) {
    return transactions
      .filter((transaction) => transaction.type === "expense" && ["donation", "charity", "help"].some((tag) => transaction.category.toLowerCase().includes(tag)))
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  },
  donationStreakMonths(transactions) {
    const donationMonths = new Set(
      transactions
        .filter((transaction) => transaction.type === "expense" && ["donation", "charity", "help"].some((tag) => transaction.category.toLowerCase().includes(tag)))
        .map((transaction) => {
          const d = new Date(transaction.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        })
    );

    let streak = 0;
    const cursor = new Date();
    cursor.setDate(1);

    while (true) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
      if (!donationMonths.has(key)) break;
      streak += 1;
      cursor.setMonth(cursor.getMonth() - 1);
    }

    return streak;
  },
  donationProofTotals(proofs) {
    return (proofs || []).reduce((acc, proof) => {
      const amount = Number(proof.amount || 0);
      if (proof.status === "verified") acc.verified += amount;
      if (proof.status === "pending") acc.pending += amount;
      return acc;
    }, { verified: 0, pending: 0 });
  },

  leaderboardScore(profile, transactions) {
    const totals = this.totals(transactions);
    const netSavings = Math.max(0, totals.income - totals.expenses);
    const behavior = this.savingsBehaviorMetrics(transactions);
    const donation = this.donationAmount(transactions);

    const savingsComponent = totals.income > 0 ? netSavings / totals.income : 0;
    const donationComponent = totals.income > 0 ? donation / totals.income : 0;
    const consistencyComponent = behavior.consistency / 100;

    return {
      score: Number((savingsComponent + donationComponent + consistencyComponent).toFixed(3)),
      donation,
      donationComponent,
      savingsComponent,
      consistencyComponent
    };
  },

  leaderboardEntries(state) {
    const current = this.leaderboardScore(state.profile, state.transactions);
    const currentUserName = state.profile.displayName?.trim() || state.leaderboardAlias || generateCreativeAlias();

    const entries = [
      { name: currentUserName, donation: current.donation, score: current.score },
      { name: "SilentComet811", donation: 1800, score: 2.04 },
      { name: "EmeraldWave632", donation: 1400, score: 1.88 },
      { name: "NovaSaver459", donation: 900, score: 1.63 },
      { name: "BrightTrail274", donation: 700, score: 1.44 }
    ].sort((a, b) => (b.donation - a.donation) || (b.score - a.score));

    return { entries, currentUserName, currentScore: current.score };
  }

};

const ui = {
  setFormMode(isEditing) {
    $.saveBtn.textContent = isEditing ? "Update" : "Add";
  },

  resetForm() {
    state.editingId = null;
    $.amount.value = "";
    $.type.value = "income";
    $.category.value = "";
    $.date.value = getToday();
    $.notes.value = "";
    $.formError.textContent = "";
    this.setFormMode(false);
  },

  openForm() {
    $.transactionForm.classList.add("open");
  },

  closeForm() {
    $.transactionForm.classList.remove("open");
    this.resetForm();
  },

  createEmptyState(message) {
    const item = document.createElement("li");
    item.className = "empty-state";
    item.textContent = message;
    return item;
  },

  createBarListItem({ label, amount, percent, className }) {
    const item = document.createElement("li");
    item.innerHTML = `
      <span>${label}</span>
      <div class="${className}"><span style="width:${percent}%"></span></div>
      <strong>${formatters.currency(amount)}</strong>
    `;
    return item;
  },

  renderTransactions() {
    const query = $.searchInput.value.trim().toLowerCase();
    const filteredTransactions = [...state.transactions]
      .filter(
        (transaction) =>
          transaction.category.toLowerCase().includes(query) ||
          transaction.notes.toLowerCase().includes(query)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    $.transactionList.innerHTML = "";

    if (!filteredTransactions.length) {
      $.transactionList.appendChild(this.createEmptyState("No transactions found."));
      return;
    }

    filteredTransactions.forEach((transaction) => {
      const item = document.createElement("li");
      item.className = `transaction-item ${transaction.type === "income" ? "transaction-income" : "transaction-expense"}`;
      item.innerHTML = `
        <div>
          <p class="item-main">${transaction.type.toUpperCase()} · ${formatters.currency(transaction.amount)} · ${transaction.category}</p>
          <p class="item-sub">${transaction.date}${transaction.notes ? ` · ${transaction.notes}` : ""}</p>
        </div>
        <div class="item-actions">
          <button type="button" data-edit="${transaction.id}">Edit</button>
          <button type="button" data-delete="${transaction.id}" class="danger">Delete</button>
        </div>
      `;
      $.transactionList.appendChild(item);
    });
  },

  renderDashboard() {
    const totals = analytics.totals(state.transactions);
    const savings = Math.max(0, totals.income - totals.expenses);
    const progress = state.monthlyGoal
      ? Math.min(100, Math.round((savings / state.monthlyGoal) * 100))
      : 0;

    $.currentBalance.textContent = formatters.currency(totals.income - totals.expenses);
    $.totalIncome.textContent = formatters.currency(totals.income);
    $.totalExpenses.textContent = formatters.currency(totals.expenses);
    $.savingsFill.style.width = `${progress}%`;
    $.savingsPercent.textContent = `${progress}%`;

    if (state.monthlyGoal === 0) {
      $.goalMessage.textContent = "Set a monthly savings target to track progress.";
    } else if (savings >= state.monthlyGoal) {
      $.goalMessage.textContent = "Monthly savings target reached.";
    } else {
      $.goalMessage.textContent = `${formatters.currency(state.monthlyGoal - savings)} remaining to reach your monthly target.`;
    }
  },

  renderCategoryBreakdown() {
    const totalsByCategory = analytics.categoryTotals(state.transactions);
    const entries = Object.entries(totalsByCategory).sort((a, b) => b[1] - a[1]);

    $.categoryList.innerHTML = "";
    if ($.categoryPieChart) $.categoryPieChart.innerHTML = "";

    if (!entries.length) {
      $.categoryList.appendChild(this.createEmptyState("No expenses yet."));
      return;
    }

    const colors = ["#3d7df5", "#2bbf7f", "#d39a36", "#e8576e", "#8b5cf6", "#14b8a6"];
    const totalAmount = entries.reduce((sum, [, amount]) => sum + amount, 0);

    if ($.categoryPieChart) {
      let cumulative = 0;
      const slices = entries
        .map(([, amount], index) => {
          const fraction = amount / totalAmount;
          const rotation = cumulative * 360;
          cumulative += fraction;
          return `<circle cx="90" cy="90" r="65" fill="transparent" stroke="${colors[index % colors.length]}" stroke-width="36" stroke-dasharray="${(fraction * 408).toFixed(2)} 408" transform="rotate(${rotation - 90} 90 90)"/>`;
        })
        .join("");

      $.categoryPieChart.innerHTML = `<svg viewBox="0 0 180 180" role="img" aria-label="Spending by category pie chart">${slices}<circle cx="90" cy="90" r="34" fill="#fff"/></svg>`;
    }

    entries.forEach(([category, amount], index) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <span class="category-dot" style="background:${colors[index % colors.length]}"></span>
        <span>${category}</span>
        <strong>${formatters.currency(amount)}</strong>
      `;
      $.categoryList.appendChild(item);
    });
  },

  renderWeeklyTrend() {
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      return day;
    });

    const amounts = days.map((day) => analytics.dailyExpenseAmount(state.transactions, toDateKey(day)));
    const maxAmount = Math.max(1, ...amounts);

    $.weeklyList.innerHTML = "";

    days.forEach((day, index) => {
      $.weeklyList.appendChild(
        this.createBarListItem({
          label: day.toLocaleDateString("en-US", { weekday: "short" }),
          amount: amounts[index],
          percent: Math.round((amounts[index] / maxAmount) * 100),
          className: "week-bar"
        })
      );
    });
  },

  renderInsights() {
    if (!state.transactions.length) {
      if ($.summaryParagraph) $.summaryParagraph.textContent = "Add transactions to generate your financial summary.";
      if ($.leaderboardRank) $.leaderboardRank.textContent = "-";
      if ($.nearbyRanks) $.nearbyRanks.innerHTML = "";
      return;
    }

    const totalsByCategory = analytics.categoryTotals(state.transactions);
    const categoryKeys = Object.keys(totalsByCategory);
    const topCategory = categoryKeys.length
      ? categoryKeys.reduce((a, b) => (totalsByCategory[a] > totalsByCategory[b] ? a : b))
      : "No expenses yet";

    const totals = analytics.totals(state.transactions);
    const counts = state.transactions.reduce(
      (acc, transaction) => {
        acc[transaction.type] += 1;
        return acc;
      },
      { income: 0, expense: 0 }
    );

    const weekly = analytics.weeklyExpenseComparison(state.transactions);
    const weekComparisonCopy =
      weekly.lastWeek === 0
        ? `${formatters.currency(weekly.thisWeek)} this week.`
        : `${Math.round(((weekly.thisWeek - weekly.lastWeek) / weekly.lastWeek) * 100)}% vs last week.`;

    const behavior = analytics.savingsBehaviorMetrics(state.transactions);
    const frequentType = counts.income >= counts.expense ? "Income" : "Expense";

    const leaderboard = analytics.leaderboardEntries(state);
    const rank = leaderboard.entries.findIndex((entry) => entry.name === leaderboard.currentUserName) + 1;
    if ($.leaderboardScore) $.leaderboardScore.textContent = leaderboard.currentScore.toFixed(3);
    if ($.leaderboardRank) $.leaderboardRank.textContent = rank > 0 ? `#${rank}` : "-";

    const localAverage = analytics.localAverageIncome(state.profile.location);
    const locationLabel = state.profile.location?.trim() ? state.profile.location.trim() : "your region";
    const savingsGap = totals.income - totals.expenses;
    const savingsComponent = totals.income > 0 ? Math.max(0, savingsGap) / totals.income : 0;
    const consistencyComponent = behavior.consistency / 100;

    if ($.summaryParagraph) {
      $.summaryParagraph.textContent = `Top spending category is ${topCategory}. Income vs expenses is ${formatters.currency(totals.income)} vs ${formatters.currency(totals.expenses)}, with ${frequentType.toLowerCase()} as the most frequent transaction type. Weekly comparison is ${weekComparisonCopy}. Savings rate is ${behavior.savingsRate.toFixed(1)}% with a consistency score of ${behavior.consistency}/100 and a saving streak of ${behavior.streak} day${behavior.streak === 1 ? "" : "s"}. Net savings impact is ${formatters.currency(savingsGap)} against ${locationLabel} average income of ${formatters.currency(localAverage)}. Score components are ${savingsComponent.toFixed(3)} savings and ${consistencyComponent.toFixed(3)} consistency.`;
    }

    if ($.nearbyRanks) {
      $.nearbyRanks.innerHTML = "";
      const currentIndex = leaderboard.entries.findIndex((entry) => entry.name === leaderboard.currentUserName);
      const currentPoints = Math.round((leaderboard.currentScore * 100) + (analytics.donationAmount(state.transactions) / 10));

      const toPoints = (entry) => Math.round((Number(entry.score || 0) * 100) + (Number(entry.donation || 0) / 10));
      const prevEntry = currentIndex > 0 ? leaderboard.entries[currentIndex - 1] : null;
      const nextEntry = currentIndex >= 0 && currentIndex < leaderboard.entries.length - 1 ? leaderboard.entries[currentIndex + 1] : null;

      if (prevEntry) {
        const diff = Math.max(0, toPoints(prevEntry) - currentPoints);
        const item = document.createElement("li");
        item.textContent = `#${currentIndex} → +${diff} points ahead`;
        $.nearbyRanks.appendChild(item);
      }

      if (nextEntry) {
        const diff = Math.max(0, currentPoints - toPoints(nextEntry));
        const item = document.createElement("li");
        item.textContent = `#${currentIndex + 2} → -${diff} points behind`;
        $.nearbyRanks.appendChild(item);
      }

      if (!prevEntry && !nextEntry) {
        const item = document.createElement("li");
        item.textContent = "No adjacent ranks available yet.";
        $.nearbyRanks.appendChild(item);
      }
    }

    if ($.top5Leaders) {
      $.top5Leaders.innerHTML = '';
      leaderboard.entries.slice(0, 5).forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1} ${entry.name} · ${formatters.currency(entry.donation)} · ${entry.score.toFixed(3)}`;
        $.top5Leaders.appendChild(li);
      });
    }

    const reachedStreakUnlock = behavior.streak >= 7;
    if (reachedStreakUnlock && !hasActivePremiumAccess()) {
      const unlock = new Date();
      unlock.setDate(unlock.getDate() + 7);
      state.premiumUnlockUntil = unlock.toISOString();
      transactionService.persist();
    }
  },


  renderProfileStatus() {
    const label = state.profileCompleted ? "Completed" : "Incomplete";
    const copy = state.profileCompleted
      ? "Profile ready for leaderboard scoring."
      : "Complete your profile to unlock leaderboard scoring.";

    if ($.profileStatusLabel) $.profileStatusLabel.textContent = label;
    if ($.profileStatusCopy) $.profileStatusCopy.textContent = copy;
    if ($.profileBadge) $.profileBadge.textContent = label;
  },

  renderProfileForm() {
    const p = state.profile;
    if (!$.profileName) return;
    $.profileName.value = p.name;
    $.profileLocation.value = p.location;
    $.profileDependents.value = p.dependents;
    $.profileFamilyResponsibilities.value = p.familyResponsibilities;
    if ($.settingsDisplayName) $.settingsDisplayName.value = p.displayName;
    if ($.settingsPlan) $.settingsPlan.value = p.plan;
    if ($.autoDonateToggle) $.autoDonateToggle.value = p.donation.autoDonate === false ? "off" : "on";
    if ($.darkModeToggle) $.darkModeToggle.value = p.preferences?.darkMode ? "on" : "off";
    $.incomeSalary.value = p.income.salary;
    $.incomeFreelance.value = p.income.freelance;
    $.incomeBusiness.value = p.income.business;
    $.incomePassive.value = p.income.passive;
    $.expenseHousing.value = p.expenses.housing;
    $.expenseFood.value = p.expenses.food;
    $.expenseTransport.value = p.expenses.transport;
    $.expenseUtilities.value = p.expenses.utilities;
    $.goalShortTerm.value = p.goals.shortTerm;
    $.goalLongTerm.value = p.goals.longTerm;
    $.donationCause.value = p.donation.cause;
    $.donationPercent.value = p.donation.percent;
  },


  renderSubscriptionProgress() {
    const totals = analytics.totals(state.transactions);
    const netSavings = Math.max(0, totals.income - totals.expenses);
    const target = 2000;
    const ratio = target > 0 ? Math.min(1, netSavings / target) : 0;
    const percent = Math.round(ratio * 100);
    const filled = Math.round(ratio * 10);
    const bar = `[${"█".repeat(filled)}${"░".repeat(10 - filled)}] ${percent}% complete`;

    if ($.netflixProgressBar) $.netflixProgressBar.textContent = bar;
    if ($.netflixProgressText) $.netflixProgressText.textContent = `₹${Math.round(netSavings)} / ₹${target}`;
    if ($.netflixProgressFill) $.netflixProgressFill.style.width = `${percent}%`;
  },

  renderSettingsPreview() {
    if ($.settingsPlanBadge) $.settingsPlanBadge.textContent = state.profile.plan === "premium" ? "Premium" : "Free";
    if ($.settingsThemeBadge) $.settingsThemeBadge.textContent = state.profile.preferences?.darkMode ? "Dark" : "Light";
    if ($.settingsDonateBadge) $.settingsDonateBadge.textContent = state.profile.donation?.autoDonate === false ? "OFF" : "ON";
  },


  renderDonationProofs() {
    if (!$.donationProofList) return;
    $.donationProofList.innerHTML = "";
    const currentUser = state.profile.displayName || state.profile.name || "User";
    const proofs = (state.proofs || []).filter((proof) => proof.user_id === currentUser).slice().reverse();

    proofs.forEach((proof) => {
      const item = document.createElement("li");
      const badge = proof.status === "verified" ? "Verified" : proof.status === "rejected" ? "Rejected" : "Pending";
      const header = document.createElement("span");
      header.innerHTML = `${badge} · ${proof.platform} · ${formatters.currency(proof.amount)} · ${proof.status.toUpperCase()}`;
      item.appendChild(header);

      const dataStr = String(proof.proof_data || "");
      if (proof.proof_type === "image") {
        if (dataStr.startsWith("data:image")) {
          const wrap = document.createElement("div");
          wrap.className = "donation-proof-thumb-wrap";
          const img = document.createElement("img");
          img.src = dataStr;
          img.alt = "Donation proof screenshot";
          img.className = "donation-proof-thumb";
          img.loading = "lazy";
          wrap.appendChild(img);
          if (proof.proof_note) {
            const noteEl = document.createElement("p");
            noteEl.className = "goal-copy";
            noteEl.style.marginTop = "6px";
            noteEl.textContent = proof.proof_note;
            wrap.appendChild(noteEl);
          }
          item.appendChild(wrap);
        } else {
          const legacy = document.createElement("p");
          legacy.className = "goal-copy";
          legacy.style.marginTop = "8px";
          legacy.textContent = dataStr;
          item.appendChild(legacy);
        }
      } else {
        const line = document.createElement("p");
        line.className = "goal-copy";
        line.style.marginTop = "8px";
        line.textContent = dataStr;
        item.appendChild(line);
      }

      if (proof.status === "pending") {
        const row = document.createElement("div");
        row.className = "form-actions";
        row.innerHTML = `<button type="button" data-proof-action="approve" data-proof-id="${proof.id}">Approve</button><button type="button" class="secondary" data-proof-action="reject" data-proof-id="${proof.id}">Reject</button>`;
        item.appendChild(row);
      }

      $.donationProofList.appendChild(item);
    });
  },

  switchView(view) {
    document.querySelectorAll(".view-section").forEach((section) => section.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach((button) => button.classList.remove("active"));

    document.getElementById(`${view}-view`).classList.add("active");
    document
      .querySelectorAll(`.tab-btn[data-view='${view}']`)
      .forEach((button) => button.classList.add("active"));
    state.currentView = view;
    if ($.homeSubtitle) $.homeSubtitle.style.display = view === "overview" ? "block" : "none";
    if ($.pageTitle) {
      const labels = {
        overview: "Dashboard",
        transactions: "Transactions",
        donation: "Donations",
        leaderboard: "Leaderboard",
        settings: "Settings",
        profile: "Profile"
      };
      $.pageTitle.textContent = labels[view] || "Dashboard";
    }
  },

  renderAll() {
    this.renderTransactions();
    this.renderDashboard();
    this.renderCategoryBreakdown();
    this.renderWeeklyTrend();
    this.renderInsights();
    this.renderProfileStatus();
    this.renderProfileForm();
    this.renderSubscriptionProgress();
    this.renderSettingsPreview();
    this.renderDonationProofs();
  }
};

function toDateKey(date) {
  return date.toISOString().split("T")[0];
}

function getToday() {
  return toDateKey(new Date());
}

function getFormValues() {
  return {
    amount: Number($.amount.value),
    type: $.type.value,
    category: $.category.value.trim(),
    date: $.date.value || getToday(),
    notes: $.notes.value.trim()
  };
}

function isValidTransaction(payload) {
  return payload.amount > 0 && payload.category.length > 0;
}

function handleSaveTransaction() {
  const payload = getFormValues();

  if (!isValidTransaction(payload)) {
    $.formError.textContent = "Amount and category are required.";
    return;
  }

  if (state.editingId) {
    transactionService.update(state.editingId, payload);
  } else {
    transactionService.add(payload);
  }

  ui.closeForm();
  ui.renderAll();
}

function handleEditTransaction(id) {
  const transaction = transactionService.findById(id);
  if (!transaction) return;

  ui.openForm();
  state.editingId = id;
  $.amount.value = transaction.amount;
  $.type.value = transaction.type;
  $.category.value = transaction.category;
  $.date.value = transaction.date;
  $.notes.value = transaction.notes;
  ui.setFormMode(true);
}

function handleSetGoal() {
  const goal = Number($.goalInput.value);
  if (!goal || goal <= 0) {
    $.goalMessage.textContent = "Please enter a valid goal amount.";
    return;
  }

  state.monthlyGoal = goal;
  transactionService.persist();
  $.goalAmount.textContent = formatters.currency(state.monthlyGoal);
  state.profileCompleted = isProfileComplete(state.profile);
  if (!state.leaderboardAlias) {
    state.leaderboardAlias = generateCreativeAlias();
    transactionService.persist();
  }
  $.goalInput.value = "";
  ui.renderDashboard();
}


function getProfileFormValues() {
  return {
    name: $.profileName.value.trim(),
    displayName: state.profile.displayName || "",
    location: $.profileLocation.value.trim(),
    dependents: Number($.profileDependents.value) || 0,
    familyResponsibilities: $.profileFamilyResponsibilities.value.trim(),
    plan: state.profile.plan,
    income: {
      salary: Number($.incomeSalary.value) || 0,
      freelance: Number($.incomeFreelance.value) || 0,
      business: Number($.incomeBusiness.value) || 0,
      passive: Number($.incomePassive.value) || 0
    },
    expenses: {
      housing: Number($.expenseHousing.value) || 0,
      food: Number($.expenseFood.value) || 0,
      transport: Number($.expenseTransport.value) || 0,
      utilities: Number($.expenseUtilities.value) || 0
    },
    goals: {
      shortTerm: $.goalShortTerm.value.trim(),
      longTerm: $.goalLongTerm.value.trim()
    },
    donation: {
      cause: $.donationCause.value.trim(),
      percent: Number($.donationPercent.value) || 0
    }
  };
}

function validateProfile(profile) {
  if (!profile.name || !profile.displayName || !profile.location) {
    return "Name and location are required. Set display name in Settings.";
  }

  if (!hasIncomeSource(profile)) {
    return "Add at least one income source to complete profile.";
  }

  if (profile.donation.percent < 0 || profile.donation.percent > 100) {
    return "Donation percentage must be between 0 and 100.";
  }

  return "";
}

function handleSaveProfile() {
  const profile = getProfileFormValues();
  const error = validateProfile(profile);

  if (error) {
    $.profileError.textContent = error;
    return;
  }

  $.profileError.textContent = "";
  state.profile = profile;
  state.profileCompleted = isProfileComplete(profile);
  transactionService.persist();
  ui.renderProfileStatus();
}




function normalizeProofData(value) {
  return String(value || "").trim().toLowerCase();
}

function isDuplicateTransactionId(txId) {
  const normalized = normalizeProofData(txId);
  return state.proofs.some((proof) => proof.proof_type === "text" && normalizeProofData(proof.proof_data) === normalized);
}

function isDuplicateImageProof(imageRef) {
  const normalized = normalizeProofData(imageRef);
  return state.proofs.some((proof) => proof.proof_type === "image" && normalizeProofData(proof.proof_data) === normalized);
}

function compressImageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 1600;
        let { width, height } = img;
        if (width > maxSide || height > maxSide) {
          if (width > height) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas unsupported"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.88));
      };
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = reader.result;
    };
    reader.onerror = () => reject(reader.error || new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

function syncProofTypeFields() {
  const type = $.donationProofType?.value || "image";
  if ($.proofFieldsImage) $.proofFieldsImage.hidden = type !== "image";
  if ($.proofFieldsData) $.proofFieldsData.hidden = type === "image";
  if ($.donationProofDataLabel && $.donationProofData) {
    if (type === "text") {
      $.donationProofDataLabel.textContent = "Transaction ID";
      $.donationProofData.placeholder = "Paste transaction id";
    } else if (type === "redirect") {
      $.donationProofDataLabel.textContent = "Redirect confirmation ID";
      $.donationProofData.placeholder = "Paste redirect or confirmation id";
    }
  }
}

function clearDonationProofImageUi() {
  if ($.donationProofImage) $.donationProofImage.value = "";
  if ($.donationProofImageNote) $.donationProofImageNote.value = "";
  if ($.donationProofImagePreview) {
    $.donationProofImagePreview.innerHTML = "";
    $.donationProofImagePreview.hidden = true;
  }
}

function todayKey() {
  return getToday();
}

function appendDonationProofEntry(amount, platform, proofType, proofData, proofNote) {
  const userId = state.profile.displayName || state.profile.name || "User";
  state.proofs.push({
    id: Date.now(),
    user_id: userId,
    amount,
    platform,
    proof_type: proofType,
    proof_data: proofData,
    proof_note: proofNote || "",
    status: "pending",
    timestamp: `${todayKey()}T${new Date().toISOString().split("T")[1]}`
  });
  transactionService.persist();
  if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Verification in progress.";
  if ($.donationProofAmount) $.donationProofAmount.value = "";
  if ($.donationProofData) $.donationProofData.value = "";
  clearDonationProofImageUi();
  ui.renderAll();
}

function onDonationProofImagePick() {
  const file = $.donationProofImage?.files?.[0];
  if (!$.donationProofImagePreview) return;
  if (!file || !file.type.startsWith("image/")) {
    $.donationProofImagePreview.innerHTML = "";
    $.donationProofImagePreview.hidden = true;
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    $.donationProofImagePreview.innerHTML = "";
    const img = document.createElement("img");
    img.src = reader.result;
    img.alt = "Screenshot preview";
    $.donationProofImagePreview.appendChild(img);
    $.donationProofImagePreview.hidden = false;
  };
  reader.readAsDataURL(file);
}

function handleSubmitDonationProof() {
  const amount = Number($.donationProofAmount?.value || 0);
  const platform = $.donationProofPlatform?.value || "Manual";
  const proofType = $.donationProofType?.value || "image";
  const userId = state.profile.displayName || state.profile.name || "User";

  if (amount <= 0) {
    if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Enter a valid donation amount.";
    return;
  }

  const todayUploads = state.proofs.filter((proof) => proof.user_id === userId && proof.timestamp?.startsWith(todayKey())).length;
  if (todayUploads >= 5) {
    if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Too many uploads today. Submission sent for review.";
    return;
  }

  if (proofType === "image") {
    const file = $.donationProofImage?.files?.[0];
    if (!file) {
      if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Choose an image file for your screenshot proof.";
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Image is too large. Use a file under 15 MB.";
      return;
    }
    const note = ($.donationProofImageNote?.value || "").trim();
    compressImageToDataUrl(file)
      .then((dataUrl) => {
        if (isDuplicateImageProof(dataUrl)) {
          if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Duplicate screenshot detected.";
          return;
        }
        appendDonationProofEntry(amount, platform, "image", dataUrl, note);
      })
      .catch(() => {
        if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Could not read that image. Try another file.";
      });
    return;
  }

  const proofData = ($.donationProofData?.value || "").trim();
  if (!proofData) {
    if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Enter valid proof data.";
    return;
  }

  if (proofType === "text") {
    if (!/^[A-Za-z0-9-]{6,}$/.test(proofData)) {
      if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Invalid transaction ID format.";
      return;
    }
    if (isDuplicateTransactionId(proofData)) {
      if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Transaction ID already used.";
      return;
    }
  }

  if (proofType === "redirect") {
    if (!/^[A-Za-z0-9-]{6,}$/.test(proofData)) {
      if ($.proofStatusMessage) $.proofStatusMessage.textContent = "Invalid redirect confirmation ID format.";
      return;
    }
  }

  appendDonationProofEntry(amount, platform, proofType, proofData, "");
}

function handleProofDecision(proofId, decision) {
  state.proofs = state.proofs.map((proof) => {
    if (proof.id !== proofId) return proof;
    return { ...proof, status: decision === "approve" ? "verified" : "rejected" };
  });
  transactionService.persist();
  if ($.proofStatusMessage) $.proofStatusMessage.textContent = decision === "approve" ? "Donation verified." : "Proof rejected. Upload a clearer receipt.";
  ui.renderAll();
}

function handleSaveSettings() {
  if (!$.settingsPlan) return;
  state.profile.displayName = $.settingsDisplayName?.value.trim() || state.profile.displayName;
  state.profile.plan = $.settingsPlan.value;
  state.profile.donation.autoDonate = $.autoDonateToggle ? $.autoDonateToggle.value !== "off" : true;
  state.profile.preferences.darkMode = $.darkModeToggle ? $.darkModeToggle.value === "on" : false;
  state.profileCompleted = isProfileComplete(state.profile);
  applyTheme();
  transactionService.persist();
  if ($.settingsMessage) $.settingsMessage.textContent = `Settings saved. Plan: ${state.profile.plan === "premium" ? "Premium" : "Free"}.`;
  ui.renderAll();
}


function applyTheme() {
  const darkMode = state.profile.preferences?.darkMode === true;
  document.body.classList.toggle("dark-mode", darkMode);
}

function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function processMonthlyDonation() {
  const percent = Number(state.profile.donation?.percent) || 0;
  const autoDonateEnabled = state.profile.donation?.autoDonate !== false;
  if (!autoDonateEnabled || percent <= 0) return;

  const monthKey = getCurrentMonthKey();
  if (state.donationLastProcessedMonth === monthKey) return;

  const income = state.profile.income || {};
  const monthlyIncome = Number(income.salary || 0) + Number(income.freelance || 0) + Number(income.business || 0) + Number(income.passive || 0);
  const donationAmount = Number(((monthlyIncome * percent) / 100).toFixed(2));

  if (donationAmount <= 0) return;

  state.transactions.push({
    id: Date.now(),
    amount: donationAmount,
    type: "expense",
    category: "Donation",
    date: getToday(),
    notes: "Auto monthly donation"
  });

  state.donationLastProcessedMonth = monthKey;
  transactionService.persist();
}

function hasActivePremiumAccess() {
  if (state.profile.plan === "premium") return true;
  if (!state.premiumUnlockUntil) return false;
  return new Date(state.premiumUnlockUntil).getTime() > Date.now();
}

function bindEvents() {
  // Hamburger menu toggle
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  
  if (hamburgerMenu && mobileNav) {
    // Create backdrop element
    const backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    backdrop.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    `;
    document.body.appendChild(backdrop);
    
    const closeMenu = () => {
      hamburgerMenu.classList.remove("active");
      mobileNav.classList.remove("active");
      backdrop.style.display = "none";
    };
    
    hamburgerMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburgerMenu.classList.toggle("active");
      mobileNav.classList.toggle("active");
      backdrop.style.display = mobileNav.classList.contains("active") ? "block" : "none";
    });

    // Close button in mobile nav
    if (mobileNavClose) {
      mobileNavClose.addEventListener("click", closeMenu);
    }

    // Close menu when nav item is clicked
    mobileNav.querySelectorAll(".tab-btn, .dropdown-item").forEach((button) => {
      button.addEventListener("click", closeMenu);
    });

    // Close menu when clicking on backdrop
    backdrop.addEventListener("click", closeMenu);

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!hamburgerMenu.contains(event.target) && !mobileNav.contains(event.target)) {
        closeMenu();
      }
    });
  }

  if ($.openFormBtn) {
    $.openFormBtn.addEventListener("click", () => {
      ui.switchView("transactions");
      ui.openForm();
    });
  }

  $.saveBtn.addEventListener("click", handleSaveTransaction);
  $.cancelBtn.addEventListener("click", () => ui.closeForm());
  $.goalBtn.addEventListener("click", handleSetGoal);
  $.searchInput.addEventListener("input", () => ui.renderTransactions());
  if ($.saveProfileBtn) $.saveProfileBtn.addEventListener("click", handleSaveProfile);
  if ($.saveSettingsBtn) $.saveSettingsBtn.addEventListener("click", handleSaveSettings);
  if ($.submitDonationProofBtn) $.submitDonationProofBtn.addEventListener("click", handleSubmitDonationProof);
  if ($.donationProofType) $.donationProofType.addEventListener("change", syncProofTypeFields);
  if ($.donationProofImage) $.donationProofImage.addEventListener("change", onDonationProofImagePick);

  $.transactionList.addEventListener("click", (event) => {
    const editId = event.target.getAttribute("data-edit");
    const deleteId = event.target.getAttribute("data-delete");

    if (editId) handleEditTransaction(Number(editId));
    if (deleteId) {
      transactionService.remove(Number(deleteId));
      ui.renderAll();
    }
  });

  if ($.donationProofList) {
    $.donationProofList.addEventListener("click", (event) => {
      const action = event.target.getAttribute("data-proof-action");
      const id = Number(event.target.getAttribute("data-proof-id"));
      if (!action || !id) return;
      handleProofDecision(id, action);
    });
  }

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const target = button.dataset.view;
      if (!target) return;
      ui.switchView(target);
      $.navDropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if ($.homeLogoLink) {
    $.homeLogoLink.addEventListener("click", (event) => {
      event.preventDefault();
      ui.switchView("overview");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  $.navDropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.tab-btn');
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        const target = trigger.dataset.view;
        if (target) ui.switchView(target);
        dropdown.classList.toggle("open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    $.navDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) dropdown.classList.remove("open");
    });
  });

  document.querySelectorAll(".dropdown-item").forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.view || "transactions";
      ui.switchView(targetView);

      if (button.dataset.action === "open-form") {
        ui.openForm();
        $.transactionForm?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (button.dataset.action === "show-history") {
        ui.closeForm();
        $.transactionHistory?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (button.dataset.action === "jump-ranking") {
        document.getElementById("leaderboard-ranking")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (button.dataset.action === "jump-summary") {
        document.getElementById("leaderboard-summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      $.navDropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
      
      // Close hamburger menu on mobile
      const hamburgerMenu = document.getElementById("hamburgerMenu");
      const mobileNav = document.querySelector(".mobile-nav");
      if (hamburgerMenu && mobileNav) {
        hamburgerMenu.classList.remove("active");
        mobileNav.classList.remove("active");
      }
    });
  });

}


function showSplashScreen() {
  setTimeout(() => {
    if ($.splashScreen) $.splashScreen.style.display = "none";
    if ($.appRoot) $.appRoot.classList.remove("app-hidden");
  }, 1200);
}

function initialize() {
  showSplashScreen();
  $.date.value = getToday();
  $.goalAmount.textContent = formatters.currency(state.monthlyGoal);
  state.profileCompleted = isProfileComplete(state.profile);
  if (!state.leaderboardAlias) {
    state.leaderboardAlias = generateCreativeAlias();
    transactionService.persist();
  }
  bindEvents();
  syncProofTypeFields();
  applyTheme();
  processMonthlyDonation();
  ui.switchView("overview");
  if ($.settingsMessage) $.settingsMessage.textContent = "";
  ui.renderAll();
}

initialize();
