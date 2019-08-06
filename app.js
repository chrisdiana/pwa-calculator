'use strict';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js');
// }

var previousTheme = null;
var modal = document.getElementById('modal');
var modalClose = document.getElementById('close-modal');
var modalOpen = document.getElementById('calculator-set-theme');

modalOpen.onclick = function() {
  modal.classList.add('show');
  modal.classList.remove('hide');
}

modalClose.onclick = function() {
  modal.classList.remove('show');
  modal.classList.add('hide');
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove('show');
    modal.classList.add('hide');
  }
}

var themeVars = {
  displayId: 'calculator-display',
  displayClass: 'calculator-display',
  keyClass: 'calculator-key'
};

function setTheme(theme) {
  var displayEl = document.getElementById(themeVars.displayId);
  var keyEls = document.querySelectorAll('.' + themeVars.keyClass);
  
  displayEl.className = themeVars.displayClass + ' ' + theme;
  
  keyEls.forEach((key) => {
    if(previousTheme) {
      key.classList.replace(previousTheme, theme);
    } else {
      key.classList.add(theme);
    }
  });
  
  previousTheme = theme;
  window.localStorage.setItem('theme', theme);
}


function init() {
  var calc = new Calculator('.calculator-display', '.calculator-keys');
  calc.initEvents();
  
  var theme = window.localStorage.getItem('theme') || 'apple';
  setTheme(theme);
}

init();