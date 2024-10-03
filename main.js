import { generateReturnArray } from "./investmentGoals";
import { Chart } from "chart.js/auto";

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
const button = document.getElementById("calculate");
let chartDoughnut = {};
let chartBar = {};

function checking(obj) {
  return Object.keys(obj).length === 0;
}

function isEmpity() {
  if (!checking(chartBar) && !checking(chartDoughnut)) {
    chartBar.destroy();
    chartDoughnut.destroy();
  }
}

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
  isEmpity();

  const returnArray = generateReturnArray(
    investment,
    contributions,
    term,
    termPeriod,
    profitability,
    profitabilityPeriod
  );

  function format(value) {
    if (value > 1) {
      return value.toFixed(2);
    }
  }

  const returnValues = returnArray[returnArray.length - 1];

  chartDoughnut = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimentos", "Imposto"],
      datasets: [
        {
          label: "Valor R$",
          data: [
            format(returnValues.startingAmount),
            format(returnValues.totalInterestReturn * (1 - profitTax / 100)),
            format(returnValues.totalInterestReturn * (profitTax / 100)),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  chartBar = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnArray.map((monthObject) => monthObject.month),
      datasets: [
        {
          label: "Investimento",
          data: returnArray.map((investimentObject) =>
            format(investimentObject.startingAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Rendimento",
          data: returnArray.map((interesReturnObject) =>
            format(interesReturnObject.totalInterestReturn)
          ),

          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },

    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  console.log(returnArray);
}

//form.addEventListener("submit", generateValues); outra opção
button.addEventListener("click", generateValues);
