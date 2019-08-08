'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

var previousTheme = null;

function setTheme(theme) {
  var themeVars = {
    displayId: 'calculator-display',
    displayClass: 'calculator-display',
    keyClass: 'calculator-key'
  };
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

(function() {

  var iPhone = (navigator.userAgent.indexOf("iPhone OS") !== -1);
  var iPad = (navigator.userAgent.indexOf("iPad") !== -1);

  var mainContainer = document.getElementById('calculator');
  var instructions = document.getElementById('screen-instructions');
  var modal = document.getElementById('modal');
  var modalClose = document.getElementById('close-modal');
  var modalOpen = document.getElementById('calculator-set-theme');

  function showInstructions() {
    instructions.classList.add('show');
    mainContainer.classList.add('hide'); 
  }

  function initEvents() {
    modalOpen.onclick = function(e) {
      modal.classList.add('show');
      modal.classList.remove('hide');
    }

    modalClose.onclick = function(e) {
      modal.classList.remove('show');
      modal.classList.add('hide');
    }

    window.onclick = function(e) {
      if (e.target == modal) {
        modal.classList.remove('show');
        modal.classList.add('hide');
      }
    }  
  }
  
  function init() {
    initEvents();

    var calc = new Calculator('.calculator-display', '.calculator-keys');
    calc.initEvents();
    
    var theme = window.localStorage.getItem('theme') || 'apple';
    setTheme(theme);
  }

  if ((!window.navigator.standalone && (iPhone || iPad))) {
    showInstructions();
  } else {
    init();
  }

})();