(function() {
    // Verifica se estamos na plataforma Árvore
    if (!window.location.href.includes('livros.arvore.com.br')) {
        alert('Este bookmarklet só funciona na plataforma Árvore (livros.arvore.com.br)');
        return;
    }

    // Interface do usuário
    function createUI() {
        const ui = document.createElement('div');
        ui.id = 'arvore-automation-ui';
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.right = '20px';
        ui.style.zIndex = '9999';
        ui.style.backgroundColor = '#2c3e50';
        ui.style.color = 'white';
        ui.style.padding = '15px';
        ui.style.borderRadius = '5px';
        ui.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        ui.style.fontFamily = 'Arial, sans-serif';
        ui.style.width = '300px';

        ui.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <h3 style="margin:0;color:#f39c12;">Automação Árvore</h3>
                <button id="close-btn" style="background:none;border:none;color:white;font-size:20px;cursor:pointer;">×</button>
            </div>
            <div id="login-section">
                <input type="text" id="username" placeholder="Usuário" style="margin-bottom:8px;width:100%;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <input type="password" id="password" placeholder="Senha" style="margin-bottom:8px;width:100%;padding:8px;border-radius:4px;border:1px solid #ddd;">
                <button id="login-btn" style="width:100%;padding:8px;background-color:#27ae60;color:white;border:none;border-radius:4px;cursor:pointer;">Login Automático</button>
            </div>
            <div id="book-section" style="display:none;margin-top:15px;">
                <select id="book-select" style="width:100%;margin-bottom:10px;padding:8px;border-radius:4px;border:1px solid #ddd;"></select>
                <button id="read-book-btn" style="width:100%;margin-bottom:8px;padding:8px;background-color:#3498db;color:white;border:none;border-radius:4px;cursor:pointer;">Ler Livro Automaticamente</button>
                <button id="answer-questions-btn" style="width:100%;padding:8px;background-color:#9b59b6;color:white;border:none;border-radius:4px;cursor:pointer;">Responder Questões</button>
                <div style="margin-top:10px;font-size:12px;">
                    <label><input type="checkbox" id="simulate-reading" checked> Simular tempo de leitura (40min)</label>
                </div>
            </div>
            <div id="status" style="margin-top:15px;padding:8px;background-color:#34495e;border-radius:4px;font-size:12px;min-height:40px;"></div>
        `;

        document.body.appendChild(ui);

        // Event listeners
        document.getElementById('login-btn').addEventListener('click', autoLogin);
        document.getElementById('read-book-btn').addEventListener('click', readBookAutomatically);
        document.getElementById('answer-questions-btn').addEventListener('click', answerQuestions);
        document.getElementById('close-btn').addEventListener('click', () => {
            document.body.removeChild(ui);
        });
    }

    // Função de login automático
    async function autoLogin() {
        const username = document.getElementById('username').value;
        const
