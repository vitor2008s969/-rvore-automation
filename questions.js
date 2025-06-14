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
