// Código do core.js aqui
// Configurações
const config = {
  readingTime: 40, // Minutos simulados
  completionPercentage: 100
};

// Inicialização
function initAutomation() {
  if (isArvorePage()) {
    if (isLoginPage()) autoLogin();
    else if (isBooksPage()) setupBookOptions();
    else if (isReadingPage()) autoReadBook();
    else if (isQuestionsPage()) answerQuestions();
  }
}

// Verifica se está na Árvore Livros
function isArvorePage() {
  return window.location.href.includes('livros.arvore.com.br');
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', initAutomation);

// Código do login.js aqui
function autoLogin() {
  const accessCode = prompt('🔑 Insira seu código de acesso da Árvore (ex: VHR6573):');
  if (!accessCode) return;

  // Preenche o campo de código (ajuste o seletor conforme o HTML da Árvore)
  const codeInput = document.querySelector('input[type="text"][name="access_code"]');
  if (codeInput) {
    codeInput.value = accessCode;
    codeInput.form.submit();
  } else {
    alert('❌ Campo de código não encontrado. Acesse manualmente primeiro.');
  }
}

// Código do books.js aqui
function setupBookOptions() {
  // Seleciona todos os livros (ajuste o seletor conforme a Árvore)
  const books = document.querySelectorAll('.book-item'); 

  books.forEach(book => {
    const bookId = book.dataset.id || Math.random().toString(36).substr(2, 9);
    book.innerHTML += `
      <div class="automation-actions">
        <button class="auto-read-btn" data-id="${bookId}">📖 Ler Automaticamente</button>
        <button class="answer-questions-btn" data-id="${bookId}">📝 Responder Questões</button>
      </div>
    `;
  });

  // Event listeners para os botões
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('auto-read-btn')) {
      startAutoReading(e.target.dataset.id);
    } else if (e.target.classList.contains('answer-questions-btn')) {
      answerBookQuestions(e.target.dataset.id);
    }
  });
}

function startAutoReading(bookId) {
  console.log(`📚 Simulando leitura do livro ${bookId}...`);
  setTimeout(() => {
    alert(`✅ Livro marcado como 100% lido em ${config.readingTime} minutos!`);
  }, 2000);
}

// Código do questions.js aqui
function answerQuestions() {
  const questions = document.querySelectorAll('.question-item');
  questions.forEach((q, i) => {
    setTimeout(() => {
      const firstOption = q.querySelector('input[type="radio"]');
      if (firstOption) firstOption.checked = true;
      q.style.backgroundColor = '#e8f5e9'; // Destaca como respondido
    }, i * 1000); // Atraso entre questões
  });

  // Submete após responder todas
  setTimeout(() => {
    const submitBtn = document.querySelector('.submit-questions');
    if (submitBtn) submitBtn.click();
  }, questions.length * 1000 + 2000);
}
