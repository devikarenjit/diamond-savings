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
  leaderboardRank: document.getElementById("leaderboardRank"),
  topDonor: document.getElementById("topDonor"),
  leaderboardList: document.getElementById("leaderboardList"),
  nearbyRanks: document.getElementById("nearbyRanks"),
  userTier: document.getElementById("userTier"),
  pointsEarned: document.getElementById("pointsEarned"),
  rewardEligibility: document.getElementById("rewardEligibility"),
  advancedInsights: document.getElementById("advancedInsights"),
  boostStatus: document.getElementById("boostStatus"),
  competitionStatus: document.getElementById("competitionStatus"),
  premiumUntil: document.getElementById("premiumUntil"),
  settingsDisplayName: document.getElementById("settingsDisplayName"),
  settingsPlan: document.getElementById("settingsPlan"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  settingsMessage: document.getElementById("settingsMessage")
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
  donation: { cause: "", percent: 0 }
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
      if (!raw) return { transactions: [], monthlyGoal: 0, profile: getDefaultProfile(), profileCompleted: false, premiumUnlockUntil: null, leaderboardAlias: generateCreativeAlias(), donationLastProcessedMonth: null };

      const parsed = JSON.parse(raw);
      return {
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        monthlyGoal: Number(parsed.monthlyGoal) || 0,
        profile: parsed.profile ? { ...getDefaultProfile(), ...parsed.profile,
          income: { ...getDefaultProfile().income, ...(parsed.profile.income || {}) },
          expenses: { ...getDefaultProfile().expenses, ...(parsed.profile.expenses || {}) },
          goals: { ...getDefaultProfile().goals, ...(parsed.profile.goals || {}) },
          donation: { ...getDefaultProfile().donation, ...(parsed.profile.donation || {}) } } : getDefaultProfile(),
        profileCompleted: Boolean(parsed.profileCompleted),
        premiumUnlockUntil: parsed.premiumUnlockUntil || null,
        leaderboardAlias: parsed.leaderboardAlias || generateCreativeAlias(),
        donationLastProcessedMonth: parsed.donationLastProcessedMonth || null
      };
    } catch {
      return { transactions: [], monthlyGoal: 0, profile: getDefaultProfile(), profileCompleted: false, premiumUnlockUntil: null, leaderboardAlias: generateCreativeAlias(), donationLastProcessedMonth: null };
    }
  },

  save(state) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ transactions: state.transactions, monthlyGoal: state.monthlyGoal, profile: state.profile, profileCompleted: state.profileCompleted, premiumUnlockUntil: state.premiumUnlockUntil, leaderboardAlias: state.leaderboardAlias, donationLastProcessedMonth: state.donationLastProcessedMonth })
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
  donationLastProcessedMonth: initialData.donationLastProcessedMonth || null
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

  leaderboardScore(profile, transactions) {
    const totals = this.totals(transactions);
    const netSavings = Math.max(0, totals.income - totals.expenses);
    const averageIncome = this.localAverageIncome(profile.location);
    const behavior = this.savingsBehaviorMetrics(transactions);
    const donation = this.donationAmount(transactions);

    const savingsComponent = averageIncome > 0 ? netSavings / averageIncome : 0;
    const consistencyComponent = behavior.consistency / 100;
    const impactComponent = totals.income > 0
      ? (donation / totals.income) + ((Number(profile.donation?.percent) || 0) / 100)
      : (Number(profile.donation?.percent) || 0) / 100;

    return {
      score: Number((savingsComponent + consistencyComponent + impactComponent).toFixed(3)),
      donation
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
      item.className = "transaction-item";
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
      $.goalMessage.textContent = "Set a monthly goal to track progress.";
    } else if (savings >= state.monthlyGoal) {
      $.goalMessage.textContent = "Great work—you reached your monthly savings goal!";
    } else {
      $.goalMessage.textContent = `You are ${formatters.currency(state.monthlyGoal - savings)} away from your goal.`;
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
      $.topCategory.textContent = "-";
      $.incomeVsExpenses.textContent = "-";
      $.frequentType.textContent = "-";
      $.weekComparison.textContent = "-";
    if ($.savingsRate) $.savingsRate.textContent = "-";
    if ($.consistencyScore) $.consistencyScore.textContent = "-";
    if ($.savingStreak) $.savingStreak.textContent = "-";
    if ($.leaderboardScore) $.leaderboardScore.textContent = "-";
    if ($.leaderboardRank) $.leaderboardRank.textContent = "-";
    if ($.topDonor) $.topDonor.textContent = "-";
    if ($.leaderboardList) $.leaderboardList.innerHTML = "";
    if ($.userTier) $.userTier.textContent = "-";
    if ($.pointsEarned) $.pointsEarned.textContent = "-";
    if ($.rewardEligibility) $.rewardEligibility.textContent = "-";
    if ($.advancedInsights) $.advancedInsights.textContent = "-";
    if ($.boostStatus) $.boostStatus.textContent = "-";
    if ($.competitionStatus) $.competitionStatus.textContent = "-";
    if ($.premiumUntil) $.premiumUntil.textContent = "-";
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

    $.topCategory.textContent = topCategory;
    $.incomeVsExpenses.textContent = `${formatters.currency(totals.income)} vs ${formatters.currency(totals.expenses)}`;
    $.frequentType.textContent = counts.income >= counts.expense ? "Income" : "Expense";
    $.weekComparison.textContent = weekComparisonCopy;

    const behavior = analytics.savingsBehaviorMetrics(state.transactions);
    if ($.savingsRate) $.savingsRate.textContent = `${behavior.savingsRate.toFixed(1)}%`;
    if ($.consistencyScore) $.consistencyScore.textContent = `${behavior.consistency}/100`;
    if ($.savingStreak) $.savingStreak.textContent = `${behavior.streak} day${behavior.streak === 1 ? "" : "s"}`;

    const leaderboard = analytics.leaderboardEntries(state);
    const rank = leaderboard.entries.findIndex((entry) => entry.name === leaderboard.currentUserName) + 1;
    if ($.leaderboardScore) $.leaderboardScore.textContent = leaderboard.currentScore.toFixed(3);
    if ($.leaderboardRank) $.leaderboardRank.textContent = rank > 0 ? `#${rank}` : "-";
    if ($.topDonor) $.topDonor.textContent = leaderboard.entries[0] ? `${leaderboard.entries[0].name} (${formatters.currency(leaderboard.entries[0].donation)})` : "-";

    if ($.leaderboardList) {
      $.leaderboardList.innerHTML = "";
      leaderboard.entries.forEach((entry, index) => {
        const item = document.createElement("li");
        item.className = entry.name === leaderboard.currentUserName ? "leaderboard-current" : "";
        const badge = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "•";
        item.innerHTML = `<span class="lb-rank">${badge} ${index + 1}</span><span class="lb-name">${entry.name}</span><strong>${formatters.currency(entry.donation)}</strong>`;
        $.leaderboardList.appendChild(item);
      });
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

    const reachedStreakUnlock = behavior.streak >= 7;
    if (reachedStreakUnlock && !hasActivePremiumAccess()) {
      const unlock = new Date();
      unlock.setDate(unlock.getDate() + 7);
      state.premiumUnlockUntil = unlock.toISOString();
      transactionService.persist();
    }

    const isPremium = hasActivePremiumAccess();
    const points = Math.round((leaderboard.currentScore * 100) + (analytics.donationAmount(state.transactions) / 10));

    if ($.userTier) $.userTier.textContent = isPremium ? "Premium" : "Free";
    if ($.pointsEarned) $.pointsEarned.textContent = `${points} pts`;
    if ($.rewardEligibility) $.rewardEligibility.textContent = isPremium ? "Eligible (Netflix / Amazon rewards)" : "Not eligible yet";
    if ($.advancedInsights) $.advancedInsights.textContent = isPremium ? `Savings ratio ${behavior.savingsRate.toFixed(1)}%, consistency ${behavior.consistency}/100` : "Locked for Free users";
    if ($.boostStatus) $.boostStatus.textContent = isPremium ? "Boost active in leaderboard" : "Standard visibility";
    if ($.competitionStatus) $.competitionStatus.textContent = isPremium ? "Special competitions unlocked" : "Open competition (basic)";
    if ($.premiumUntil) $.premiumUntil.textContent = state.profile.plan === "premium" ? "Plan-based Premium" : (state.premiumUnlockUntil ? new Date(state.premiumUnlockUntil).toLocaleDateString("en-US") : "Not unlocked");
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



function handleSaveSettings() {
  if (!$.settingsPlan) return;
  state.profile.displayName = $.settingsDisplayName?.value.trim() || state.profile.displayName;
  state.profile.plan = $.settingsPlan.value;
  state.profileCompleted = isProfileComplete(state.profile);
  transactionService.persist();
  if ($.settingsMessage) $.settingsMessage.textContent = `Settings saved. Plan: ${state.profile.plan === "premium" ? "Premium" : "Free"}.`;
  ui.renderAll();
}


function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function processMonthlyDonation() {
  const percent = Number(state.profile.donation?.percent) || 0;
  if (percent <= 0) return;

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

  $.transactionList.addEventListener("click", (event) => {
    const editId = event.target.getAttribute("data-edit");
    const deleteId = event.target.getAttribute("data-delete");

    if (editId) handleEditTransaction(Number(editId));
    if (deleteId) {
      transactionService.remove(Number(deleteId));
      ui.renderAll();
    }
  });

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
  processMonthlyDonation();
  ui.switchView("overview");
  if ($.settingsMessage) $.settingsMessage.textContent = "";
  ui.renderAll();
}

initialize();
