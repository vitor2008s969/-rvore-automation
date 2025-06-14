# Arvore-automation
  ## Como Usar
1. Copie o código minificado de `bookmarklet.js`.
2. Crie um bookmark no navegador com o código como URL.
3. Acesse a Árvore Livros e clique no bookmark.

🧾 Considerações Éticas

🖊Antes de prosseguir, considere:
1. Cuidado o uso indevido sem moderação pode te prejudicar.
 
2. Usar apenas para fins educacionais e automação,  e é proibido copiar o projeto.
   
3.Nao foi criado para fazer roubo de informações ou qualquer outro método ilegal,que possa prejudicar o usuário, e sim para ajudar a bater o índice semanal mais rápido e de forma automática.

📜Este script simula a interação humana com atrasos entre ações para parecer mais natural

javascript:(function(){const e={readingTime:40,completionPercentage:100};function t(){return window.location.href.includes("livros.arvore.com.br/biblioteca")}function n(){window.location.href.includes("auth/sso/seduc_sp")||(e=prompt("🔑 Insira seu código de acesso da Árvore (ex: VHR6573):"),e&&(t=document.querySelector('input[type="text"][name="access_code"]'))&&(t.value=e,t.form.submit())}function o(){document.querySelectorAll(".book-item, .book-card").forEach(e=>{e.querySelector(".automation-actions")||(t=e.dataset.id||Math.random().toString(36).substr(2,9),e.insertAdjacentHTML("beforeend",'<div class="automation-actions" style="margin-top: 10px;"><button class="auto-read-btn" data-id="'+t+'" style="padding: 5px 10px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">📖 Ler Automaticamente</button><button class="answer-questions-btn" data-id="'+t+'" style="padding: 5px 10px; background: #34a853; color: white; border: none; border-radius: 4px; cursor: pointer;">📝 Responder Questões</button></div>'))}),document.addEventListener("click",e=>{e.target.classList.contains("auto-read-btn")?i(e.target.dataset.id):e.target.classList.contains("answer-questions-btn")&&a(e.target.dataset.id)})}function i(e){console.log("📚 Simulando leitura do livro "+e+"..."),t=setInterval(()=>{(e=document.querySelector(".reading-progress"))&&(e.style.width="100%",clearInterval(t),alert("✅ Livro marcado como 100% lido em "+e.readingTime+" minutos!"))},1e3)}function a(){document.querySelectorAll(".question-container, .question-item").forEach((e,t)=>{setTimeout(()=>{(t=e.querySelectorAll('input[type="radio"], input[type="checkbox"]'))&&t.length>0&&(t[0].checked=!0,e.style.backgroundColor="#e8f5e9")},1500*t)}),setTimeout(()=>{(e=document.querySelector(".submit-btn, .submit-questions"))&&e.click()},document.querySelectorAll(".question-container, .question-item").length*1500+2e3)}function l(){if(t())if(window.location.href.includes("auth/sso/seduc_sp"))window.location.href="https://
