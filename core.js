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
