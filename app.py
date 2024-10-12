from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Приклад каталогу товарів
products = [
    {'id': 1, 'name': 'Товар 1', 'price': 100},
    {'id': 2, 'name': 'Товар 2', 'price': 200},
    {'id': 3, 'name': 'Товар 3', 'price': 300},
]

# Головна сторінка з каталогом товарів
@app.route('/')
def index():
    return render_template('index.html', products=products)

# Додавання товарів у кошик
@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    product = next((item for item in products if item['id'] == product_id), None)
    if product:
        cart = session.get('cart', [])
        cart.append(product)
        session['cart'] = cart
    return redirect(url_for('index'))

# Перегляд кошика
@app.route('/cart')
def cart():
    cart = session.get('cart', [])
    return render_template('cart.html', cart=cart)

# Оформлення замовлення
@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        name = request.form['name']
        address = request.form['address']
        phone = request.form['phone']
        cart = session.get('cart', [])

        # Тут можна зберегти замовлення в базу даних або інші дії

        # Очищення кошика після замовлення
        session['cart'] = []
        return render_template('checkout.html', name=name, address=address, phone=phone, cart=cart)

    return redirect(url_for('cart'))

if __name__ == '__main__':
    app.run(debug=True)
