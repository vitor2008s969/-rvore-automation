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
