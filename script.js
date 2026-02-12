// Configuración inicial
let products = [
    {
        id: 1,
        name: "Antivirus Pro 2024",
        description: "Protección avanzada contra malware y ransomware",
        price: "$49.99",
        icon: "fa-shield-haltered"
    },
    {
        id: 2,
        name: "VPN Ultra",
        description: "Navegación segura y anónima",
        price: "$29.99",
        icon: "fa-globe"
    },
    {
        id: 3,
        name: "Password Manager",
        description: "Gestión segura de contraseñas",
        price: "$19.99",
        icon: "fa-lock"
    }
];

let isAdminLoggedIn = false;

// Cargar datos guardados al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    renderProducts();
    updateUI();
});

function loadSavedData() {
    // Cargar productos guardados
    const savedProducts = localStorage.getItem('fh_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
    
    // Cargar configuración general
    const settings = JSON.parse(localStorage.getItem('fh_settings') || '{}');
    
    if (settings.storeName) {
        document.getElementById('storeName').value = settings.storeName;
        document.getElementById('storeNameDisplay').textContent = settings.storeName;
        document.getElementById('footerStoreName').textContent = settings.storeName;
    }
    
    if (settings.slogan) {
        document.getElementById('storeSlogan').value = settings.slogan;
    }
    
    if (settings.email) {
        document.getElementById('contactEmail').value = settings.email;
        document.getElementById('emailDisplay').textContent = settings.email;
    }
    
    if (settings.phone) {
        document.getElementById('contactPhone').value = settings.phone;
        document.getElementById('phoneDisplay').textContent = settings.phone;
    }
    
    if (settings.heroTitle) {
        document.getElementById('heroTitle').value = settings.heroTitle;
        document.getElementById('heroTitleDisplay').textContent = settings.heroTitle;
    }
    
    if (settings.heroSubtitle) {
        document.getElementById('heroSubtitle').value = settings.heroSubtitle;
        document.getElementById('heroSubtitleDisplay').textContent = settings.heroSubtitle;
    }
    
    if (settings.heroImage) {
        document.getElementById('heroImage').value = settings.heroImage;
        document.querySelector('.hero').style.backgroundImage = `url(${settings.heroImage})`;
    }
    
    // Cargar colores
    if (settings.primaryColor) {
        document.getElementById('primaryColor').value = settings.primaryColor;
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    }
    
    if (settings.secondaryColor) {
        document.getElementById('secondaryColor').value = settings.secondaryColor;
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    }
    
    if (settings.bgColor) {
        document.getElementById('bgColor').value = settings.bgColor;
        document.documentElement.style.setProperty('--bg-color', settings.bgColor);
    }
}

// Renderizar productos
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <i class="fas ${product.icon} product-icon"></i>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <button class="cta-button" style="padding: 10px 20px; font-size: 16px;">
                Comprar Ahora
            </button>
        </div>
    `).join('');
    
    // Renderizar en el panel de admin
    renderProductsList();
}

// Renderizar lista de productos en admin
function renderProductsList() {
    const list = document.getElementById('productsList');
    if (!list) return;
    
    list.innerHTML = products.map((product, index) => `
        <div class="product-edit-item" style="background: #2a2a2a; padding: 15px; margin-bottom: 15px; border-radius: 8px;">
            <div class="form-group">
                <label>Nombre del Producto:</label>
                <input type="text" id="product_name_${index}" value="${product.name}" class="product-input">
            </div>
            <div class="form-group">
                <label>Descripción:</label>
                <textarea id="product_desc_${index}" rows="2">${product.description}</textarea>
            </div>
            <div class="form-group">
                <label>Precio:</label>
                <input type="text" id="product_price_${index}" value="${product.price}">
            </div>
            <div class="form-group">
                <label>Icono (FontAwesome):</label>
                <input type="text" id="product_icon_${index}" value="${product.icon}">
            </div>
            <button onclick="deleteProduct(${index})" style="background: #ff4444; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `).join('');
}

// Agregar producto
function addProduct() {
    const newProduct = {
        id: products.length + 1,
        name: "Nuevo Producto",
        description: "Descripción del producto",
        price: "$0.00",
        icon: "fa-box"
    };
    
    products.push(newProduct);
    renderProductsList();
}

// Eliminar producto
function deleteProduct(index) {
    products.splice(index, 1);
    renderProductsList();
}

// Guardar cambios
function saveChanges() {
    // Guardar configuración general
    const settings = {
        storeName: document.getElementById('storeName').value,
        slogan: document.getElementById('storeSlogan').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        heroTitle: document.getElementById('heroTitle').value,
        heroSubtitle: document.getElementById('heroSubtitle').value,
        heroImage: document.getElementById('heroImage').value,
        primaryColor: document.getElementById('primaryColor').value,
        secondaryColor: document.getElementById('secondaryColor').value,
        bgColor: document.getElementById('bgColor').value
    };
    
    // Actualizar productos con los valores editados
    const productInputs = document.querySelectorAll('.product-edit-item');
    productInputs.forEach((item, index) => {
        if (products[index]) {
            products[index].name = document.getElementById(`product_name_${index}`).value;
            products[index].description = document.getElementById(`product_desc_${index}`).value;
            products[index].price = document.getElementById(`product_price_${index}`).value;
            products[index].icon = document.getElementById(`product_icon_${index}`).value;
        }
    });
    
    // Guardar en localStorage
    localStorage.setItem('fh_settings', JSON.stringify(settings));
    localStorage.setItem('fh_products', JSON.stringify(products));
    
    // Actualizar UI
    updateUI();
    
    alert('¡Cambios guardados exitosamente!');
}

// Actualizar interfaz
function updateUI() {
    const settings = JSON.parse(localStorage.getItem('fh_settings') || '{}');
    
    document.getElementById('storeNameDisplay').textContent = settings.storeName || 'Francis Hacks';
    document.getElementById('footerStoreName').textContent = settings.storeName || 'Francis Hacks';
    document.getElementById('heroTitleDisplay').textContent = settings.heroTitle || 'Soluciones Digitales Avanzadas';
    document.getElementById('heroSubtitleDisplay').textContent = settings.heroSubtitle || 'Descubre nuestras herramientas digitales de última generación';
    document.getElementById('emailDisplay').textContent = settings.email || 'info@francishacks.com';
    document.getElementById('phoneDisplay').textContent = settings.phone || '+1 234 567 890';
    
    if (settings.heroImage) {
        document.querySelector('.hero').style.backgroundImage = `url(${settings.heroImage})`;
    }
    
    if (settings.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    }
    if (settings.secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    }
    if (settings.bgColor) {
        document.documentElement.style.setProperty('--bg-color', settings.bgColor);
    }
    
    renderProducts();
}

// Login
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function login() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'admin123') {
        isAdminLoggedIn = true;
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('adminBar').style.display = 'block';
    } else {
        alert('Contraseña incorrecta');
    }
}

function logout() {
    isAdminLoggedIn = false;
    document.getElementById('adminBar').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
}

// Toggle admin panel
function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        renderProductsList();
    } else {
        panel.style.display = 'none';
    }
}

// Tabs en admin panel
function openTab(event, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
                                                   }
