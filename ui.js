function setupUI() {
  // Adiciona estilos CSS
  const style = document.createElement('style');
  style.textContent = `
    .automation-actions {
      margin-top: 10px;
      display: flex;
      gap: 10px;
    }
    .auto-read-btn, .answer-questions-btn {
      padding: 5px 10px;
      background: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .answer-questions-btn {
      background: #34a853;
    }
  `;
  document.head.appendChild(style);
}
