const container = document.querySelector(".container");
const employeesAndPositionsTable = document.getElementById(
  "employeesAndPositionsTable"
);
const employeesTable = document.getElementById("employeesTable");

const employees = [
  ["Антон", 0],
  ["Юля", 1],
  ["Коля", 1],
  ["Ира", 2],
  ["Катя", 3],
];

const positions = ["руководитель", "программист", "контент менеджер", "стажер"];

function createTitle(title, thead) {
  const header = document.createElement("th");
  header.textContent = title;
  thead.appendChild(header);
}

function createTable(arr, table) {
  table.textContent = "";
  const thead = document.createElement("thead");

  createTitle("Сотрудник", thead);

  if (table === employeesAndPositionsTable) {
    createTitle("Должность", thead);
  }

  table.insertBefore(thead, table.firstChild);

  arr.forEach((employee) => {
    const row = table.insertRow(-1);
    const firstCell = row.insertCell(0);

    firstCell.textContent =
      Array.isArray(employee) && employee.length > 1 ? employee[0] : employee;

    if (table === employeesAndPositionsTable) {
      const secondCell = row.insertCell(1);
      secondCell.textContent = positions[employee[1]];
    }
  });
}

function createButton(text, id) {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  container.appendChild(button);

  button.addEventListener("click", () => {
    createTable(preparationData(id), employeesAndPositionsTable);
  });
}

function setupButtons() {
  createButton("все", "all");

  positions.forEach((position, index) => {
    createButton(`${position}`, index);
  });
}

function preparationData(idBtn) {
  let filterArr;
  switch (true) {
    case /^\d+/.test(idBtn):
      filterArr = employees.filter((item) => item[1] === idBtn);
      break;
    case idBtn === "all":
      filterArr = employees;
      break;
    default:
      filterArr = employees.map((item) => item[0]);
      break;
  }
  return filterArr;
}

createTable(preparationData(), employeesTable);
createTable(preparationData("all"), employeesAndPositionsTable);

setupButtons();
