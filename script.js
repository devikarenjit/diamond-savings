let editingId = null;
let transactions = [];

function addTransaction() {
  const amountStr = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  if (!amountStr || !category) {
    alert("Please enter amount and category");
    return;
  }

  const numAmount = Number(amountStr);
  if (isNaN(numAmount) || numAmount <= 0) {
    alert("Amount must be positive number");
    return;
  }

  if (editingId) {
    // update existing
    transactions = transactions.map(t =>
      t.id === editingId
        ? { ...t, amount: numAmount, type, category, date, notes }
        : t
    );
    editingId = null;
  } else {
    // add new
    transactions.push({
      id: Date.now(),
      amount: numAmount,
      type,
      category,
      date,
      notes
    });
  }

  saveData();
  resetForm();
  toggleForm();
  displayTransactions();
  updateDashboard();
  updateInsights();
}

function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function resetForm() {
  editingId = null;
  document.getElementById('amount').value = '';
  document.getElementById('type').value = 'income';
  document.getElementById('category').value = '';
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  document.getElementById('notes').value = '';
}
function displayTransactions(query = '') {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  const filtered = transactions.filter(t => 
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = "<p>No transactions found</p>";
    return;
  }

  filtered.forEach((t) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${t.type.toUpperCase()} - ${currency.format(t.amount)} (${t.category}) ${t.date ? `| ${t.date}` : ''} ${t.notes ? `- ${t.notes}` : ''}</span>
      <div>
        <button class="edit-btn" data-id="${t.id}">Edit</button>
        <button class="delete-btn" data-id="${t.id}">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveData();
  displayTransactions();
  updateDashboard();
  updateInsights();
}

function editTransaction(id) {
  const t = transactions.find(t => t.id === id);

  editingId = id;

  document.getElementById("amount").value = t.amount;
  document.getElementById("type").value = t.type;
  document.getElementById("category").value = t.category;
  document.getElementById("date").value = t.date || "";
  document.getElementById("notes").value = t.notes || "";

  toggleForm();
}
function updateDashboard() {
  let income = 0;
  let expenses = 0;
  let categoryMap = {};

  transactions.forEach(t => {
    const amt = Number(t.amount);
    if (t.type === "income") {
      income += amt;
    } else {
      expenses += amt;
      categoryMap[t.category] = (categoryMap[t.category] || 0) + amt;
    }
  });

  const balance = income - expenses;

  document.getElementById("total-income").textContent = currency.format(income);
  document.getElementById("total-expenses").textContent = currency.format(expenses);
  document.getElementById("current-balance").textContent = currency.format(balance);

  updateCategories(categoryMap);
  updateSavings(income, expenses);
}

function updateCategories(categoryMap) {
  const categoryList = document.getElementById("category-list");
  if (Object.keys(categoryMap).length === 0) {
    categoryList.innerHTML = '<li>No expenses yet</li>';
    return;
  }

  const maxSpend = Math.max(...Object.values(categoryMap));
  categoryList.innerHTML = Object.entries(categoryMap)
    .map(([name, spend]) => {
      const width = (spend / maxSpend * 100);
      return `
        <li>
          <strong>${name}</strong>
          <div class="bar" aria-hidden="true"><span style="width:${width}%"></span></div>
          <span>${currency.format(spend)}</span>
        </li>
      `;
    }).join('');
}

function updateSavings(income, expenses) {
  const savingsAmount = income - expenses;
  const progress = Math.max(0, Math.min(100, (savingsAmount / savingsGoal) * 100));

  document.getElementById("goal-amount").textContent = currency.format(savingsGoal);
  document.getElementById("savings-percent").textContent = `${Math.round(progress)}%`;
  document.getElementById("savings-fill").style.width = `${progress}%`;
}

// Removed hardcoded dashboardData - now computed from transactions in updateDashboard() and new updateCategories()
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
  
// Event delegation for transactions & buttons
document.addEventListener('DOMContentLoaded', initApp);

function setGoal() {
  const goalStr = document.getElementById('goalInput').value;
  const goal = Number(goalStr);
  if (isNaN(goal) || goal <= 0) {
    document.getElementById('goalMessage').textContent = 'Enter positive goal amount';
    return;
  }
  savingsGoal = goal;
  localStorage.setItem('savingsGoal', goal);
  document.getElementById('goalMessage').textContent = `Goal set to ${currency.format(goal)}!`;
  updateDashboard();
  setTimeout(() => {
    document.getElementById('goalMessage').textContent = '';
  }, 3000);
}

function initApp() {
  // Load transactions
  const saved = localStorage.getItem('transactions');
  if (saved) {
    transactions = JSON.parse(saved);
  }

  // Load goal
  savingsGoal = localStorage.getItem('savingsGoal') || 4000;
  if (document.getElementById('goalInput')) document.getElementById('goalInput').value = savingsGoal;

  displayTransactions();
  updateDashboard();
  updateInsights();

  // Toggle form
  document.querySelector('.action-btn').onclick = toggleForm;

  // Form submit on Enter
  document.querySelector('.transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTransaction();
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', searchTransactions);

  // Event delegation
  document.getElementById('transactionList').addEventListener('click', (e) => {
    if (e.target.matches('.edit-btn')) editTransaction(parseInt(e.target.dataset.id));
    if (e.target.matches('.delete-btn')) {
      if (confirm('Delete?')) deleteTransaction(parseInt(e.target.dataset.id));
    }
  });
}

function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function toggleForm() {
  const form = document.querySelector('.transaction-form');
  form.style.display = form.style.display === 'block' ? 'none' : 'block';
  if (form.style.display === 'block') resetForm();
  document.getElementById('goalMessage').textContent = '';
}

function resetForm() {
  editingId = null;
  document.getElementById('amount').value = '';
  document.getElementById('type').value = 'income';
  document.getElementById('category').value = '';
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  document.getElementById('notes').value = '';
}
function updateInsights() {
  if (transactions.length === 0) {
    document.getElementById("topCategory").textContent = "-";
    document.getElementById("incomeVsExpenses").textContent = "-";
    document.getElementById("frequentType").textContent = "-";
    return;
  }

  let categoryMap = {};
  let incomeTotal = 0;
  let expenseTotal = 0;
  let typeCount = { income: 0, expense: 0 };

  transactions.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);

    if (t.type === "income") {
      incomeTotal += Number(t.amount);
      typeCount.income++;
    } else {
      expenseTotal += Number(t.amount);
      typeCount.expense++;
    }
  });

  // Top category with fallback
  let topCategory = Object.keys(categoryMap).length > 0 
    ? Object.keys(categoryMap).reduce((a, b) => categoryMap[a] > categoryMap[b] ? a : b)
    : "None";

  document.getElementById("topCategory").textContent = topCategory;
  document.getElementById("incomeVsExpenses").textContent = `${currency.format(incomeTotal)} vs ${currency.format(expenseTotal)}`;
  document.getElementById("frequentType").textContent = typeCount.income > typeCount.expense ? "Income" : "Expense";
}

function searchTransactions() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  displayTransactions(query); // Reuse display with optional filter
}
