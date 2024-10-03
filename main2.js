function enable(n) {
  const input = document.getElementById(`${n}`);
  const inputvalue = input.value;
  const graparents = input.parentElement;
  const grangranparent = graparents.parentElement;
  const grangrafirstchild = grangranparent.firstElementChild.innerHTML;
  const lastchild = grangranparent.lastElementChild;

  if (!inputvalue || inputvalue <= 0) {
    input.style =
      "border: 0.1rem solid #e00000; border-radius:0.5rem;box-shadow: inset 0rem 0rem 0.5rem #e00000;";
    lastchild.innerText = `Valor ${grangrafirstchild} é obrigatório e maior que zero.`;
    lastchild.style = "color: #e00000; font-weight: 500";
  } else {
    input.style = "border: 0.2rem solid aquamarine; border-radius:0.5rem";
    lastchild.innerHTML = "";
  }
}

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
