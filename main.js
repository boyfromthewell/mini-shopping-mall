//fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}
// 리스트 업데이트, mapping된 문자열 string으로 변환
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

//html문자로 만들어주기
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_detail">${item.gender}, ${item.size}</span>
    </li>
    `;
}
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
}
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}
// data 읽어오기
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
