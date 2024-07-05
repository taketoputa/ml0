document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'A', price: 10.00 },
        { id: 2, name: 'B', price: 20.00 },
        { id: 3, name: 'C', price: 30.00 },
        { id: 4, name: 'D', price: 40.00 },
        { id: 5, name: 'E', price: 50.00 },
        { id: 6, name: 'F', price: 60.00 },
        { id: 7, name: 'G', price: 70},
        { id: 8, name: 'H', price: 80.00 },
    ];

        // show produk dan + button
        const productGrid = document.querySelector('.product-grid');
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
    
            productCard.innerHTML = `
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">+</button>
            `;

            productGrid.appendChild(productCard);
        });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const cart = [];
    let gachaChances = 0;

    // menambah keranjang
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.count++;
        } else {
            cart.push({ ...product, count: 1 });
        }

        updateCart();
        updateGachaChances();
    }

    // keranjang
    function updateCart() {
        const cartTableBody = document.querySelector('.cart-summary tbody');
        cartTableBody.innerHTML = '';

        cart.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>$${(item.price * item.count).toFixed(2)}</td>
                <td>
                    <button class="decrease" data-id="${item.id}">-</button>
                </td>
            `;

            cartTableBody.appendChild(row);
        });

        updateTotal();
    }

    //total
    function updateTotal() {
        let total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

        const voucherSelect = document.getElementById('voucher-select');
        const selectedVoucher = vouchers.find(v => v.id == voucherSelect.value);

        if (selectedVoucher) {
            total -= selectedVoucher.discount;
        }
        document.getElementById('total-amount').textContent = total.toFixed(2);
    }

    // kesempatanGaca
    function updateGachaChances() {
        const itemCount = cart.reduce((sum, item) => sum + item.count, 0);
        gachaChances = Math.max(0, itemCount - 1);
        document.getElementById('gacha-chances').textContent = gachaChances;
    }

    // removeitem
    function removeItem(productId) {
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.count--;
            if (cartItem.count === 0) {
                const index = cart.indexOf(cartItem);
                cart.splice(index, 1);
            }
        }
        updateCart();
        updateGachaChances();
    }


    // GACHAAAAAAAAAAAAAAARGHJJHHHJBBJVHHF

    const vouchers = [
        { id: 1, discount: 7.00, name: 'Voucher $7 Off' },
        { id: 2, discount: 20.00, name: 'Voucher $20 Off' },
        { id: 3, discount: 1.00, name: 'Voucher $1 Off' },
    ];

    function gachaVoucher() {
        if (gachaChances > 0) {
            const randomIndex = Math.floor(Math.random() * vouchers.length);
            const voucher = vouchers[randomIndex];
    
            // ambil naama dari gambarnya
            let imageName;
            if (voucher.discount === 7.00) {
                imageName = '7.svg'; 
            } else if (voucher.discount === 20.00) {
                imageName = '20.svg'; 
            } else if (voucher.discount === 1.00) {
                imageName = '1.svg'; //
            }
    
            const imageUrl = `../assets/dipakai/shop/${imageName}`;
    
            const voucherResult = document.querySelector('.voucher-result');
            voucherResult.innerHTML = `<img src="${imageUrl}" alt="${voucher.name}">`;
    
            const voucherSelect = document.getElementById('voucher-select');
            const option = document.createElement('option');
            option.value = voucher.id;
            option.textContent = voucher.name;
            voucherSelect.appendChild(option);
    
            gachaChances--;
            document.getElementById('gacha-chances').textContent = gachaChances;
        } else {
            alert('No more gacha chances left!');
        }
    }
    
    // RESET KERANJANG
    function cancelCart() {
        cart.length = 0;
        document.getElementById('voucher-select').innerHTML = '';
        updateCart();
        updateTotal();
        updateGachaChances();

    const voucherResult = document.querySelector('.voucher-result');
    voucherResult.innerHTML = '';
    }

    //click cancel buat reset keranjang
    document.querySelector('.product-grid').addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId);
        }
    });

    // mines
    document.querySelector('.cart-summary tbody').addEventListener('click', event => {
        if (event.target.classList.contains('decrease')) {
            const productId = parseInt(event.target.dataset.id);
            removeItem(productId);
        }
    });

    // event listener yg lain
    document.querySelector('.gacha-button').addEventListener('click', gachaVoucher);
    document.getElementById('voucher-select').addEventListener('change', updateTotal);
    document.querySelector('.cancel-button').addEventListener('click', cancelCart);

    updateGachaChances();



}
);
