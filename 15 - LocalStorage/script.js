const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const item = {
        text: addItems.querySelector('input[name="item"]').value,
        done: false
    };
    console.log(item);
    items.push(item);
    populateList(items, itemsList);
    saveItems(items);
    addItems.reset();
}

function populateList(items = [], itemsList) {
    itemsList.innerHTML = items.map((item, i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${item.done ? 'checked' : ''}>
                <label for="item${i}">${item.text}</label>
            </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input[data-index]')) {
        return;
    }
    console.log(e.target);

    items[e.target.dataset.index].done = e.target.checked;
    saveItems(items);
}

function saveItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
