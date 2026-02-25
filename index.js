// --- 1. FIREBASE CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyBPs-cn62v2r0qoG_uqfE8QGcuOJNJEIYY",
    authDomain: "erantiana.firebaseapp.com",
    projectId: "erantiana",
    storageBucket: "eratiana.appspot.com",
    messagingSenderId: "35925770958",
    appId: "1:35925770958:web:9afdb65e2bf292f801469f",
    measurementId: "G-HYR8F6RFS9"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
} else {
    console.error("Firebase SDK not loaded.");
}

// --- APP CONFIGURATION ---
const CONFIG = {
    CURRENCY: 'LKR',
    ADMIN_KEY: '1234',
    WHATSAPP_NUMBER: '94781026261'
};

// --- STATE MANAGEMENT ---
const state = {
    cart: [],
    orders: [],
    currentPage: 'store',
    isAdmin: false,
    byob: { step: 1, selectedBox: null, items: {} }
};

// --- DATA ---
const products = [
    {
        id: 1,
        name: '🎀 Sparkle Stationery & Fun Box',
        price: 5500.00,
        image: '1.JPG',
        description: 'Make gifting extra special with our thoughtfully curated Kids Premium Gift Box for Girls. Packed with colourful stationery, creative activity items, and a playful pop-it crossbody bag, this box is designed to inspire imagination and joyful learning.',
        ageRange: 'no age limit',
        items: [
            '12-colour pencils set',
            'Hello Kitty highlighter',
            'Magnetic dress-up activity kit',
            'All-in-one stationery kit (includes pencils, eraser, sharpener, ruler, etc.)',
            'Marine fish notebook',
            'Donut notebook',
            'Keychain',
            '12-colour oil pastels',
            'Pop-it kids crossbody bag',
            'Premium gift box packaging'
        ],
        category: 'premium Collection'
    },

    {
        id: 2,
        name: 'Stich happy box ',
        price: 5650.00,
        image: '2.JPG',
        description: 'Bring joy to any Stitch lover with our specially curated Stitch Gift Box. Packed with adorable plushies, fun stationery, and practical accessories, this gift set is perfect for birthdays, surprises, or themed celebrations. Beautifully packaged in a premium gift box, it’s designed to make gifting effortless and memorable.',
        ageRange: 'no age limit', // Optional
        items: [
            ' Stitch Plushie - Soft, adorable, and perfect for cuddles',
            'Stitch Keychain - Cute accessory for bags or keys',
            'Stitch Notebook - Perfect for jotting down notes or sketches',
            'Stitch Pen Set - Fun and functional stationery',
            'Stitch 2-in-1 Eraser & Sharpener  Practical and compact design',

        ],
        category: 'Premium Collection'
    },

    {
        id: 3,
        name: 'Twinkle Pink Box',
        price: 3300.00,
        image: '3.JPG',
        description: 'Twinkle Pink Box - The Perfect Gift for Little Sparkles! Make every moment magical with our Twinkle Pink Box, thoughtfully packed with adorable and practical essentials. This charming set includes a pink-themed tiffin box, breakfast box, straw cup, unicorn oil pastel pack, and a fun fish-shaped notebook — all beautifully arranged in a premium gift box.',
        ageRange: 'Perfect for ages 3-8', // Optional
        items: [
            'A Tiffin box (pink theme)',
            'Breakfast box (pink theme)',
            'Straw cup (pink theme)',
            'Unicorn oil pastel pack',
            'Fish-shaped notebook',
            'with gift box packaging'

        ],
        category: 'Kids Collection'
    },

    {
        id: 4,
        name: 'Adventure fun box',
        price: 6750.00,
        image: '4.JPG',
        description: 'Surprise your little one with the Adventure Fun Box, a delightful gift set designed to spark imagination, creativity, and endless play. Thoughtfully curated with colorful, exciting, and kid-friendly essentials, this box brings joy from the moment it’s opened. Perfect for birthdays, celebrations, or simply making a child day extra special, it’s a gift that blends learning with fun in the sweetest way.',
        ageRange: 'Perfect for ages 3-8', // Optional
        items: [
            'A 12-color pencil pack',
            'A stationery kit (includes pencils, eraser, sharpener, ruler, notebook)',
            'A truck-shaped tiffin box',
            'A 3D notebook (meow)',
            'A rotating puzzle pack',
            'A Spiderman sharpener',
            'A Pokémon toy pack',
            'A straw cup',
            'A do-nut notebook',
            'With gift box'

        ],
        category: 'Kids Collection'
    },

    {
        id: 5,
        name: 'Blue bliss box',
        price: 4800.00,
        image: '5.JPG',
        description: 'A pastel-blue delight filled with adorable, useful, and girly must-haves—perfect for gifting on any special occasion.',
        ageRange: 'Perfect for ages 3-8', // Optional
        items: [
            'A blue drink-up bottle',
            'A soft, fluffy face towel',
            'A stylish hair clip',
            'A cute keychain',
            'A matching scrunchie',
            'A charming bracelet',
            'A “Meow” 3D notebook',

        ],
        category: 'Kids Collection'
    },


    // ADD MORE PRODUCTS HERE - Template:
    // { 
    //     id: 2, 
    //     name: 'Product Name', 
    //     price: 6250.00, 
    //     image: '2.jpg',
    //     description: 'Full product description...',
    //     ageRange: 'Suitable for ages X – Y years', // Optional
    //     items: [
    //         'Item 1',
    //         'Item 2',
    //         'Item 3'
    //     ],
    //     category: 'Category Name'
    // },
];

