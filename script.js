// --- Product Data Mockup (for simulating product details) ---
const ALL_PRODUCTS = {
    // Featured Products
    '1': { name: 'StrideX Racer', price: 180.00, salePrice: 144.00, sizes: ['7', '8', '9', '10'], reviews: 5 },
    '2': { name: 'StrideX Air', price: 165.00, sizes: ['6', '7', '8', '9'], reviews: 4 },
    '3': { name: 'StrideX Flex', price: 150.00, salePrice: 105.00, sizes: ['7', '8', '9', '10'], reviews: 5 },
    '4': { name: 'StrideX Elite', price: 220.00, sizes: ['8', '9', '10', '11'], reviews: 4 },
    '5': { name: 'StrideX Runner', price: 195.00, sizes: ['7', '8', '9', '10'], reviews: 5 },

    // Men's Products
    'M1': { name: 'StrideX Classic', price: 140.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M2': { name: 'StrideX Volt', price: 175.00, sizes: ['8', '9', '10', '11'], reviews: 5 },
    'M3': { name: 'StrideX Prime', price: 190.00, salePrice: 133.00, sizes: ['7', '8', '9', '10'], reviews: 5 },
    'M4': { name: 'StrideX Stealth', price: 210.00, sizes: ['8', '9', '10', '11'], reviews: 4 },
    'M5': { name: 'StrideX Pulse', price: 160.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M6': { name: 'StrideX Trekker', price: 250.00, sizes: ['8', '9', '10', '11'], reviews: 5 },
    'M7': { name: 'StrideX Ranger', price: 280.00, salePrice: 196.00, sizes: ['7', '8', '9', '10'], reviews: 5 },
    'M8': { name: 'StrideX Hiker', price: 230.00, sizes: ['9', '10', '11', '12'], reviews: 4 },
    'M9': { name: 'StrideX Apex', price: 310.00, sizes: ['8', '9', '10', '11'], reviews: 5 },
    'M10': { name: 'StrideX Guard', price: 265.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M11': { name: 'StrideX Breeze', price: 135.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M12': { name: 'StrideX Glide', price: 170.00, salePrice: 119.00, sizes: ['8', '9', '10', '11'], reviews: 5 },
    'M13': { name: 'StrideX Speed', price: 150.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M14': { name: 'StrideX Pacer', price: 145.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M15': { name: 'StrideX Flow', price: 125.00, sizes: ['7', '8', '9', '10'], reviews: 5 },
    'M16': { name: 'StrideX Dash', price: 195.00, sizes: ['8', '9', '10', '11'], reviews: 5 },
    'M17': { name: 'StrideX Boost', price: 215.00, sizes: ['7', '8', '9', '10'], reviews: 4 },
    'M18': { name: 'StrideX Sprint', price: 240.00, salePrice: 168.00, sizes: ['8', '9', '10', '11'], reviews: 5 },
    'M19': { name: 'StrideX Ultra', price: 260.00, sizes: ['7', '8', '9', '10'], reviews: 5 },
    'M20': { name: 'StrideX Pro', price: 205.00, sizes: ['8', '9', '10', '11'], reviews: 4 },

    // Women's Products
    'W1': { name: 'StrideX Chic', price: 150.00, sizes: ['5', '6', '7', '8'], reviews: 5 },
    'W2': { name: 'StrideX Aura', price: 170.00, salePrice: 119.00, sizes: ['6', '7', '8', '9'], reviews: 5 },
    'W3': { name: 'StrideX Grace', price: 165.00, sizes: ['5', '6', '7', '8'], reviews: 4 },
    'W4': { name: 'StrideX Vibe', price: 145.00, sizes: ['6', '7', '8', '9'], reviews: 5 },
    'W5': { name: 'StrideX Luminate', price: 195.00, salePrice: 136.50, sizes: ['5', '6', '7', '8'], reviews: 5 },

    // Kid's Products
    'K1': { name: 'StrideX Play', price: 90.00, sizes: ['1Y', '2Y', '3Y'], reviews: 4 },
    'K2': { name: 'StrideX Zoom', price: 110.00, salePrice: 77.00, sizes: ['1Y', '2Y', '3Y'], reviews: 5 },
    'K3': { name: 'StrideX Mini', price: 85.00, sizes: ['1Y', '2Y', '3Y'], reviews: 4 },
    'K4': { name: 'StrideX Fun', price: 95.00, sizes: ['1Y', '2Y', '3Y'], reviews: 5 },
    'K5': { name: 'StrideX Star', price: 105.00, sizes: ['1Y', '2Y', '3Y'], reviews: 4 }
};


document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart on page load
    loadCart();

    // Setup Search Toggle
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    if (searchToggle && searchDropdown) {
        searchToggle.addEventListener('click', () => {
            searchDropdown.style.display = searchDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchToggle.contains(event.target) && !searchDropdown.contains(event.target)) {
                searchDropdown.style.display = 'none';
            }
        });
    }

    // Setup Product Card Click for Details
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Prevent opening modal if 'Add to Cart' or a button was clicked
            if (event.target.tagName !== 'BUTTON') {
                const id = card.getAttribute('data-product-id');
                showProductDetails(id);
            }
        });
    });

    // Only run cart rendering if on the cart page
    if (document.querySelector('.cart-summary')) {
        renderCart();
    }
});


