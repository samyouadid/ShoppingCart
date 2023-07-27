const cartItems = [
    { id: 1, name: 'Item 1', price: 10, quantity: 2, liked: false },
    { id: 2, name: 'Item 2', price: 15, quantity: 1, liked: true },
    { id: 3, name: 'Item 3', price: 5, quantity: 3, liked: false }
];

function renderCart() {
    const itemList = document.getElementById('itemList');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    itemList.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button onclick="adjustQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="adjustQuantity(${item.id}, 1)">+</button>
                <span>$${item.price * item.quantity}</span>
                <span class="heart ${item.liked ? 'like' : ''}" onclick="toggleLike(${item.id})">&#x2764;</span>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;
        itemList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice;
}

function adjustQuantity(itemId, amount) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity += amount;
        if (item.quantity < 0) {
            item.quantity = 0;
        }
        renderCart();
    }
}

function deleteItem(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart();
    }
}

function toggleLike(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.liked = !item.liked;
        renderCart();
    }
}

renderCart();
