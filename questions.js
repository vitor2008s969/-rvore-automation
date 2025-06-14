function answerQuestions() {
  const questions = document.querySelectorAll('.question-item'); // Ajuste o seletor
    
  questions.forEach((question, index) => {
    // Encontra a primeira opção e marca como correta
    const options = question.querySelectorAll('input[type="radio"]');
    if (options.length > 0) {
      options[0].checked = true;
    }
    
    // Simula tempo de resposta
    setTimeout(() => {
      question.style.backgroundColor = '#e8f5e9'; // Verde claro para indicar respondido
    }, index * 500);
  });
  
  // Submete o formulário após responder todas
  setTimeout(() => {
    const submitBtn = document.querySelector('.submit-questions');
    if (submitBtn) submitBtn.click();
  }, questions.length * 500 + 1000);
}
