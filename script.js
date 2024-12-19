// Register a new user
function registerUser(e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('Usuário já cadastrado. Escolha outro nome de usuário.');
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página de login
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Login with existing user
function loginUser(e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        alert(`Bem-vindo, ${username}!`);
        sessionStorage.setItem('currentUser', username); // Armazena o usuário logado
        showInventorySection();
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

// Show inventory section and hide login
function showInventorySection() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('inventory-section').style.display = 'block';
}

// Add inventory item
function addInventoryItem(e) {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = document.getElementById('item-quantity').value.trim();
    const currentUser = sessionStorage.getItem('currentUser'); // Recupera o usuário logado
    const timestamp = new Date().toLocaleString();

    if (itemName && itemQuantity) {
        const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];

        inventoryData.push({
            material: itemName,
            quantity: itemQuantity,
            user: currentUser || 'Desconhecido',
            timestamp
        });

        localStorage.setItem('inventory', JSON.stringify(inventoryData));

        alert('Material registrado com sucesso!');
        document.getElementById('inventory-form').reset();
    } else {
        alert('Preencha todos os campos do inventário.');
    }
}

// Attach event listeners based on page
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', registerUser);
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', loginUser);
}

if (document.getElementById('inventory-form')) {
    document.getElementById('inventory-form').addEventListener('submit', addInventoryItem);
}
