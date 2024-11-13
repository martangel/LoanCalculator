document.getElementById("loanForm");
document.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateLoanPayment();
});

function calculateLoanPayment() {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const interestRate =
    parseFloat(document.getElementById("interestRate").value) / 100 / 1;
  const loanTermMonths = parseInt(document.getElementById("loanTerm").value);
  const resultDiv = document.getElementById("result");

  console.log("Loan Amount (₱):", loanAmount);
  console.log("Annual Interest Rate (%):", interestRate * 1 * 100);
  console.log("Loan Term (Months):", loanTermMonths);
  console.log("Monthly Interest Rate (Decimal):", interestRate);

  validateInput(loanAmount, "Please enter a valid loan amount.") ||
    validateInput(
      interestRate * 1 * 100,
      "Please enter a valid interest rate."
    ) ||
    validateInput(loanTermMonths, "Please enter a valid loan term.") ||
    displayMonthlyPayment(loanAmount, interestRate, loanTermMonths);
}

function validateInput(value, message) {
  if (isNaN(value) || value <= 0) {
    console.log(message);
    document.getElementById("result").innerHTML = message;
    return true;
  }
  return false;
}

function displayMonthlyPayment(loanAmount, interestRate, loanTermMonths) {
  const monthlyPayment =
    interestRate === 0
      ? loanAmount / loanTermMonths
      : (loanAmount *
          interestRate *
          Math.pow(1 + interestRate, loanTermMonths)) /
        (Math.pow(1 + interestRate, loanTermMonths) - 1);

  console.log("Calculated Monthly Payment (₱):", monthlyPayment.toFixed(2));
  document.getElementById(
    "result"
  ).innerHTML = `Monthly Payment: <b>₱${monthlyPayment.toFixed(2)}</b>`;
}