const boxOptions = [
    { id: 'small', name: 'Small Box', basePrice: 1000, maxItems: 3 },
    { id: 'medium', name: 'Medium Box', basePrice: 1500, maxItems: 5 },
    { id: 'large', name: 'Large Box', basePrice: 2000, maxItems: 8 }
];

const itemOptions = [
    { id: 'mug', name: 'Custom Mug', price: 2000 },
    { id: 'candle', name: 'Soy Candle', price: 1200 },
    { id: 'journal', name: 'Linen Journal', price: 1400 },
    { id: 'tea', name: 'Loose Leaf Tea', price: 900 },
    { id: 'choc', name: 'Artisan Choc', price: 750 }
];

// --- CORE LOGIC ---
const app = {
    init: () => {
        const yearElem = document.getElementById('year');
        if (yearElem) yearElem.textContent = new Date().getFullYear();
        app.render();
    },

    navigate: async (page) => {
        state.currentPage = page;
        window.scrollTo(0, 0);
        app.closeMobileMenu();

        if (page === 'admin' && state.isAdmin) {
            await app.fetchOrders();
        }

        app.render();
    },

    toggleMobileMenu: () => {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    },

    closeMobileMenu: () => {
        const menu = document.getElementById('mobile-menu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    },

    toggleAdmin: () => {
        if (state.isAdmin) {
            state.isAdmin = false;
            app.navigate('store');
        } else {
            const pass = prompt("Enter Admin Code:");
            if (pass === CONFIG.ADMIN_KEY) {
                state.isAdmin = true;
                app.navigate('admin');
            } else {
                alert("Incorrect code.");
            }
        }
    },

    fetchOrders: async () => {
        if (!db) return;
        const loading = document.getElementById('admin-content');
        if (loading) loading.innerHTML = '<p class="text-center">Loading Orders...</p>';

        try {
            const snapshot = await db.collection('orders')
                .orderBy('createdAt', 'desc')
                .limit(20)
                .get();

            state.orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            app.render();
        } catch (error) {
            console.error("Error fetching orders:", error);
            const snapshot = await db.collection('orders').get();
            state.orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            app.render();
        }
    },

    addToCart: (item) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += item.quantity || 1;
        } else {
            state.cart.push({ ...item, quantity: item.quantity || 1 });
        }
        app.updateCartUI();
        alert(`${item.name} added to cart!`);
    },

    removeFromCart: (id) => {
        state.cart = state.cart.filter(i => i.id !== id);
        app.render();
        app.updateCartUI();
    },

    updateQuantity: (id, change) => {
        const item = state.cart.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) app.removeFromCart(id);
            else {
                app.render();
                app.updateCartUI();
            }
        }
    },

    clearCart: () => {
        state.cart = [];
        app.updateCartUI();
        app.render();
    },

    updateCartUI: () => {
        const count = state.cart.reduce((sum, i) => sum + i.quantity, 0);
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        }
    },

    placeOrder: async (formElement) => {
        const btn = document.getElementById('pay-btn');
        const formContainer = formElement.parentElement;

        btn.textContent = 'Processing...';
        btn.disabled = true;

        const formData = new FormData(formElement);
        const customerName = formData.get('fullName');
        const email = formData.get('email');
        const address = formData.get('address');
        const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const itemsListString = state.cart.map(i => `- ${i.name} (x${i.quantity})`).join('\n');

        const whatsappMessage =
            `*New Order Request!* 🎁
------------------
*Customer:* ${customerName}
*Address:* ${address}
*Email:* ${email}

*Order Details:*
${itemsListString}

*Total Price:* ${CONFIG.CURRENCY} ${totalPrice}
------------------
Please confirm my order and payment details.`;

        const orderData = {
            customerName,
            email,
            address,
            items: state.cart,
            totalPrice,
            status: 'Pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            if (db) await db.collection('orders').add(orderData);

            const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

            // Replaced auto-redirect with manual button for mobile reliability
            formContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="check" class="w-8 h-8 text-green-600"></i>
                    </div>
                    <h3 class="text-2xl font-serif text-gray-800 mb-2">Order Saved!</h3>
                    <p class="text-gray-600 mb-6">Click below to send your order details via WhatsApp to complete the purchase.</p>
                    
                    <a href="${whatsappUrl}" target="_blank" 
                       onclick="app.finishOrder()"
                       class="inline-flex items-center justify-center w-full py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#128C7E] transition shadow-lg text-lg">
                        <i data-lucide="message-circle" class="mr-2"></i>
                        Open WhatsApp
                    </a>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();

        } catch (error) {
            console.error("Error:", error);
            alert('Error processing order. Please try again.');
            btn.disabled = false;
            btn.textContent = 'Place Order via WhatsApp 💬';
        }
    },

    finishOrder: () => {
        // Delay clearing cart slightly so they don't see it empty if they come back immediately
        setTimeout(() => {
            app.clearCart();
            app.navigate('store');
        }, 1000);
    },

    byob: {
        selectBox: (boxIndex) => {
            state.byob.selectedBox = boxOptions[boxIndex];
            state.byob.step = 2;
            state.byob.items = {};
            app.render();
        },
        updateItem: (itemId, change) => {
            const currentCount = state.byob.items[itemId] || 0;
            const totalItems = Object.values(state.byob.items).reduce((a, b) => a + b, 0);

            if (change > 0 && totalItems >= state.byob.selectedBox.maxItems) return;
            if (change < 0 && currentCount === 0) return;

            const newCount = currentCount + change;
            if (newCount === 0) delete state.byob.items[itemId];
            else state.byob.items[itemId] = newCount;

            app.render();
        },
        finish: () => {
            const totalItemsCost = Object.entries(state.byob.items).reduce((sum, [id, qty]) => {
                const item = itemOptions.find(i => i.id === id);
                return sum + (item.price * qty);
            }, 0);

            const finalPrice = state.byob.selectedBox.basePrice + totalItemsCost;

            app.addToCart({
                id: `custom-${Date.now()}`,
                name: `Custom ${state.byob.selectedBox.name}`,
                price: finalPrice,
                type: 'Custom'
            });

            state.byob = { step: 1, selectedBox: null, items: {} };
            app.render();
        }
    },

    openModal: (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const modal = document.getElementById('quick-view-modal');
        const content = document.getElementById('modal-content');

        // Build items list HTML if items exist
        const itemsHTML = product.items ? `
            <div class="mb-6">
                <h3 class="font-semibold text-lg mb-3 text-gray-800">📦 Included Items:</h3>
                <ul class="space-y-2">
                    ${product.items.map(item => `
                        <li class="flex items-start">
                            <span class="text-pink-500 mr-2">•</span>
                            <span class="text-gray-700">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : '';

        const ageHTML = product.ageRange ? `
            <div class="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-4">
                <p class="text-sm font-medium text-pink-800">👶 ${product.ageRange}</p>
            </div>
        ` : '';

        content.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8">
                <div>
                    <img src="${product.image}" class="w-full h-auto object-cover rounded-lg shadow-lg" 
                         onerror="this.src='https://placehold.co/400x400/f3a8b4/333333?text=${encodeURIComponent(product.name)}'">
                </div>
                <div>
                    <h2 class="text-3xl font-serif mb-3 text-gray-800">${product.name}</h2>
                    <p class="text-3xl font-bold text-pink-600 mb-4">${CONFIG.CURRENCY} ${product.price.toLocaleString()}</p>
                    
                    ${ageHTML}
                    
                    <p class="text-gray-600 mb-6 leading-relaxed">${product.description}</p>
                    
                    ${itemsHTML}
                    
                    <button onclick="app.addToCart({id: ${product.id}, name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}}); app.closeModal()" 
                        class="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 transition font-semibold text-lg shadow-lg">
                        Add to Cart 🛒
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    closeModal: () => {
        document.getElementById('quick-view-modal').classList.add('hidden');
    },

    render: () => {
        const container = document.getElementById('main-content');
        container.innerHTML = '';

        if (state.currentPage === 'store') container.innerHTML = app.views.store();
        else if (state.currentPage === 'checkout') container.innerHTML = app.views.checkout();
        else if (state.currentPage === 'admin') container.innerHTML = app.views.admin();

        if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    views: {
        store: () => {
            const productHTML = products.map(p => `
                <div onclick="app.openModal(${p.id})" class="bg-white p-4 rounded-xl shadow-lg cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition duration-300">
                    <div class="relative overflow-hidden rounded-lg mb-4">
                        <img src="${p.image}" class="w-full h-56 object-cover" 
                             onerror="this.src='https://placehold.co/400x400/f3a8b4/333333?text=${encodeURIComponent(p.name)}'">
                        ${p.category ? `<span class="absolute top-2 right-2 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">${p.category}</span>` : ''}
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">${p.name}</h3>
                    ${p.ageRange ? `<p class="text-xs text-gray-500 mb-2">👶 ${p.ageRange}</p>` : ''}
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-pink-600 font-bold text-xl">${CONFIG.CURRENCY} ${p.price.toLocaleString()}</span>
                        <button onclick="event.stopPropagation(); app.addToCart({id: ${p.id}, name: '${p.name.replace(/'/g, "\\'")}', price: ${p.price}})" 
                            class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-full text-sm hover:from-pink-600 hover:to-rose-600 transition shadow-md">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');

            let byobHTML = '';
            if (state.byob.step === 1) {
                byobHTML = `<div class="grid md:grid-cols-3 gap-6">
                    ${boxOptions.map((box, idx) => `
                        <div onclick="app.byob.selectBox(${idx})" class="p-6 border-2 border-pink-100 rounded-xl hover:border-pink-500 cursor-pointer bg-white shadow-sm text-center transform hover:-translate-y-1 transition">
                            <i data-lucide="package" class="mx-auto w-12 h-12 text-pink-500 mb-3"></i>
                            <h3 class="font-bold text-xl mb-1">${box.name}</h3>
                            <p class="text-sm text-gray-500 mb-2">Max ${box.maxItems} items</p>
                            <p class="text-pink-600 font-bold text-lg">${CONFIG.CURRENCY} ${box.basePrice}</p>
                        </div>
                    `).join('')}
                </div>`;
            } else {
                const totalItems = Object.values(state.byob.items).reduce((a, b) => a + b, 0);
                byobHTML = `
                    <div class="bg-white p-6 rounded-xl border-2 border-pink-200 shadow-lg">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold text-gray-800">Fill your ${state.byob.selectedBox.name}</h3>
                            <span class="text-sm bg-pink-100 px-4 py-2 rounded-full text-pink-800 font-semibold">${totalItems} / ${state.byob.selectedBox.maxItems} items</span>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4 mb-6">
                            ${itemOptions.map(item => `
                                <div class="flex justify-between items-center p-4 border-2 rounded-lg hover:border-pink-300 transition">
                                    <div>
                                        <span class="font-medium">${item.name}</span>
                                        <small class="text-pink-500 block font-semibold">${CONFIG.CURRENCY} ${item.price}</small>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <button onclick="app.byob.updateItem('${item.id}', -1)" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition">-</button>
                                        <span class="w-8 text-center font-bold text-lg">${state.byob.items[item.id] || 0}</span>
                                        <button onclick="app.byob.updateItem('${item.id}', 1)" class="w-8 h-8 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">+</button>
                                    </div>
                                </div>`).join('')}
                        </div>
                        <div class="flex justify-between items-center">
                            <button onclick="state.byob.step=1; app.render()" class="text-gray-500 hover:text-gray-700 font-medium">← Back</button>
                            <button onclick="app.byob.finish()" class="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-rose-700 hover:to-pink-700 transition font-semibold shadow-lg" ${totalItems === 0 ? 'disabled style="opacity:0.5"' : ''}>
                                Finish Box ✓
                            </button>
                        </div>
                    </div>`;
            }

            return `
                <section class="relative h-96 flex items-center justify-center text-white overflow-hidden" style="background-color: #5a3d4d;">
                    <div class="absolute inset-0 w-full h-full flex items-center justify-center opacity-15">
                        <h1 class="text-[13vw] md:text-[20rem] font-bold text-gray-400 animate-pulse" style="letter-spacing: -0.05em;">Eratiana</h1>
                    </div>
                    <div class="absolute inset-0">
                        <div class="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div class="absolute top-20 right-20 w-32 h-32 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div class="absolute bottom-10 left-1/3 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>
                    <div class="relative z-10 text-center px-4">
                        <h2 class="text-5xl font-serif mb-6 animate-fade-in-up">The Art of Thoughtful Gifting</h2>
                        <button onclick="document.getElementById('shop').scrollIntoView({behavior: 'smooth'})" class="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in-up animation-delay-500">
                            Shop Now
                        </button>
                    </div>
                </section>
                <style>
                    @keyframes blob {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(20px, -20px) scale(1.1); }
                        50% { transform: translate(-20px, 20px) scale(0.9); }
                        75% { transform: translate(20px, 20px) scale(1.05); }
                    }
                    @keyframes fade-in-up {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-blob {
                        animation: blob 7s infinite;
                    }
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                    .animation-delay-4000 {
                        animation-delay: 4s;
                    }
                    .animate-fade-in-up {
                        animation: fade-in-up 1s ease-out;
                    }
                    .animation-delay-500 {
                        animation-delay: 0.5s;
                        opacity: 0;
                        animation-fill-mode: forwards;
                    }
                </style>
                <section id="shop" class="container mx-auto px-4 py-16">
                    <h2 class="text-4xl font-serif text-center mb-4 text-gray-800">Curated Gift Boxes</h2>
                    <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Discover our thoughtfully curated collection of premium gift boxes, perfect for every special moment</p>
                    <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">${productHTML}</div>
                </section>
                <section class="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
                    <div class="container mx-auto px-4">
                        <h2 class="text-4xl font-serif text-center mb-3 text-gray-800">Build Your Own Box</h2>
                        <p class="text-center text-gray-600 mb-10">Create a personalized gift box tailored to your loved one's preferences</p>
                        <div class="max-w-4xl mx-auto">${byobHTML}</div>
                    </div>
                </section>`;
        },

        checkout: () => {
            if (state.cart.length === 0) return `
                <div class="text-center py-24">
                    <i data-lucide="shopping-bag" class="w-24 h-24 mx-auto text-gray-300 mb-4"></i>
                    <h2 class="text-3xl font-serif mb-2">Your Cart is Empty</h2>
                    <p class="text-gray-500 mb-6">Add some beautiful gift boxes to get started!</p>
                    <button onclick="app.navigate('store')" class="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition">
                        Continue Shopping
                    </button>
                </div>`;

            const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return `
                <div class="container mx-auto px-4 py-12 max-w-5xl">
                    <h2 class="text-4xl font-serif mb-8 text-gray-800">Checkout</h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 class="font-bold text-xl mb-6 text-gray-800">Order Summary</h3>
                            <ul class="space-y-4 mb-6">
                                ${state.cart.map(item => `
                                    <li class="flex justify-between items-center border-b pb-4">
                                        <div class="flex-1">
                                            <p class="font-semibold text-gray-800">${item.name}</p>
                                            <p class="text-sm text-gray-500">${item.quantity} × ${CONFIG.CURRENCY} ${item.price.toLocaleString()}</p>
                                        </div>
                                        <div class="flex items-center space-x-2 ml-4">
                                            <button onclick="app.updateQuantity(${item.id || `'${item.id}'`}, -1)" class="text-gray-400 hover:text-red-500 transition">
                                                <i data-lucide="minus-circle" class="w-5 h-5"></i>
                                            </button>
                                            <button onclick="app.updateQuantity(${item.id || `'${item.id}'`}, 1)" class="text-gray-400 hover:text-green-500 transition">
                                                <i data-lucide="plus-circle" class="w-5 h-5"></i>
                                            </button>
                                        </div>
                                    </li>`).join('')}
                            </ul>
                            <div class="flex justify-between text-2xl font-bold mt-6 pt-6 border-t-2">
                                <span>Total</span>
                                <span class="text-pink-600">${CONFIG.CURRENCY} ${total.toLocaleString()}</span>
                            </div>
                        </div>
                        <form onsubmit="event.preventDefault(); app.placeOrder(this);" class="space-y-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input name="fullName" type="text" placeholder="John Doe" required 
                                    class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input name="email" type="email" placeholder="john@example.com" required 
                                    class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                                <textarea name="address" placeholder="Enter your complete delivery address" required 
                                    class="w-full p-3 border-2 border-gray-200 rounded-lg h-28 focus:border-pink-500 focus:outline-none transition"></textarea>
                            </div>
                            <button type="submit" id="pay-btn" 
                                class="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-lg hover:from-rose-700 hover:to-pink-700 transition shadow-lg text-lg">
                                Place Order via WhatsApp 💬
                            </button>
                            <p class="text-xs text-gray-500 text-center">You'll be redirected to WhatsApp to confirm your order</p>
                        </form>
                    </div>
                </div>`;
        },

        admin: () => {
            const ordersHTML = state.orders.map(o => `
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-4 text-sm">${new Date(o.createdAt?.seconds * 1000).toLocaleDateString() || 'N/A'}</td>
                    <td class="p-4 font-medium">${o.customerName}</td>
                    <td class="p-4 text-sm text-gray-500">${o.email}</td>
                    <td class="p-4 text-pink-600 font-bold">${CONFIG.CURRENCY} ${o.totalPrice.toLocaleString()}</td>
                    <td class="p-4">
                        <span class="px-3 py-1 rounded-full text-xs font-bold ${o.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${o.status}</span>
                    </td>
                </tr>
            `).join('');

            return `
                <div class="container mx-auto px-4 py-12">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-4xl font-serif text-gray-800">Admin Dashboard</h2>
                        <button onclick="app.navigate('store')" class="text-gray-500 hover:text-pink-600 font-medium">← Back to Store</button>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 overflow-x-auto" id="admin-content">
                        <table class="w-full text-left">
                            <thead class="bg-gradient-to-r from-pink-100 to-rose-100 text-gray-800 font-semibold uppercase text-xs tracking-wider">
                                <tr>
                                    <th class="p-4">Date</th>
                                    <th class="p-4">Customer</th>
                                    <th class="p-4">Email</th>
                                    <th class="p-4">Total</th>
                                    <th class="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${state.orders.length > 0 ? ordersHTML : '<tr><td colspan="5" class="p-8 text-center text-gray-400">No orders found.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        }
    }
};

window.app = app;
document.addEventListener('DOMContentLoaded', app.init);
