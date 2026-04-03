let transactions = [];
let monthlyGoal = 0;
let editingId = null;

const today = new Date().toISOString().split("T")[0];
document.getElementById("date").value = today;

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value || 0);
}

function openForm() {
  document.getElementById("transactionForm").classList.add("open");
}

function clearForm() {
  editingId = null;
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "income";
  document.getElementById("category").value = "";
  document.getElementById("date").value = today;
  document.getElementById("notes").value = "";
  document.getElementById("saveBtn").textContent = "Add";
  document.getElementById("formError").textContent = "";
}

function closeForm() {
  document.getElementById("transactionForm").classList.remove("open");
  clearForm();
}

function addTransaction() {
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value.trim();
  const date = document.getElementById("date").value || today;
  const notes = document.getElementById("notes").value.trim();

  if (!amount || amount <= 0 || !category) {
    document.getElementById("formError").textContent = "Amount and category are required.";
    return;
  }

  if (editingId) {
    transactions = transactions.map((t) =>
      t.id === editingId ? { ...t, amount, type, category, date, notes } : t
    );
  } else {
    transactions.push({
      id: Date.now(),
      amount,
      type,
      category,
      date,
      notes
    });
  }

  closeForm();
  renderAll();
}

function displayTransactions() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  const filtered = transactions
    .filter((t) => t.category.toLowerCase().includes(query) || t.notes.toLowerCase().includes(query))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    list.innerHTML = "<li class='empty-state'>No transactions found.</li>";
    return;
  }

  filtered.forEach((t) => {
    const li = document.createElement("li");
    li.className = "transaction-item";
    li.innerHTML = `
      <div>
        <p class="item-main">${t.type.toUpperCase()} · ${formatCurrency(t.amount)} · ${t.category}</p>
        <p class="item-sub">${t.date}${t.notes ? ` · ${t.notes}` : ""}</p>
      </div>
      <div class="item-actions">
        <button type="button" data-edit="${t.id}">Edit</button>
        <button type="button" data-delete="${t.id}" class="danger">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  renderAll();
}

function editTransaction(id) {
  const t = transactions.find((tx) => tx.id === id);
  if (!t) return;

  openForm();
  editingId = id;
  document.getElementById("amount").value = t.amount;
  document.getElementById("type").value = t.type;
  document.getElementById("category").value = t.category;
  document.getElementById("date").value = t.date;
  document.getElementById("notes").value = t.notes;
  document.getElementById("saveBtn").textContent = "Update";
}

function updateDashboard() {
  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  const savings = Math.max(0, income - expenses);
  document.getElementById("current-balance").textContent = formatCurrency(income - expenses);
  document.getElementById("total-income").textContent = formatCurrency(income);
  document.getElementById("total-expenses").textContent = formatCurrency(expenses);

  const progress = monthlyGoal > 0 ? Math.min(100, Math.round((savings / monthlyGoal) * 100)) : 0;
  document.getElementById("savings-fill").style.width = `${progress}%`;
  document.getElementById("savings-percent").textContent = `${progress}%`;

  const goalMessage = document.getElementById("goalMessage");
  if (monthlyGoal === 0) {
    goalMessage.textContent = "Set a monthly goal to track progress.";
  } else if (savings >= monthlyGoal) {
    goalMessage.textContent = "Great work—you reached your monthly savings goal!";
  } else {
    goalMessage.textContent = `You are ${formatCurrency(monthlyGoal - savings)} away from your goal.`;
  }
}

function updateCategoryBreakdown() {
  const list = document.getElementById("category-list");
  list.innerHTML = "";

  const expenses = transactions.filter((t) => t.type === "expense");
  if (expenses.length === 0) {
    list.innerHTML = "<li class='empty-state'>No expenses yet.</li>";
    return;
  }

  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const max = Math.max(...Object.values(totals));
  Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, amount]) => {
      const li = document.createElement("li");
      const pct = Math.round((amount / max) * 100);
      li.innerHTML = `
        <span>${category}</span>
        <div class="bar"><span style="width:${pct}%"></span></div>
        <strong>${formatCurrency(amount)}</strong>
      `;
      list.appendChild(li);
    });
}

function updateWeeklyTrend() {
  const weekly = document.getElementById("weekly-list");
  weekly.innerHTML = "";

  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const spending = days.map((d) => {
    const key = d.toISOString().split("T")[0];
    return transactions
      .filter((t) => t.type === "expense" && t.date === key)
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const max = Math.max(1, ...spending);
  days.forEach((d, index) => {
    const value = spending[index];
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${d.toLocaleDateString("en-US", { weekday: "short" })}</span>
      <div class="week-bar"><span style="width:${Math.round((value / max) * 100)}%"></span></div>
      <strong>${formatCurrency(value)}</strong>
    `;
    weekly.appendChild(li);
  });
}

