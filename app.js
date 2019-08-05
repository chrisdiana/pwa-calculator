'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

var previousTheme = null;
var modal = document.getElementById("modal");
var modalClose = document.getElementById('close-modal');
var modalOpen = document.getElementById("calc-set-theme");


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
  displayId: 'calc-display',
  displayClass: 'calc-display',
  buttonClass: 'calc-btn',
  isWideButton: function(num) {
    return (num === "0") ? true : false;
  }
};

function setTheme(theme) {
  var displayEl = document.getElementById(themeVars.displayId);
  var buttonEls = document.querySelectorAll('.' + themeVars.buttonClass);
  
  displayEl.className = themeVars.displayClass + ' ' + theme;
  
  buttonEls.forEach((button) => {
    if(previousTheme) {
      button.classList.replace(previousTheme, theme);
    } else {
      button.classList.add(theme);
    }
  });
  
  previousTheme = theme;
  window.localStorage.setItem('theme', theme);
}


function init() {
  var calc = new Calculator('calc-display', 'calc-btn');
  calc.initEvents();
  
  var theme = window.localStorage.getItem('theme') || 'apple';
  setTheme(theme);
}

init();