// --- General Utility Functions ---

// Global function to handle form submission (from contact.html)
window.handleSubmit = (event) => {
    event.preventDefault(); // Prevent actual form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        console.log('Contact Form Submitted:', { name, email, message });

        const formMessage = document.getElementById('form-message');
        formMessage.style.display = 'block';

        event.target.reset();

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
};

// Global function to handle subscribe form submission (from index.html)
window.handleSubscribe = (event) => {
    event.preventDefault();

    const email = document.getElementById('subscribe-email').value;

    if (email) {
        console.log('Subscription Submitted:', { email });

        const subMessage = document.getElementById('subscribe-message');
        subMessage.style.display = 'block';

        event.target.reset();

        setTimeout(() => {
            subMessage.style.display = 'none';
        }, 5000);
    }
};


// Global utility to close the modal
window.closeModal = () => {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};


// --- Product Detail Modal Logic (Simulated) ---

function getStarRatingHTML(reviews) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<span class="star">${i < reviews ? '★' : '☆'}</span>`;
    }
    return `<div class="star-rating">${stars} (${reviews} reviews)</div>`;
}

function showProductDetails(id) {
    const product = ALL_PRODUCTS[id];
    if (!product) return;

    const currentPrice = product.salePrice ? product.salePrice : product.price;
    const oldPriceHTML = product.salePrice ? `<span class="price-old-detail">$${product.price.toFixed(2)}</span>` : '';

    const modalHTML = `
        <div class="product-detail-modal-content">
            <h3>${product.name} Details</h3>
            ${getStarRatingHTML(product.reviews)}
            <p><strong>Price:</strong> ${oldPriceHTML} <span class="price-new-detail">$${currentPrice.toFixed(2)}</span></p>
            <p><strong>Available Sizes:</strong> ${product.sizes.join(', ')}</p>
            <p>This is a placeholder for a detailed description of the ${product.name}.</p>
            <div style="margin-top: 20px;">
                <button class="add-to-cart" onclick="addToCart('${id}', '${product.name}', ${currentPrice})">Add to Cart</button>
                <button onclick="closeModal()">Close</button> 
            </div>
        </div>
    `;
    
    // Create and insert modal
    let modal = document.getElementById('product-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-modal';
        modal.classList.add('product-detail-modal');
        document.body.appendChild(modal);

        // *** FIX 2: Add event listener to close when clicking the dark background ***
        modal.addEventListener('click', (event) => {
            // Only close the modal if the click target is the modal itself (the dark overlay), 
            // not the content box inside it.
            if (event.target.id === 'product-modal') {
                closeModal();
            }
        });
    }

    modal.innerHTML = modalHTML; // Insert content
    
    // *** FIX 1: Ensure modal is displayed as 'flex' for proper CSS centering ***
    modal.style.display = 'flex'; // This activates the modal with centering styles
}


// --- Cart Management Functions ---

const getCart = () => {
    const cart = localStorage.getItem('strideXCart');
    return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('strideXCart', JSON.stringify(cart));
};

const updateCartCount = (cart) => {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalItems;
    }
};

window.loadCart = () => {
    updateCartCount(getCart());
};

window.addToCart = (id, name, price) => {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount(cart);

    // Optional: Give feedback that the item was added
    alert(`${name} added to cart!`); 
};

window.renderCart = () => {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-amount');

    if (!container || !totalElement) return;

    const cart = getCart();
    container.innerHTML = ''; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="item-controls">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="remove-item" onclick="removeItem('${item.id}')">Remove</button>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
            `;
            container.appendChild(itemDiv);
        });
    }

    totalElement.textContent = `$${total.toFixed(2)}`;
};

