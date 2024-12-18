loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Usuário digitado:', username);
    console.log('Senha digitada:', password);

    if (username === validCredentials.username && password === validCredentials.password) {
        alert('Bem-vindo!');
        loginSection.style.display = 'none';
        appSection.style.display = 'block';
    } else {
        alert('Usuário ou senha incorretos.');
    }
});
