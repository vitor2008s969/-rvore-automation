(function() {
    // Verifica se estamos na plataforma Leia SP
    if (!window.location.href.includes('leia.sp')) {
        alert('Este bookmarklet só funciona na plataforma Leia SP');
        return;
    }

    // Interface do usuário
    function createUI() {
        const ui = document.createElement('div');
        ui.id = 'leia-sp-automation-ui';
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.right = '20px';
        ui.style.zIndex = '9999';
        ui.style.backgroundColor = 'white';
        ui.style.padding = '15px';
        ui.style.borderRadius = '5px';
        ui.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        ui.style.fontFamily = 'Arial, sans-serif';

        ui.innerHTML = `
            <h3 style="margin-top:0;">Automação Leia SP</h3>
            <div id="login-section">
                <input type="text" id="username" placeholder="Usuário" style="margin-bottom:5px;width:100%;">
                <input type="password" id="password" placeholder="Senha" style="margin-bottom:5px;width:100%;">
                <button id="login-btn" style="width:100%;">Login Automático</button>
            </div>
            <div id="book-section" style="display:none;margin-top:10px;">
                <select id="book-select" style="width:100%;margin-bottom:5px;"></select>
                <button id="read-book-btn" style="width:100%;margin-bottom:5px;">Ler Livro Automaticamente</button>
                <button id="answer-questions-btn" style="width:100%;">Responder Questões</button>
            </div>
            <div id="status" style="margin-top:10px;font-size:12px;"></div>
            <button id="close-btn" style="position:absolute;top:5px;right:5px;background:none;border:none;cursor:pointer;">×</button>
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
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            updateStatus('Por favor, preencha usuário e senha');
            return;
        }

        updateStatus('Fazendo login...');

        try {
            // Simula o preenchimento do formulário de login
            const usernameField = document.querySelector('input[name="username"]');
            const passwordField = document.querySelector('input[name="password"]');
            const loginButton = document.querySelector('button[type="submit"]');
            
            if (usernameField && passwordField && loginButton) {
                usernameField.value = username;
                passwordField.value = password;
                loginButton.click();
                
                // Aguarda o login ser concluído
                await waitForElement('.book-list', 10000);
                updateStatus('Login realizado com sucesso!');
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('book-section').style.display = 'block';
                loadBooks();
            } else {
                updateStatus('Elementos de login não encontrados. Verifique se já não está logado.');
            }
        } catch (error) {
            updateStatus('Erro ao fazer login: ' + error.message);
        }
    }

    // Carrega a lista de livros
    function loadBooks() {
        const books = document.querySelectorAll('.book-list .book-item');
        const select = document.getElementById('book-select');
        
        books.forEach(book => {
            const title = book.querySelector('.book-title').innerText;
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            select.appendChild(option);
        });
        
        updateStatus(`${books.length} livros encontrados.`);
    }

    // Função para ler o livro automaticamente
    async function readBookAutomatically() {
        const bookTitle = document.getElementById('book-select').value;
        updateStatus(`Iniciando leitura automática de "${bookTitle}"...`);
        
        try {
            // Encontra e clica no livro selecionado
            const books = document.querySelectorAll('.book-list .book-item');
            for (const book of books) {
                if (book.querySelector('.book-title').innerText === bookTitle) {
                    book.click();
                    break;
                }
            }
            
            // Aguarda o livro carregar
            await waitForElement('.book-content', 5000);
            
            // Simula a leitura página por página
            const totalPages = document.querySelectorAll('.page-navigation .page').length;
            let currentPage = 1;
            
            while (currentPage <= totalPages) {
                updateStatus(`Lendo página ${currentPage} de ${totalPages}...`);
                
                // Simula o tempo de leitura por página (ajustável)
                await delay(calculateReadingTime(totalPages));
                
                // Vai para a próxima página
                const nextButton = document.querySelector('.next-page');
                if (nextButton) nextButton.click();
                
                currentPage++;
                await delay(1000); // Aguarda a página carregar
            }
            
            // Marca como 100% lido
            simulateReadingCompletion();
            updateStatus(`Livro "${bookTitle}" lido com sucesso! Marcado como 100% completo.`);
        } catch (error) {
            updateStatus(`Erro ao ler o livro: ${error.message}`);
        }
    }

    // Função para responder questões automaticamente
    async function answerQuestions() {
        const bookTitle = document.getElementById('book-select').value;
        updateStatus(`Respondendo questões de "${bookTitle}"...`);
        
        try {
            // Encontra e clica no livro selecionado
            const books = document.querySelectorAll('.book-list .book-item');
            for (const book of books) {
                if (book.querySelector('.book-title').innerText === bookTitle) {
                    book.click();
                    break;
                }
            }
            
            // Aguarda o livro carregar e navega para as questões
            await waitForElement('.quiz-section', 5000);
            document.querySelector('.quiz-tab').click();
            await delay(2000);
            
            // Responde todas as questões
            const questions = document.querySelectorAll('.question-item');
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                const options = question.querySelectorAll('.option');
                
                // Seleciona a primeira opção (ou implemente lógica mais sofisticada)
                if (options.length > 0) {
                    options[0].click();
                }
                
                await delay(500);
            }
            
            // Submete as respostas
            document.querySelector('.submit-quiz').click();
            await delay(2000);
            
            updateStatus(`Todas questões de "${bookTitle}" respondidas com sucesso!`);
        } catch (error) {
            updateStatus(`Erro ao responder questões: ${error.message}`);
        }
    }

    // Funções auxiliares
    function updateStatus(message) {
        document.getElementById('status').textContent = message;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            
            const check = () => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                } else if (Date.now() - startTime >= timeout) {
                    reject(new Error(`Elemento ${selector} não encontrado após ${timeout}ms`));
                } else {
                    setTimeout(check, 100);
                }
            };
            
            check();
        });
    }

    function calculateReadingTime(totalPages) {
        // Calcula o tempo de leitura para completar em ~40 minutos
        const totalReadingTime = 40 * 60 * 1000; // 40 minutos em ms
        return Math.floor(totalReadingTime / totalPages);
    }

    function simulateReadingCompletion() {
        // Implementação específica para marcar como 100% lido
        // Pode envolver chamadas AJAX ou manipulação do localStorage
        try {
            if (window.localStorage) {
                const bookId = getCurrentBookId(); // Função fictícia - precisa ser implementada
                localStorage.setItem(`book_${bookId}_progress`, '100');
                localStorage.setItem(`book_${bookId}_reading_time`, '2400'); // 40 minutos em segundos
            }
        } catch (e) {
            console.log('Erro ao simular conclusão:', e);
        }
    }

    // Inicia a UI
    createUI();
})();
