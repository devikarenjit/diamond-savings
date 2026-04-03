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
  appRoot: document.querySelector(".dashboard")
};

const dataStore = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { transactions: [], monthlyGoal: 0 };

      const parsed = JSON.parse(raw);
      return {
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
        monthlyGoal: Number(parsed.monthlyGoal) || 0
      };
    } catch {
      return { transactions: [], monthlyGoal: 0 };
    }
  },

  save(state) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ transactions: state.transactions, monthlyGoal: state.monthlyGoal })
    );
  }
};

const state = {
  ...dataStore.load(),
  editingId: null,
  currentView: "overview"
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

    if (!entries.length) {
      $.categoryList.appendChild(this.createEmptyState("No expenses yet."));
      return;
    }

    const maxAmount = Math.max(...entries.map(([, amount]) => amount));
    entries.forEach(([category, amount]) => {
      $.categoryList.appendChild(
        this.createBarListItem({
          label: category,
          amount,
          percent: Math.round((amount / maxAmount) * 100),
          className: "bar"
        })
      );
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
  },

  switchView(view) {
    document.querySelectorAll(".view-section").forEach((section) => section.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach((button) => button.classList.remove("active"));

    document.getElementById(`${view}-view`).classList.add("active");
    document
      .querySelectorAll(`.tab-btn[data-view='${view}']`)
      .forEach((button) => button.classList.add("active"));
    state.currentView = view;
  },

  renderAll() {
    this.renderTransactions();
    this.renderDashboard();
    this.renderCategoryBreakdown();
    this.renderWeeklyTrend();
    this.renderInsights();
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
  $.goalInput.value = "";
  ui.renderDashboard();
}

function bindEvents() {
  $.openFormBtn.addEventListener("click", () => {
    ui.switchView("transactions");
    ui.openForm();
  });

  $.saveBtn.addEventListener("click", handleSaveTransaction);
  $.cancelBtn.addEventListener("click", () => ui.closeForm());
  $.goalBtn.addEventListener("click", handleSetGoal);
  $.searchInput.addEventListener("input", () => ui.renderTransactions());

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
    button.addEventListener("click", () => ui.switchView(button.dataset.view));
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
  bindEvents();
  ui.renderAll();
}

initialize();
