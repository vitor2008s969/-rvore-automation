function autoLogin() {
  const accessCode = prompt('Digite seu código de acesso (ex: VHR6573):');
  
  if (accessCode) {
    // Simular login com código de acesso
    const loginForm = document.querySelector('form') || {};
    const codeInput = document.querySelector('input[type="text"]') || {};
    
    codeInput.value = accessCode;
    loginForm.submit();
    
    // Armazenar código para uso futuro
    localStorage.setItem('leia_sp_access_code', accessCode);
  }
}
