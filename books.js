function setupBookOptions() {
  const books = document.querySelectorAll('.book-item'); // Ajuste conforme o seletor real
  
  books.forEach(book => {
    const bookId = book.getAttribute('data-id') || Math.random().toString(36).substr(2, 9);
    
    // Adiciona botões de ação
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'automation-actions';
    actionsDiv.innerHTML = `
      <button class="auto-read-btn" data-id="${bookId}">Ler Automaticamente</button>
      <button class="answer-questions-btn" data-id="${bookId}">Responder Questões</button>
    `;
    
    book.appendChild(actionsDiv);
  });
  
  // Event listeners para os botões
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('auto-read-btn')) {
      const bookId = e.target.getAttribute('data-id');
      startAutoReading(bookId);
    } else if (e.target.classList.contains('answer-questions-btn')) {
      const bookId = e.target.getAttribute('data-id');
      answerBookQuestions(bookId);
    }
  });
}

function startAutoReading(bookId) {
  // Simular progresso de leitura
  simulateReadingProgress(bookId);
  
  // Atualizar interface após "leitura"
  setTimeout(() => {
    alert(`Livro ${bookId} marcado como lido 100% em 40 minutos!`);
    window.location.reload(); // Atualiza a página para mostrar o status
  }, 2000);
        }
