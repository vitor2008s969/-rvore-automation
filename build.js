const fs = require('fs');
const files = ['ui.js', 'login.js', 'books.js', 'questions.js', 'core.js'];

let output = '';
files.forEach(file => {
  output += fs.readFileSync(`./src/${file}`, 'utf8') + '\n\n';
});

// Minifica e prepara para bookmarklet
const minified = output
  .replace(/\/\/.*?\n/g, '')
  .replace(/\n\s*/g, '')
  .replace(/;\s*;/g, ';');

const bookmarklet = `javascript:(function(){${minified}initAutomation();})();`;

fs.writeFileSync('./bookmarklet.js', bookmarklet);
console.log('Bookmarklet gerado! Copie o conteúdo de bookmarklet.js para seu bookmark.');
