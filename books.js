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
