// Configurações básicas
const config = {
  readingTime: 40, // minutos
  completionPercentage: 100
};

// Inicialização do script
function initAutomation() {
  if (isLeiaSPPage()) {
    setupUI();
    
    if (isLoginPage()) {
      autoLogin();
    } else if (isBooksPage()) {
      setupBookOptions();
    } else if (isReadingPage()) {
      autoReadBook();
    } else if (isQuestionsPage()) {
      answerQuestions();
    }
  }
}

// Verifica se está no domínio correto
function isLeiaSPPage() {
  return window.location.hostname.includes('leiasp.cupiditys.lol') || 
         window.location.hostname.includes('livros.arvore.com.br');
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAutomation);
