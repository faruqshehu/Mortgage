document.addEventListener("DOMContentLoaded", () => {
  const loanAmountInput = document.getElementById("loan-amount");
  const termInput = document.getElementById("monthly-payment");
  const interestRateInput = document.getElementById("interest-rate");
  const repaymentBtn = document.getElementById("repaymentBtn");
  const interestBtn = document.getElementById("interestBtn");
  const calculateBtn = document.querySelector(".calculateBtn");

  const monthlyPayOutput = document.getElementById("monthlyPay");
  const totalPayOutput = document.getElementById("totalPay");

  // Calculate Mortgage
  calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(loanAmountInput.value);
    const years = parseFloat(termInput.value);
    const annualRate = parseFloat(interestRateInput.value);

    if (isNaN(loanAmount) || isNaN(years) || isNaN(annualRate)) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfMonths = years * 12;

    let monthlyPayment = 0;
    let totalRepayment = 0;

    if (repaymentBtn.checked) {
      // Repayment Mortgage formula
      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / numberOfMonths;
      } else {
        monthlyPayment =
          (loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, numberOfMonths)) /
          (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
      }
      totalRepayment = monthlyPayment * numberOfMonths;
    } else if (interestBtn.checked) {
      // Interest-only Mortgage
      monthlyPayment = loanAmount * monthlyRate;
      totalRepayment = monthlyPayment * numberOfMonths + loanAmount;
    }

    // Format results
    monthlyPayOutput.value = `€${monthlyPayment.toFixed(2)}`;
    totalPayOutput.value = `€${totalRepayment.toFixed(2)}`;
  });
});
