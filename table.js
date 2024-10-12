function verification(element) {
  return Array.isArray(element) && element.length > 0;
}

export function verTable(headInformation, rowData, tableId) {
  if (!verification(headInformation) || !verification(rowData) || !tableId) {
    throw new Error(
      "Informações de head, dados de linha e tableId não podem ser zerados"
    );
  }

  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName != "TABLE") {
    throw new Error("O elemento Table não existe no arquivo HTML.");
  }

  const table = document.getElementById("results-table");
  table.innerHTML = "";

  create_thead(tableElement, headInformation);
  create_tbody(headInformation, rowData, tableElement);
}

////////////////////////////////////////////////////////////////////
//createing table head on the principal table
function create_thead(tableElement, headInformation) {
  // passo 2 apenas se passo 1 informar que não existe um elemento thead
  function creating_thead(tableElement) {
    const thead = document.createElement("thead");
    tableElement.appendChild(thead);
    return thead;
  }
  // passo 1 chama passo 2 caso não exista um elemento thead no meu tableElement ou
  // chamar passo 3 caso já exista um elemento thead
  const thead =
    tableElement.querySelector("thead") ?? creating_thead(tableElement);

  // passo 3 é criado um elemento tr para guardar informações de headinformation
  const headerRow = document.createElement("tr");

  // for executado para cada informação do array headInformation
  for (const tableObject of headInformation) {
    const headElement = /*html*/ `<th> ${tableObject.headInformation} </th>`;
    headerRow.innerHTML += headElement;
  }

  //útima etapa onde é inserido dentro do thead um filho referenciado da constante anterior headerRow
  thead.appendChild(headerRow);
}

/////////////////////////////////////////////////////////////////////////
function create_tbody(headInformation, rowData, tableElement) {
  // passo 2 apenas se passo 1 informar que não existe um elemento thead
  function creating_tbody(tableElement) {
    const tbody = document.createElement("tbody");
    tableElement.appendChild(tbody);
    return tbody;
  }
  // passo 1 chama passo 2 caso não exista um elemento thead no meu tableElement ou
  // chamar passo 3 caso já exista um elemento thead
  const tbody =
    tableElement.querySelector("tbody") ?? creating_tbody(tableElement);

  for (const [itemIndex, tableItem] of rowData.entries()) {
    const trow = document.createElement("tr");

    if (itemIndex % 2 !== 0) {
      trow.classList.add("bg-blue-100");
    }

    for (const tableColumn of headInformation) {
      const formating2 = tableColumn.format ?? ((info) => info);
      trow.innerHTML += /*html*/ `<td>${formating2(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }

    tbody.appendChild(trow);
  }
}
