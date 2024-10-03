import { generateReturnArray } from "./investmentGoals";

<<<<<<< Updated upstream
=======
//------------------------------------------------------------------------
//form.addEventListener("submit", generateValues);
const form = document.getElementById("investment-form");
const clear = document.getElementById("clear-button");

clear.addEventListener("click", clear2);

function clear2() {
  const p = document.querySelectorAll("p");
  const input1 = document.getElementById("investment");
  const input2 = document.getElementById("term");
  isEmpity();

  form["investment"].value = "";
  form["contributions"].value = "";
  form["term"].value = "";
  form["profitability"].value = "";
  form["profit-tax"].value = "";

  input1.style = "border: 0.2rem solid aquamarine; border-radius:0.5rem";
  input2.style = "border: 0.2rem solid aquamarine; border-radius:0.5rem";
  for (const ps of p) {
    ps.innerHTML = "";
  }
}
//------------------------------------------------------------------------

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
>>>>>>> Stashed changes
const button = document.getElementById("calculate");

function generateValues(evt) {
  evt.preventDefault();
  const investment = Number(document.getElementById("investment").value);
  const contributions = Number(document.getElementById("contributions").value);
  const term = Number(document.getElementById("term").value);
  const termPeriod = document.getElementById("term-period").value;
  const profitability = Number(document.getElementById("profitability").value);
  const profitabilityPeriod = document.getElementById(
    "profitability-term-period"
  ).value;
  const profitTax = Number(document.getElementById("profit-tax").value);

  const returnArray = generateReturnArray(
    investment,
    contributions,
    term,
    termPeriod,
    profitability,
    profitabilityPeriod
  );

  console.log(returnArray);
}

//form.addEventListener("submit", generateValues); outra opção
button.addEventListener("click", generateValues);