function updateInsights() {
  if (transactions.length === 0) {
    document.getElementById("topCategory").textContent = "-";
    document.getElementById("incomeVsExpenses").textContent = "-";
    document.getElementById("frequentType").textContent = "-";
    document.getElementById("weekComparison").textContent = "-";
    return;
  }

  const categoryTotals = {};
  const typeCounts = { income: 0, expense: 0 };

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
    typeCounts[t.type] += 1;
  });

  const topCategory = Object.keys(categoryTotals).length
    ? Object.keys(categoryTotals).reduce((a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b))
    : "No expenses yet";

  const incomeAmount = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseAmount = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const now = new Date();
  const startCurrentWeek = new Date(now);
  startCurrentWeek.setDate(now.getDate() - now.getDay());
  startCurrentWeek.setHours(0, 0, 0, 0);

  const startLastWeek = new Date(startCurrentWeek);
  startLastWeek.setDate(startCurrentWeek.getDate() - 7);

  const thisWeek = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.type === "expense" && d >= startCurrentWeek;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const lastWeek = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return t.type === "expense" && d >= startLastWeek && d < startCurrentWeek;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const weekCopy =
    lastWeek === 0
      ? `${formatCurrency(thisWeek)} this week.`
      : `${Math.round(((thisWeek - lastWeek) / lastWeek) * 100)}% vs last week.`;

  document.getElementById("topCategory").textContent = topCategory;
  document.getElementById("incomeVsExpenses").textContent = `${formatCurrency(incomeAmount)} vs ${formatCurrency(expenseAmount)}`;
  document.getElementById("frequentType").textContent = typeCounts.income >= typeCounts.expense ? "Income" : "Expense";
  document.getElementById("weekComparison").textContent = weekCopy;
}

function setGoal() {
  const goal = Number(document.getElementById("goalInput").value);
  if (!goal || goal <= 0) {
    document.getElementById("goalMessage").textContent = "Please enter a valid goal amount.";
    return;
  }

  monthlyGoal = goal;
  document.getElementById("goal-amount").textContent = formatCurrency(monthlyGoal);
  document.getElementById("goalInput").value = "";
  updateDashboard();
}

function switchView(view) {
  document.querySelectorAll(".view-section").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((el) => el.classList.remove("active"));

  document.getElementById(`${view}-view`).classList.add("active");
  document.querySelector(`.tab-btn[data-view='${view}']`).classList.add("active");
}

function renderAll() {
  displayTransactions();
  updateDashboard();
  updateCategoryBreakdown();
  updateWeeklyTrend();
  updateInsights();
}

document.getElementById("openFormBtn").addEventListener("click", () => {
  switchView("transactions");
  openForm();
});

document.getElementById("saveBtn").addEventListener("click", addTransaction);
document.getElementById("cancelBtn").addEventListener("click", closeForm);
document.getElementById("goalBtn").addEventListener("click", setGoal);
document.getElementById("searchInput").addEventListener("input", displayTransactions);

document.getElementById("transactionList").addEventListener("click", (event) => {
  const editId = event.target.getAttribute("data-edit");
  const deleteId = event.target.getAttribute("data-delete");

  if (editId) editTransaction(Number(editId));
  if (deleteId) deleteTransaction(Number(deleteId));
});

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

renderAll();
