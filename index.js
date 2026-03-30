const apiURL = "https://raw.githubusercontent.com/rofiiiee/jewelry--data/refs/heads/main/jewelry-data.json";

let cart = JSON.parse(localStorage.getItem('LUXE_BAG')) || [];

async function getProducts() {
    const container = document.getElementById('products-container');
    if(!container) return; 

    container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #c5a059;'>Loading our exquisite collection...</p>";

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        container.innerHTML = '';
        data.products.forEach(product => {
            container.innerHTML += `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${product.photo}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="price">$${product.price.toLocaleString()}</p>
                        <button class="add-to-cart" onclick="addToCart('${product.title}', ${product.price}, '${product.photo}')">
                            ADD TO BAG
                        </button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Unable to load collection.</p>";
    }
}


function addToCart(title, price, img) {
    cart.push({ title, price, img });
    updateUI();
    // openCart(); 
}


function updateUI() {
    localStorage.setItem('LUXE_BAG', JSON.stringify(cart));
    

    const badge = document.getElementById('cart-count');
    if(badge) badge.textContent = cart.length;
    

    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if(!list) return;

    list.innerHTML = '';
    let total = 0;

    if(cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#666; margin-top:40px; font-size:13px;">Your bag is empty.</p>';
    }

    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}">
                <div style="flex:1">
                    <h4 style="font-size:13px; font-family:'Playfair Display', serif;">${item.title}</h4>
                    <p style="color:#c5a059; font-size:12px; margin-top:5px;">$${item.price.toLocaleString()}</p>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:18px;">&times;</button>
            </div>
        `;
    });

    if(totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}


function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}


function openCart() {
    const drawer = document.getElementById('cart-drawer');
    if(drawer) drawer.classList.add('open');
}

function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    if(drawer) drawer.classList.remove('open');
}


document.addEventListener('DOMContentLoaded', () => {
    getProducts(); 
    updateUI();    

    
    document.getElementById('cart-btn')?.addEventListener('click', openCart);
    document.getElementById('close-cart')?.addEventListener('click', closeCart);
});




// --- Auth Logic ---

//(Sign Up)
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const user = { name, email, password };
    localStorage.setItem('LUXE_USER', JSON.stringify(user));
    
    alert('Account created successfully! Please login.');
    window.location.href = 'login.html';
});

// (Login)
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const savedUser = JSON.parse(localStorage.getItem('LUXE_USER'));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        alert('Welcome back, ' + savedUser.name + '!');
        localStorage.setItem('IS_LOGGED_IN', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password.');
    }
});