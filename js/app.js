document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartElement = document.getElementById('cart');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            renderCart();
        }
    }

    function addToCart(productName, price) {
        if (!validateProductName(productName)) {
            alert("Назва товару має містити лише літери, цифри, пробіли та символи '-', '_'.");
            return;
        }

        if (!validateProductPrice(price)) {
            alert("Ціна товару має бути додатним числом з двома десятковими знаками.");
            return;
        }

        cart.push({ name: productName, price });
        saveCart();
        renderCart();
    }

    // Validation functions
    function validateProductName(name) {
        const nameRegex = /^[a-zA-Z0-9\s\-_]+$/;
        return nameRegex.test(name);
    }

    function validateProductPrice(price) {
        const priceRegex = /^\d+(\.\d{2})?$/;
        return price > 0 && priceRegex.test(price.toString());
    }
    
    function removeFromCart(index) {
        cart.splice(index, 1); 
        saveCart();
        renderCart();
    }
    
    function renderCart() {
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Кошик порожній</p>';
        } else {
            let cartContent = '<ul>';
            let total = 0;
            cart.forEach((item, index) => {
                cartContent += `<li>${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})">Видалити</button></li>`;
                total += item.price;
            });
            cartContent += `<li><strong>Разом: ${total} грн</strong></li>`;
            cartContent += '</ul>';
            cartElement.innerHTML = cartContent;
        }
    }

    function submitOrder(event) {
        event.preventDefault();  
        if (cart.length === 0) {
            alert('Ваш кошик порожній!');
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        let orderDetails = `<h3>Деталі замовлення</h3>`;
        orderDetails += `<p><strong>Ім'я:</strong> ${name}</p>`;
        orderDetails += `<p><strong>Email:</strong> ${email}</p>`;
        orderDetails += `<p><strong>Адреса доставки:</strong> ${address}</p>`;
        orderDetails += '<h4>Товари:</h4><ul>';

        let total = 0;
        cart.forEach(item => {
            orderDetails += `<li>${item.name} - ${item.price} грн</li>`;
            total += item.price;
        });
        orderDetails += `<li><strong>Разом: ${total} грн</strong></li>`;
        orderDetails += '</ul>';

        document.getElementById('orderDetails').innerHTML = orderDetails;

        cart = [];
        saveCart();
        renderCart();
        document.getElementById('orderForm').reset();
    }

    loadCart();

    window.addToCart = addToCart;
    window.submitOrder = submitOrder;
    window.removeFromCart = removeFromCart;
    
    document.getElementById('orderForm').addEventListener('submit', submitOrder);
});
