const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Preloaded sample data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [
  { text: "Salary", amount: 30000 },
  { text: "Groceries", amount: -2000 },
  { text: "Freelance", amount: 5000 }
];

function updateUI() {
  list.innerHTML = "";
  let total = 0;
  let inc = 0;
  let exp = 0;

  transactions.forEach((t, index) => {
    total += t.amount;

    if (t.amount > 0) inc += t.amount;
    else exp += t.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${t.text} 
      <span>₹ ${t.amount}</span>
      <button class="delete" onclick="removeTransaction(${index})">X</button>
    `;
    list.appendChild(li);
  });

  balance.innerText = total;
  income.innerText = inc;
  expense.innerText = Math.abs(exp);

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  transactions.push({
    text: text.value,
    amount: Number(amount.value)
  });

  text.value = "";
  amount.value = "";
  updateUI();
});

updateUI();