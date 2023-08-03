const expenseInput = document.querySelector("#spending");
const priceInput = document.querySelector("#price");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const totalInformation = document.querySelector("#total-information");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector('#name-input');

const username = localStorage.getItem("name") || "";
nameInput.value = username;

nameInput.addEventListener("change",(e) => {
    localStorage.setItem("name", e.target.value);
})

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(price) {
    total += Number(price);
    totalInformation.innerText = total;
}

function addExpense(e) {
    e.preventDefault();

    if (!priceInput.value || !expenseInput.value) {
        alert("Please fill out these forms");
        return;
    }

    const expenseDiv = document.createElement("div");

    expenseDiv.classList.add("spending");
    if (statusCheck.checked) {
        expenseDiv.classList.add("paid");
    }

    expenseDiv.innerHTML = `
        <h2>${expenseInput.value}</h2>
        <h2 id="value">${priceInput.value}</h2>
        <div class="buttons">
            <img id="payment" src="/images/pay.png">
            <img id="remove" src="/images/remove.png">
        </div>
        `;

    list.appendChild(expenseDiv);

    updateTotal(priceInput.value);

    expenseInput.value = "";
    priceInput.value = "";
}

function handleClick(e) {
    const element = e.target;
    if (element.id === "remove") {
        const wrapperElement = element.parentElement.parentElement;

        const deletedPrice = wrapperElement.querySelector("#value").innerText;

        updateTotal(-Number(deletedPrice));

        wrapperElement.remove();
    }
}

function handleFilter(e) {
    const items = list.childNodes;

    items.forEach((item) => {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex';
                break;

            case 'paid':
                if (!item.classList.contains('paid')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;

            case 'not-paid':
                if (item.classList.contains('paid')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;
        }
    });
};