// Update item quantity
window.updateQuantity = (id, change) => {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            // Remove item if quantity drops to zero or below
            cart.splice(itemIndex, 1);
        }
    }

    saveCart(cart);
    updateCartCount(cart);
    renderCart();
};

// Remove item completely
window.removeItem = (id) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);

    saveCart(cart);
    updateCartCount(cart);
    renderCart();
};

// Clear the entire cart
window.clearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
        localStorage.removeItem('strideXCart');
        updateCartCount([]);
        renderCart();
    }
};

// Simulate checkout
window.checkout = () => {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    console.log("Processing Checkout:", cart);

    const checkoutMessage = document.getElementById('checkout-message');
    if (checkoutMessage) {
        checkoutMessage.style.display = 'block';
        clearCart();
        setTimeout(() => {
            checkoutMessage.style.display = 'none';
        }, 5000);
    }
};
/* --- Login/Signup Logic (NEW ADDITIONS ONLY) --- */

// Check if we are on the login page and set up the toggle function
document.addEventListener('DOMContentLoaded', () => {
    // Check if the element unique to the login page exists
    if (document.getElementById('login-form-container')) {
        setupLoginPage();
    }
});

function setupLoginPage() {
    const loginToggle = document.getElementById('login-toggle-btn');
    const signupToggle = document.getElementById('signup-toggle-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Function to switch between forms
    window.switchForm = (formType) => {
        const switchText = document.getElementById('switch-text');
        const switchLinkText = document.getElementById('switch-link-text');

        if (formType === 'login') {
            loginForm.style.display = 'flex';
            signupForm.style.display = 'none';
            loginToggle.classList.add('active');
            signupToggle.classList.remove('active');
            switchText.textContent = 'New user? ';
            switchLinkText.textContent = 'Sign Up Here';
        } else if (formType === 'signup') {
            loginForm.style.display = 'none';
            signupForm.style.display = 'flex';
            loginToggle.classList.remove('active');
            signupToggle.classList.add('active');
            switchText.textContent = 'Already have an account? ';
            switchLinkText.textContent = 'Log In Here';
        }
        // Clear any previous messages when switching forms
        document.getElementById('form-message').style.display = 'none';
    };
    
    // Initial setup to ensure the login form is shown first
    if (loginForm && signupForm) {
        switchForm('login');
    }
}

// Global function to handle login form submission
window.handleLogin = (event) => {
    event.preventDefault();
    const formMessage = document.getElementById('form-message');
    
    // Simple console log for simulation
    const email = event.target.elements.email.value;
    console.log('Login Attempt:', { email });
    
    formMessage.textContent = 'Login successful! Redirecting...';
    formMessage.style.display = 'block';
    formMessage.style.color = 'var(--accent-color)';
    event.target.reset();

    // Simulate redirection
    setTimeout(() => {
        // In a real site, you would redirect here: window.location.href = 'index.html';
        formMessage.style.display = 'none';
    }, 2000);
};

// Global function to handle signup form submission
window.handleSignup = (event) => {
    event.preventDefault();
    const formMessage = document.getElementById('form-message');

    // Simple console log for simulation
    const email = event.target.elements.email.value;
    console.log('Signup Attempt:', { email });
    
    formMessage.textContent = 'Registration successful! Please log in.';
    formMessage.style.display = 'block';
    formMessage.style.color = 'var(--accent-color)';
    event.target.reset();

    // After signup, switch back to login form
    setTimeout(() => {
        window.switchForm('login');
    }, 1500);
};