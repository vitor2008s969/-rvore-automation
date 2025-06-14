javascript:(function(){
  // Configurações
  const config = {
    readingTime: 40, // Minutos simulados
    completionPercentage: 100
  };

  // Verifica se está na página correta
  function isArvorePage() {
    return window.location.href.includes('livros.arvore.com.br/biblioteca');
  }

  // Login automático (se necessário)
  function autoLogin() {
    if (window.location.href.includes('auth/sso/seduc_sp')) {
      // Já está logado via token
      return;
    }
    const accessCode = prompt('🔑 Insira seu código de acesso da Árvore (ex: VHR6573):');
    if (!accessCode) return;
    
    const codeInput = document.querySelector('input[type="text"][name="access_code"]');
    if (codeInput) {
      codeInput.value = accessCode;
      codeInput.form.submit();
    }
  }

  // Adiciona botões aos livros
  function setupBookOptions() {
    const books = document.querySelectorAll('.book-item, .book-card'); // Seletores atualizados
    
    books.forEach(book => {
      if (book.querySelector('.automation-actions')) return;
      
      const bookId = book.dataset.id || Math.random().toString(36).substr(2, 9);
      book.insertAdjacentHTML('beforeend', `
        <div class="automation-actions" style="margin-top: 10px;">
          <button class="auto-read-btn" data-id="${bookId}" 
            style="padding: 5px 10px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">
            📖 Ler Automaticamente
          </button>
          <button class="answer-questions-btn" data-id="${bookId}"
            style="padding: 5px 10px; background: #34a853; color: white; border: none; border-radius: 4px; cursor: pointer;">
            📝 Responder Questões
          </button>
        </div>
      `);
    });

    // Event listeners
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('auto-read-btn')) {
        startAutoReading(e.target.dataset.id);
      } else if (e.target.classList.contains('answer-questions-btn')) {
        answerBookQuestions(e.target.dataset.id);
      }
    });
  }

  // Função de leitura automática
  function startAutoReading(bookId) {
    console.log(`📚 Simulando leitura do livro ${bookId}...`);
    
    // Simula o progresso de leitura
    const progressInterval = setInterval(() => {
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        progressBar.style.width = '100%';
        clearInterval(progressInterval);
        alert(`✅ Livro marcado como 100% lido em ${config.readingTime} minutos!`);
      }
    }, 1000);
  }

  // Responde questões automaticamente
  function answerQuestions() {
    const questions = document.querySelectorAll('.question-container, .question-item');
    
    questions.forEach((q, i) => {
      setTimeout(() => {
        const options = q.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        if (options.length > 0) {
          options[0].checked = true;
          q.style.backgroundColor = '#e8f5e9';
        }
      }, i * 1500);
    });

    setTimeout(() => {
      const submitBtn = document.querySelector('.submit-btn, .submit-questions');
      if (submitBtn) submitBtn.click();
    }, questions.length * 1500 + 2000);
  }

  // Inicialização principal
  function initAutomation() {
    if (!isArvorePage()) return;
    
    if (window.location.href.includes('auth/sso/seduc_sp')) {
      // Redireciona para a biblioteca após login
      window.location.href = 'https://livros.arvore.com.br/biblioteca';
      return;
    }
    
    if (window.location.href.includes('/ler/')) {
      // Se estiver na página de leitura
      startAutoReading();
    } else if (window.location.href.includes('/questions/')) {
      // Se estiver na página de questões
      answerQuestions();
    } else {
      // Página principal da biblioteca
      setupBookOptions();
    }
  }

  // Inicia quando a página carrega
  if (document.readyState === 'complete') {
    initAutomation();
  } else {
    document.addEventListener('DOMContentLoaded', initAutomation);
  }
})();
