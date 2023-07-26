

const transactionDOMList = document.getElementById("list"),
  incomeTextEl = document.getElementById("money-plus"),
  expanseTextEl = document.getElementById("money-minus");
(balanceTextEl = document.getElementById("balance")),
  (addTransactionBtn = document.getElementById("add-transaction-btn")),
  (inputTransactionName = document.getElementById("text")),
  (inputAmount = document.getElementById("amount"));

let transactionId = 0;

const dummyTransactions = [
  { transactionId: 0, transactionName: "Cash", amount: -400 },
  { transactionId: 0, transactionName: "Rent", amount: 600 },
];

function removeTransactionHandler() {
  let transactionToRemoveId = this.getAttribute("data-id");

  dummyTransactions.forEach((transactionObj) => {
    if (transactionObj.transactionId == transactionToRemoveId) {
      dummyTransactions.splice(transactionToRemoveId, 1);
    }
  });

  updateTransactionsDOM();
}

addTransactionBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputTransactionName.value !== "" || inputAmount.value !== "") {
    const transactionObj = {
      transactionId: 0,
      transactionName: inputTransactionName.value,
      amount: +inputAmount.value,
    };
    dummyTransactions.push(transactionObj);
    inputTransactionName.value = "";
    inputAmount.value = "";
    updateTransactionsDOM();
  }else{
    alert("You must enter something in the inputs");
  }
});

const updateMoneyValues = () => {
  let income = dummyTransactions
    .filter((transactionObj) => transactionObj.amount > 0)
    .reduce((income, amount) => {
      return income + amount.amount;
    }, 0)
    .toFixed(2);

  let expanse = dummyTransactions
    .filter((transactionObj) => transactionObj.amount < 0)
    .reduce((expanse, amount) => {
      return expanse + amount.amount;
    }, 0)
    .toFixed(2);

  let balance = +income + +expanse;
  console.log(balance);
  let signForBalance = "";
  if (balance > 0) {
    signForBalance = "+";
  } else if (balance < 0) {
    signForBalance = "-";
  } else {
    signForBalance = "";
  }

  incomeTextEl.innerText = `+${income}`;
  expanseTextEl.innerText = `-$${Math.abs(expanse)}`;
  balanceTextEl.innerText = signForBalance + "$" + Math.abs(balance);
};

const updateTransactionsDOM = () => {
  // restartujemo id-ijeve kako bi svaki imao po 1 inkrementiran i
  // jedinstven
  transactionId = 0;
  dummyTransactions.forEach((transactionObj) => {
    transactionObj.transactionId = transactionId;
    transactionId++;
  });
  transactionDOMList.innerHTML = "";
  dummyTransactions.forEach((transactionObj) => {
    const li = document.createElement("li");
    li.classList.add(transactionObj.amount > 0 ? "plus" : "minus");
    li.innerHTML = `${transactionObj.transactionName} <span>${transactionObj.amount}</span>`;
    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.setAttribute("data-id", transactionObj.transactionId);
    removeBtn.innerText = "x";
    removeBtn.addEventListener("click", removeTransactionHandler);
    li.appendChild(removeBtn);
    transactionDOMList.appendChild(li);
  });
  updateMoneyValues();
};

const init = () => {
  updateTransactionsDOM();
};

init();
